import List from "@material-ui/core/List";
import RestaurantDisplay from "./RestaurantDisplay";
import AccommoDisplay from "./AccommoDisplay";
import ThingsDisplay from "./ThingsDisplay";
import RestaurantIcon from '@material-ui/icons/Restaurant';
import Flight from "@material-ui/icons/Flight";
import ExploreIcon from '@material-ui/icons/Explore';
import React, { useContext } from "react";
import StyledDivider from "./StyledDivider";
import TransportDisplay from "./TransportDisplay";
import { TripItineraryContext } from "../../../Contexts/tripitinerary-context";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: "4px",
    paddingBottom: "4px"
  }
}));

const TravelAndAccommoDisplay = () => {
  const [trip] = useContext(TripItineraryContext);
  console.log([trip]);
  const classes = useStyles();

  // before rendering these out, need to check for undefined
  const flights = trip["Flight"];
  const accommo = trip["Accommo"];
  const restau = trip["Restaurant"];
  console.log([trip]);
  const things = trip["Things"];
  return (
    <div className="travel-accommo-display">
      <List className={classes.root}>
        <StyledDivider />
        <AccommoDisplay data={accommo} dateID={trip.startDate} />
        <StyledDivider />
        <RestaurantDisplay data={restau} dateID={trip.startDate} />
        <StyledDivider />
        <TransportDisplay
          icon={<Flight />}
          data={flights}
          transport="Flight"
          dateID={trip.startDate}
        />
        <StyledDivider />
        <ThingsDisplay data={things} dateID={trip.startDate} />
        <StyledDivider />
      </List>
    </div>
  );
};

export default TravelAndAccommoDisplay;
