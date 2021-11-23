/* eslint-disable prettier/prettier */
import Button from "@material-ui/core/Button";
import Fade from "react-reveal/Fade";
import "./LocationForm.css";
import plane from "../../Images/airplane.png";
import React from "react";
import Script from "react-load-script";
import SearchBar from "material-ui-search-bar";

const API_KEY = "AIzaSyCODgqK2GMdzOqQ5TtS7LTDEfWzW3FY3jM";

const url = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`;
console.log(url);
export default class LocationForm extends React.Component {
    constructor() {
            super();
            this.state = {
                city: "",
                query: ""
            };
        }
        // this loads the script for google autocomplete
    handleScriptLoad = () => {
        // Declare Options For Autocomplete
        var options = {
            types: ["(cities)"]
        };

        // Initialize Google Autocomplete
        /*global google*/

        this.autocomplete = new google.maps.places.Autocomplete(
            document.getElementById("autocomplete"),
            options
        );
        this.autocomplete1 = new google.maps.places.Autocomplete(
            document.getElementById("autocomplete1"),
            options
        );

        this.autocomplete.setFields(["address_components", "formatted_address"]);
        // Fire Event when a suggested name is selected
        this.autocomplete.addListener("place_changed", this.handlePlaceSelect);

        this.autocomplete1.setFields(["address_components", "formatted_address"]);
        // Fire Event when a suggested name is selected
        this.autocomplete1.addListener("place_changed", this.handlePlaceSelect);
    };

    handlePlaceSelect = () => {
        // Extract City From Address Object
        if(this.autocomplete.getPlace()==="" || this.autocomplete.getPlace()=== undefined || this.autocomplete.getPlace() === null  )
        {
          let place = this.autocomplete1.getPlace();
          let address = place.address_components;
          console.log(this);
          // Check if address is valid
          if (address) {
              // Set State
              this.setState({
                  city: address[0].long_name,
                  query1: place.formatted_address,
                
              });
          }
        }
        else
        {
          let place = this.autocomplete.getPlace();
          let address = place.address_components;
          console.log(this);
          // Check if address is valid
          if (address) {
              // Set State
              this.setState({
                  city: address[0].long_name,
                  query: place.formatted_address,
                
              });
          }
        }
    };

    // pass the information on to the home componenet where it can be written to firebase, reset the inputs to empty string
    handleSubmit = event => {
        event.preventDefault();

        if (this.state.city === "") {
            // make sure the user doesn't submit an empty string, make sure they select from the autocomplete suggestions
            return;
        }

        this.props.handleLocation(this.state.city);
        this.setState({
            city: "",
            query: ""
        });
    };

    render() {
        return ( <
            Fade top >
            <
            h2 >
            Where are you off to ?
            <
            img className = "plane"
            src = { plane }
            alt = "paper airplane" / >
            <
            /h2>
            <
            div className = "location-form" >
            <
            Script url = { url }
            onLoad = { this.handleScriptLoad }
            /> 
            <
            form onSubmit = { this.handleSubmit } >
            < h3>From</h3>
            <SearchBar id = "autocomplete1"
            placeholder = "Select the source city"
            required value = { this.state.query1 }
            style = {
                {
                    marginLeft: "-50%",
                    width: "200%"
                }
            }
            />
            < h3>To</h3>
            
            <SearchBar id = "autocomplete"
            placeholder = "Select the destination city"
            required value = { this.state.query }
            style = {
                {
                    marginLeft: "-50%",
                    width: "200%"
                }
            }
            /> <
            Button style = {
                {
                    backgroundColor: "#836529",
                    marginTop: "5%",
                    width: "50%",
                    marginLeft: "25%"
                }
            }
            type = "submit" >
            Submit <
            /Button> <
            /form> <
            /div> <
            /Fade>
        );
    }
}