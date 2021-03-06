import Add from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import React from "react";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  card: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14,
    marginBottom: "15%",
    display: "flex",
    alignItems: "center"
  },
  delete: {
    marginRight: "5%",
    marginLeft: "-5%"
  },
  pos: {
    marginBottom: 12
  }
});

export default function TripCards(props) {
  const classes = useStyles();

  return (
    <div className="trip-cards">
      {/* {loop through each of the nodes of meta details for the trips and display them on a Card component} */}
      {props.tripsKeys.map(trip => (
        <Card className={classes.card} key={trip}>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              <IconButton
                className={classes.delete}
                onClick={e => props.deleteTrip(e, trip)}
              >
                <DeleteIcon />
              </IconButton>
              {`${props.trips[trip]["dates"][0].slice(3)} to ${props.trips[
                trip
              ]["dates"][1].slice(3)}`}
            </Typography>
            <Typography variant="h5" component="h2">
              {props.trips[trip]["location"]}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              style={{ marginLeft: "12%", marginBottom: "5%" }}
              onClick={e => props.tripSelected(e, trip)}
            >
              <span className="MuiButton-label">Add to Itinerary </span>
              <Add />
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
}
