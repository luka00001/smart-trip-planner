import RestaurantIcon from '@material-ui/icons/Restaurant';
import DeleteIcon from "@material-ui/icons/Delete";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import firebase from "../../../config/Firebase";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import React, { useContext } from "react";
import { Typography, Card, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { UserContext } from "../../../Contexts/loggedin-context";

const useStyles = makeStyles(theme => ({
  root: {
    overflow: "visible",
    marginBottom: "1%",
    color: "#836529",
    display: "flex",
    justifyContent: "space-between"
  },
  gutters: {
    paddingLeft: "2px",
    paddingRight: "5px"
  }
}));
const avatarStyles = makeStyles(theme => ({
  root: {
    minWidth: "45px"
  }
}));
const iconButton = makeStyles(theme => ({
  root: {
    padding: "2px"
  }
}));

const RestaurantDisplay = props => {
  const [user] = useContext(UserContext);
  const { data } = props;

  const formattedDate = date => {
    return `${date.slice(0, 5)} -${date.slice(9)}`;
  };

  const deleteEntry = data => {
    let location = data["location"];
    console.log(location);
    let checkIn = data["checkIn"];
    console.log(location);
    firebase
      .database()
      .ref(
        `${props.dateID}-${user}/Restaurant/${location}-${checkIn.replace(
          / /g,
          ""
        )}`
      )
      .remove();
  };

  const classes = useStyles();
  const avatarClasses = avatarStyles();
  const iconButtonClasses = iconButton();
  const printdata = (x) => {
      console.log(x);
  };

  return (
    <ListItem className={classes.gutters}>
      <ListItemAvatar className={avatarClasses.root}>
        <Avatar>
          <RestaurantIcon />
        </Avatar>
      </ListItemAvatar>
      {data === undefined ? (
        
        <ListItemText secondary="Nothing here yet!" />
        
      ) : (
        <ListItemText
          secondary={
            <Typography component={"span"} variant={"caption"}>
              {Object.keys(data).map(entry => (
                <Card
                  className={classes.root}
                  key={`${data[entry]["location"]}-${data[entry]["checkIn"]}`}
                >
                  <ul>
                    <li>{`Restuarant Name: ${data[entry]["RestaurantName"]}`}</li>
                    <li>{`Address: ${data[entry]["Address"]}`}</li>
                    <li>{`Categories: ${data[entry]["Cuisine"]}`}</li>
                    <li>{`Check In: ${formattedDate(
                      data[entry]["checkIn"]
                    )}`}</li>
                  </ul>
                  <div className="delete-entry">
                    <IconButton
                      className={iconButtonClasses.root}
                      onClick={e => deleteEntry(data[entry])}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </div>
                </Card>
              ))}
            </Typography>
          }
        />
      )}
    </ListItem>
  );
};

export default RestaurantDisplay;
