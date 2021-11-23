import CalendarExport from "./itinerarycomponents/CalendarExport";
import { createArrayOfDates } from "../../utils";
import Fade from "react-reveal/Fade";
import firebase from "../../config/Firebase";
import Itinerary from "./itinerarycomponents/Itinerary";
import LoadingIndicator from "./LoadingIndicator";
import React, { useContext, useEffect, useState } from "react";
import UserData from "./itinerarycomponents/UserData";
import TravelAndAccommoDisplay from "./itinerarycomponents/TravelAndAccommoDisplay";
import TravelAndAccommoInput from "./itinerarycomponents/TravelAndAccommoInput";
import "./TripItinerary.css";
import { TripItineraryContext } from "../../Contexts/tripitinerary-context";
import { UserContext } from "../../Contexts/loggedin-context";

const TripItinerary = props => {
  console.log("----------ggsgsg---------------");
  console.log(props);
  const [trip, updateTrip] = useContext(TripItineraryContext);
  const [user] = useContext(UserContext);
  
  const [formType, setFormType] = useState("Flight");
  const [childData, setChildData] = useState({});
  
  // get the trips for the selected trip add them to the TripContext so it's available wherever it might be needed in the app
  const fetchTripData = () => {
    firebase
      .database()
      .ref(`${props.trip.dates[0]}-${user}/`)
      .on("value", snapshot => {
        let tripsObj = snapshot.val();
        updateTrip(tripsObj);
      });

  };

  useEffect(() => {
    console.log("Set");
  }, [childData, formType]);

  useEffect(() => {
    if (props.trip === null) {
      props.history.push(props.returnRoute);
    } else {
      fetchTripData();
    }
  }, []);

  return (
    <Fade bottom>
      {trip === "" || trip === null ? (
        <LoadingIndicator />
      ) : (
        <>
          <h2 className="trip-title">{`Your trip to ${props.trip["location"]}`}</h2>
          <h4 className="trip-date-title">{`${props.trip["dates"][0].slice(
            3
          )} to ${props.trip["dates"][1].slice(3)}`}</h4>
          <CalendarExport
            dates={createArrayOfDates(props.trip.dates[0], props.trip.dates[1])}
          />
          <div className="itinerary-data-display">
            <TravelAndAccommoDisplay />
            <Itinerary
              dates={createArrayOfDates(
                props.trip.dates[0],
                props.trip.dates[1]
              )}
              dateID={props.trip.dates[0]}
            />
          </div>
          <TravelAndAccommoInput startDate={props.trip.dates[0]} endDate={props.trip.dates[1]} user={user} form={setFormType} parentData={setChildData} enroute={props.trip.location} />
        </>
      )}
    </Fade>
  );
};

export default TripItinerary;
