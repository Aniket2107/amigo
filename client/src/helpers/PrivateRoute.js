import { Redirect, Route } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import Trending from "../components/trending/Trending";

import { useSelector } from "react-redux";

function PrivateRoute({ component: Component, ...rest }) {
  const { accessToken } = useSelector((state) => state.auth);

  if (accessToken) {
    return (
      <Route
        {...rest}
        render={(routeProps) => (
          <>
            <Navbar />
            <Sidebar />
            <Trending />
            <Component {...routeProps} />
          </>
        )}
      />
    );
  } else {
    return <Redirect to={{ pathname: "/login" }} />;
  }
}

export default PrivateRoute;
