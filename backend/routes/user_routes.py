# module imports
from flask import Flask, request
#sql
from backend.sql_module import *
from backend.function_module import *
from backend.coc_module import validate_coc_account

from backend import app, db, bcrypt
# library for api calls
import json

# check if when user logged in with google they are a user in the DB
# If not create user
@app.route('/api/user/signin', methods=["GET"])
def check_user_exists():
    user = User_sql(request.args.get('id'))
    if user.query("user") is None:
        #user.create_new_user()
        return {"result": "user does not exist", "userId": request.args.get('id')}
    return {"result": "success", "content": user.profile()}
    
# update front ends current users data
@app.route('/api/user/update-profile', methods=["GET"])
def update_user_profile():
    user = User_sql(request.args.get('id'))
    if user.query("user") is None:
        return {"result": "Invalid"}
    else:
        return {"result": "success", "content": user.profile()}
# route to create new users account 
@app.route('/api/user/create', methods=['POST'])
def create_new_user():
    if request.method == "POST":
        form = json.loads(request.data.decode())
        print(form)
        try:
            user = User_sql(form["id"])
            user.create_new_user(form)
            return {"result": "success", "content": user.profile()}
        except:
            return {"result": "unsuccessful"}

# fetch settings and user details to be changed on react settings form
@app.route('/api/user/update/settings', methods=["POST"])
def user_settings():
    if request.method == "POST":
        form = json.loads(request.data.decode('utf-8'))
        try:
            user = User_sql(request.args.get('id'))
            user.update_settings(form)
            user.update_user(form)
        except:
            return {"result": "error"}
        return {"result": "success"}
            



# add coc account to user profile and verify its acturally them
@app.route('/api/user/add-game-account', methods=['POST'])
def add_game_account():
    # create user class
    user = User_sql(request.args.get('id'))
    # check if user exists
    if user.query("user") is None:
        return {"result": "Invalid"}
    # process form data from post request
    try:
        form = json.loads(request.data.decode('utf-8'))
        form["tag"] = form["tag"].upper()
    except:
        return {"result": "Invalid"}
    # loop though accounts already linked to user and check if perposed account is already linked
    for account in user.query("accounts"):
        if form["tag"] == account["account_tag"]:
            # return message if already linked
            return {"result": "account is already linked to your profile"}
        else:
            # else continue though loop
            continue
    # verifly the user is linking an account they own by using there in-game one use api token from in-game settings menu
    if validate_coc_account(form["tag"], "verify", form["APIToken"]):
        # create player class with tag
        create_player = Player_sql(form["tag"])
        # if player does not already exist or is out of date then call COC API
        player_data = create_player.insert_or_update()
        # insert details into cocaccounts table linked to user
        user.insert_account({
            "tag": form["tag"],
            "clan_tag": player_data["clan_tag"],
            "role": player_data["role"]
        })
        # return success once completed
        print("return response")
        return {"result": "success"}
    # if verifly failed return inccorect token
    else:
        return {"result": "incorrect token"}

    
    

@app.route('/user/game-accounts', methods=['GET'])
def check_game_accounts():
    user_id = request.args.get('id')
    user_accounts = query_cocaccounts(user_id)
    return {"result": "success" ,"content":user_accounts}

@app.route('/api/user', methods=["GET"])
def user_data():
    if request.method == "GET":
        user_id = request.args.get("id")
        print(user)

@app.route('/test', methods=["GET"])
def test():

    user = User_sql("100614304447125")
    user.create_new_user()
    print(user.profile())
    return {"result": "success", }#"content": user.profile()}