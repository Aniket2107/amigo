import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { authReducer } from "./reducers/authReducer";
import { currentTweetReducer } from "./reducers/currentTweetReducer";
import { feedReducer } from "./reducers/feedReducer";
import { trendReducer } from "./reducers/trendReducer";
import { currentUserReducer } from "./reducers/currentUserReducer";
import { userLikedReducer } from "./reducers/userLikedReducer";
import { myTweetReducer } from "./reducers/myTweetReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  feed: feedReducer,
  trend: trendReducer,
  userLiked: userLikedReducer,
  myTweets: myTweetReducer,
  currentTweet: currentTweetReducer,
  currentUser: currentUserReducer,
});

const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
