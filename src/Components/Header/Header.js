import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const domain = process.env.REACT_APP_DOMAIN;
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [data, setData] = useState();
  useEffect(() => {
    axios
      .get(`${domain}/home`)
      .then((res) => {
        setData(res.data.users[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  const handleLogout = () => {
    localStorage.removeItem("user");
    setLoggedIn(false);
    navigate("/login");
  };

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("user"));
    setUser(items);
    if (items) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [data, loggedIn]);

  return (
    <>
      <div className="header">
        <div className="logo">
          <Link to={"/"}>
            <img
              className="img-fluid"
              src={`${domain}/uploads/${data?.image}`}
              alt=""
              style={{ width: "100%", height: "30px" }}
            />
          </Link>
        </div>

        {loggedIn ? (
          <>
            <div className="menu">
              <ul>
                <li>
                  <NavLink to={"/"}>Home</NavLink>
                </li>
                <li>
                  <NavLink to={"/work"}>Work</NavLink>
                </li>
                <li>
                  <NavLink to={"/blog"}>Blog</NavLink>
                </li>
                <li>
                  <NavLink to={"/people"}>People</NavLink>
                </li>
                <li>
                  <NavLink to={"/career"}>Career</NavLink>
                </li>
                <li>
                  <NavLink to={"/page-bg"}>PageBG</NavLink>
                </li>
              </ul>
            </div>
            <div className="auth">
              <ul>
                <li>
                  <Button className="btn btn-secondary">{user?.name}</Button>
                </li>
                <li>
                  <Button onClick={handleLogout}>Logout</Button>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <div className="auth">
              <ul>
                <li>
                  <Link to={"/login"}>Login</Link>
                </li>
                <li>
                  <Link to={"/signup"}>Signup</Link>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Header;
