// import combine reducer to combiner all reducer and update the main store of the app
import { combineReducers } from "redux";

// import the form reducer from redux-form
import { reducer as formReducer } from "redux-form";
// account reducers
import registerNewUserReducer from "./accountReducers/registerNewUserReducer";
import {
  logUserReducer,
  signInOutReducer,
} from "./accountReducers/logUserReducer";
import {
  gameAccountReducer,
  allianceAccountReducer,
  addGameAccount,
} from "./accountReducers/gameAccountReducer";
// alliance reducers
import { createAllianceReducer } from "./allianceReducers/createAllianceReducer";
import {
  fetchAllianceReducer,
  allianceAnnoumentStatus,
  fetchAnnouncements,
  fetchAllianceChat,
  joinRequestReducer,
} from "./allianceReducers/allianceReducer";
// clan reducers
import {
  clansDetailsReducer,
  allianceInviteListReducer,
} from "./clanReducers/clanReducer";
// coc reducers
import playerProfileReducer from "./cocReducers/playerProfileReducer";
import { clanReducer, multipleClanReducer } from "./cocReducers/clanReducer";
import { warReducer, postAttackReducer } from "./cocReducers/warReducer";
// recruitment reducers
import checkRecruitmentReducer from "./recruitmentReducers/checkRecruitmentReducer";
import { fetchRecruitmentPostsReducer } from "./recruitmentReducers/fetchRecruitmentReducer";
import { settingsReducer } from "./accountReducers/settingsReducer";
import { createRecruitmentReducer } from "./recruitmentReducers/createRecruitmentReducer";
// war management reducers
import { warManagementReducer } from "./managementReducers/warManagementReducer";
// search reducers
import { searchReducer } from "./searchReducers/searchReducer";
// default export the reducer
export default combineReducers({
  //form reducer
  form: formReducer,
  // account reducers
  auth: signInOutReducer,

  registerStatus: registerNewUserReducer,
  user: logUserReducer,
  gameAccounts: gameAccountReducer,
  allianceAccounts: allianceAccountReducer,
  settingsStatus: settingsReducer,

  // add clash account reducer
  addClashAccount: addGameAccount,

  // alliance
  // ---
  alliance: fetchAllianceReducer,
  allianceAnnouncementStatus: allianceAnnoumentStatus,
  allianceAnnouncements: fetchAnnouncements,
  allianceChat: fetchAllianceChat,
  joinRequest: joinRequestReducer,

  // ---
  // create alliance errors
  allianceStatus: createAllianceReducer,
  // clan
  clan: clansDetailsReducer,
  allianceInviteList: allianceInviteListReducer,
  // coc
  profile: playerProfileReducer,
  clanProfile: clanReducer,
  multipleClanProfiles: multipleClanReducer,
  // war
  currentWar: warReducer,
  // post attack in war
  postAttack: postAttackReducer,
  // recruitment posts
  recruitmentFormStatus: createRecruitmentReducer,
  recruitmentPostCheck: checkRecruitmentReducer,
  recruitmentPosts: fetchRecruitmentPostsReducer,
  // war management
  warManagement: warManagementReducer,
  // search
  searchResults: searchReducer,
});