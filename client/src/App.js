import { Redirect, Route, Switch, BrowserRouter } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Landing from "./pages/Landing";
import Home from "./pages/home/Home";
import User from "./pages/user/User";
import Profile from "./pages/profile/Profile";
import LikedTweet from "./pages/likedtweet/LikedTweet";
import PrivateRoute from "./helpers/PrivateRoute";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import Search from "./pages/search/Search";
import Following from "./pages/following/Following";
import Followers from "./pages/following/Followers";
import Chat from "./pages/chat/Chat";
import TPage from "./pages/TPage/TPage";

toast.configure({
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
});

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />

        <Route path="/chat" exact component={Chat} />

        <PrivateRoute path="/home" exact component={Home} />
        <PrivateRoute path="/profile" exact component={Profile} />
        <PrivateRoute path="/liked-tweets" exact component={LikedTweet} />
        <PrivateRoute path="/following" exact component={Following} />
        <PrivateRoute path="/followers" exact component={Followers} />
        <PrivateRoute path="/search" exact component={Search} />
        <PrivateRoute path="/user/:id" exact component={User} />
        <PrivateRoute path="/tweet/:id" exact component={TPage} />
        <Redirect to="/home" />
        <ToastContainer />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
