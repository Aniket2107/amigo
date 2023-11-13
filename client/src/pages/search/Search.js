import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ALoader from "../../components/Loader";
import { API } from "../../helpers/API";
import "./search.css";

const Search = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { accessToken } = useSelector((state) => state.auth);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API}/user/all`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.log(err));

    setLoading(false);
  }, [accessToken]);

  if (loading) {
    return (
      <div className="alignHomeLoader">
        <ALoader />
      </div>
    );
  }

  let filteredUsers = [];

  if (users && searchQuery !== "") {
    filteredUsers = users.filter((user) => {
      return user.name.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }

  return (
    <div className="search_screen">
      <h3 className="search_header">Search users</h3>

      <div className="search_container">
        <i className="fa fa-search search_icon"></i>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search_ipnut"
          placeholder="Search users.."
        />
      </div>

      <div className="search_users">
        {filteredUsers.length > 0 &&
          filteredUsers?.map((user) => {
            return (
              <Link
                to={`/user/${user._id}`}
                style={{ textDecoration: "none", color: "#333" }}
                key={user._id}
              >
                <div className="user_container" key={user._id}>
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt="avatar"
                      className="search_user_avatar"
                    />
                  ) : (
                    <img src="" alt="avatar" />
                  )}

                  <div className="user_container-right">
                    <p>{user.name}</p>
                    {user?.bio && <p>{user.bio}</p>}
                  </div>
                </div>
              </Link>
            );
          })}

        {searchQuery.length !== 0 && filteredUsers.length < 1 && (
          <p style={{ marginLeft: "40%", color: "red" }}>Sorry no user found</p>
        )}
      </div>
    </div>
  );
};

export default Search;
