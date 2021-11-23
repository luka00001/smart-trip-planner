import ListItem from "@material-ui/core/ListItem";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import firebase from "../../../config/Firebase";
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

const TransportDisplay = props => {
  const [user] = useContext(UserContext);
  const { icon, data, transport } = props;

  const formattedDate = date => {
    return `${date.slice(0, 5)} -${date.slice(9)}`;
  };

  const deleteEntry = data => {
    let destination = data["destination"];
    let date = data["departDate"];
    firebase
      .database()
      .ref(
        `${props.startDate}-${props.user}/Flights/${data.first_origin}-${data.first_dest}-${data.first_carrier_name}`
      )
      .remove();
  };

  const classes = useStyles();
  const avatarClasses = avatarStyles();
  const iconButtonClasses = iconButton();

  return (
    <ListItem className={classes.gutters}>
      <ListItemAvatar className={avatarClasses.root}>
        <Avatar>{icon}</Avatar>
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
                  key={`${data[entry]["destination"]}-${data[entry]["departDate"]}`}
                >
                  <ul>
                    <li>{`Departs: ${data[entry]["Source"]}`}</li>
                    <li>{`Destination: ${data[entry]["Destination"]}`}</li>
                    <li>{`Seating Type: ${data[entry]["Carrier"]}`}</li>
                    <li>{`When: ${data[entry]["checkIn"]}`}</li>
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

export default TransportDisplay;
