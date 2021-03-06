// npm imports
import React from "react";
import { Route, Switch } from "react-router-dom";
// history object import
import history from "../History";
// component imports
import Homepage from "./homepage/HomePage";

// header component imports
import Navbar from "./header/Navbar";
// -- header (create or add) menu

// Intial user account creation //
import AddToAccount from "./createoradd/AddToAccount";
import Register from "./account/register/Register";
import Profile from "./profile/Profile";

// account page components
import Settings from "./account/settings/Settings";
// recruitment components
import CreateRecruitPost from "./recruitment/createRecruitment/CreateRecruitPost";
import RecruitmentFeed from "./recruitment/RecruitmentFeed";
// search components
import Search from "./search/Search";
// Clan Page
import ClanPage from "./clan/ClanPage";
/*

// current war page component
import CurrentWar from "./currentWar/CurrentWar";
// post war attack component
// import PostAttack from "./currentWar/postAttack/PostAttack";
// clan page component
import ClanProfile from "./cocClan/ClanProfile";
// import CreateAlliance from "./createoradd/CreateAlliance";


// invite component
import Invite from "./search/invite/Invite";

*/
// app component
class App extends React.Component {
  click = () => {
    history.push("/page");
  };
  render() {
    console.log(this.props);
    return (
      <div className="ui container">
        <Navbar />

        <div>
          <Switch>
            {/* Register New user account Route */}
            <Route path="/register/:id" exact component={Register} />
            {/* Add a COC account to user account Route */}
            <Route path="/add-account/:id" exact component={AddToAccount} />
            {/* View users profile */}
            <Route path="/profile" exact component={Profile} />
            {/* settings page */}
            <Route path="/user/settings" exact component={Settings} />
            {/* Recruitment */}
            <Route
              path="/recruitment/post"
              exact
              component={CreateRecruitPost}
            />
            <Route path="/recruitment/feed" exact component={RecruitmentFeed} />
            {/* Search route */}
            <Route path="/search" exact component={Search} />
            {/* Clan routes - Clan Page */}
            <Route path="/clan" exact component={ClanPage} />
            {/* dev iso
            {/* homepage routes 
            <Route path="/" exact component={Homepage} />
            <Route path="/home" exact component={Homepage} />
            {/* account routes 
            
           
            {/* create or add pages - add a clash account to your profile - create an Alliance 
            <Route path="/add" exact component={AddToAccount} />
            {/* maint 
            
            {/* current war page 
            <Route path="/:clanTag/currentwar" exact component={CurrentWar} />
            {/* post war attack 
            <Route
              path="/currentwar/postattack/:userid/:tag/:defenderTag/:destructionPercentage/:stars"
              component={PostAttack}
            />
            {/*  Clan page 
            <Route path="/:clanTag/profile" exact component={ClanProfile} />
            {/* test pages 
            
            {/* Invite 
            <Route path="/invite/:tag/:name/:type" exact component={Invite} />*/}
          </Switch>
        </div>
      </div>
    );
  }
}
// export app component
export default App;
