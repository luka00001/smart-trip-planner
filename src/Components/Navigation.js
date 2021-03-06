import AppBar from "@material-ui/core/AppBar";
import { NavLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import firebase from "../config/Firebase";
import ExploreIcon from "@material-ui/icons/Explore";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import Toolbar from "@material-ui/core/Toolbar";

// this is the Navigation bar that is stickied to the top of the page thoroughout the App
function Navigation(props) {
  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    }
  }));

  const routes = props.routes;

  const classes = useStyles();

  let logOutUser = () => {
    // if the logout button is clicked log the user out
    firebase
      .auth()
      .signOut()
      .then(function() {
        console.log("user has succesfully logged out");
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        style={{ backgroundColor: "#836529", opacity: "0.92", color: "black" }}
      >
        <Toolbar>
          {props.user !== "null" ? (
            <NavLink to={routes.location}>
              <IconButton
                edge="start"
                className={classes.menuButton}
                aria-label="menu"
              >
                <ExploreIcon />
              </IconButton>
            </NavLink>
          ) : (
            <NavLink to={routes.landing}>
              <IconButton
                edge="start"
                className={classes.menuButton}
                aria-label="menu"
              >
                <ExploreIcon />
              </IconButton>
            </NavLink>
          )}
          <h4 className={classes.title}>Smart Trip Planner</h4>
          {props.user !== "null" ? (
            <>
            <NavLink to={routes.trips} style={{ textDecoration: "none" }}>
              <Button>My Trips</Button>
            </NavLink>
            <NavLink to={routes.preference} style={{ textDecoration: "none" }}>
              <Button>Preferences</Button>
            </NavLink>
            </>
          ) : (
            <NavLink to={routes.signup} style={{ textDecoration: "none" }}>
              <Button>Sign Up</Button>
            </NavLink>
          )}
          {props.user !== "null" ? (
            <NavLink to={routes.landing} style={{ textDecoration: "none" }}>
              <Button onClick={logOutUser}>Logout</Button>
            </NavLink>
          ) : (
            <NavLink to={routes.login} style={{ textDecoration: "none" }}>
              <Button>Login</Button>
            </NavLink>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navigation;
