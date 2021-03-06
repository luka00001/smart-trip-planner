import DatesForm from "../Components/homecomponents/DatesForm";
import firebase from "../config/Firebase";
import LocationForm from "../Components/homecomponents/LocationForm";
import React from "react";
import UserPreference from "../Components/UserPreference";
import Trips from "../Components/homecomponents/Trips";
import { Route, Switch } from "react-router-dom";
import TripItinerary from "../Components/homecomponents/TripItinerary";
import { ItineraryProvider } from "../Contexts/tripitinerary-context";
import { UserContext } from "../Contexts/loggedin-context";
import Script from "react-load-script";

const routes = {
  dates: "/home/dates",
  location: "/home/location",
  trips: "/home/trips",
  preference: "/home/userpreference",
  itinerary: "/home/:tripselected"
};

let url = "www.google.com";
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    // the location, dates and duration are stored here in state simply to write to the database, as the meta details of the newly created trip.
    // selectedTrip is used to temporarily keep track of the trip that the user wants to edit in TripItinerary
    this.state = {
      location: "",
      dates: null,
      tripDuration: null,
      selectedTrip: null,
      vacation: "",
      party: "",
      flight: "",
      stay: "",
      places: "",
      restaurant: ""
    };
  }

  fetchUserPreferences = () => {
    firebase.database().ref(`trip-planner-${localStorage.getItem("user")}-preference`).on("value", snapshot => {
        let tripsObj = snapshot.val();
        console.log(tripsObj);
        if(tripsObj!==null && tripsObj!== undefined )
        {
              this.setState({
                vacation: tripsObj.vacation,
                party: tripsObj.party,
                flight: tripsObj.flight,
                stay: tripsObj.stay,
                places: tripsObj.place,
                restaurant: tripsObj.restaurant
        });
        }
      });
        
        
  };

  handleLocationFormSubmit = place => {
    // take the selected destination and store in state
    this.setState({
      location: place
    });
    this.props.history.push(routes.dates);
  };

  handleUserPreferenceFormSubmit = (vacation, party, flight, stay, places, restaurant ) => {
    // take the selected destination and store in state
    this.setState({
      vacation: vacation,
      party: party,
      flight: flight,
      stay: stay,
      places: places,
      restaurant: restaurant
    }, () => {
        firebase.database().ref(`trip-planner-${firebase.auth().currentUser.uid}-preference`).set({
            vacation: this.state.vacation,
            party: this.state.party,
            flight: this.state.flight,
            stay: this.state.stay,
            places: this.state.places,
            restaurant: this.state.restaurant
        });

    });
    
    this.props.history.push(routes.location);
  };

  handleDateFormSubmit = (dates, duration) => {
    // store the dates in state
    this.setState(
      {
        dates: dates,
        tripDuration: duration
      },
      this.createTripInFirebase
    );
    this.props.history.push(routes.trips);
  };

  createTripInFirebase = () => {
    // create a trip details node in firebase to hold the meta details for the new trip
    firebase
      .database()
      .ref(`trip-details-${this.context[0]}/${this.state.dates[0]}`)
      .set({
        location: this.state.location,
        dates: this.state.dates,
        duration: this.state.tripDuration
      });
    // create an empty node in firebase to store the itinerary details
    firebase
      .database()
      .ref(`${this.state.dates[0]}-${this.context[0]}/`)
      .set({
        startDate: this.state.dates[0]
      });
  };

  displayTrip = trip => {
    // grab the trip the user has selected from firebase and store it in state so it can be passed to the itinerary components
    firebase
      .database()
      .ref(`trip-details-${this.context[0]}/${trip}`)
      .on("value", snapshot => {
        let tripsObj = snapshot.val();
        this.setState(
          {
            selectedTrip: tripsObj
          },
          this.props.history.push(`/home/${trip}`)
        );
      });
  };

  componentDidMount = () => {
    let setter = this.context[1];
    setter(localStorage.getItem("user"));
    this.props.history.push(routes.location);
  };
  render() {
    return (
      <div>
        <Script url = {url}
            onLoad = { this.fetchUserPreferences }
            />
        <ItineraryProvider>
          <Switch>
            <Route
              path={routes.location}
              render={() => (
                <LocationForm handleLocation={this.handleLocationFormSubmit} />
              )}
            />
            <Route
              path={routes.dates}
              render={() => (
                <DatesForm handleDate={this.handleDateFormSubmit} />
              )}
            />
            <Route
              path={routes.trips}
              render={props => (
                <Trips {...props} displayTrip={this.displayTrip} />
              )}
            />
            <Route
              path={routes.preference}
              render={props => (
                <UserPreference {...props} handleUserPreference={this.handleUserPreferenceFormSubmit}
                />
              )}
            />
            <Route
              path={routes.itinerary}
              render={props => (
                <TripItinerary
                  {...props}
                  returnRoute={routes.trips}
                  trip={this.state.selectedTrip}
                />
              )}
            />
          </Switch>
        </ItineraryProvider>
      </div>
    );
  }
}

Home.contextType = UserContext;
