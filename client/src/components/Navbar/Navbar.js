import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Avatar, Button, Typography } from "@material-ui/core";
import useStyles from "./stylesNavbar";
import camera from "../../images/camera.png";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import decode from "jwt-decode";

const Navbar = () => {
  const classes = useStyles();
  //const user = null;

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile"))); //we want to fetch real user from local storage

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const logout = () => {
    //we need to dispatch an action
    dispatch({ type: "LOGOUT" });
    history.push("/");
    setUser(null);
  };

  console.log("User: ", user);

  useEffect(() => {
    const token = user?.token;
    //JWT..
    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography
          component={Link}
          to="/"
          className={classes.heading}
          variant="h2"
          align="center"
        >
          &nbsp; HD Image Board &nbsp;
         
        </Typography>
        <Typography>
        <h6 className={classes.h6}>By Heman Development</h6>
        </Typography>
        <img className={classes.image} src={camera} alt="icon" height="60" />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.result.name}
              src={user.result.imageUrl}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.result.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
