import Button from "@material-ui/core/Button";
import "./UserPreference.css";
import Fade from "react-reveal/Fade";
import React from "react";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();
const groupStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

let vacationOptions = [
    { value: 'luxury', label: 'Luxury' },
    { value: 'budget', label: 'Budget' },
    { value: 'backpacking', label: 'Back Packing' }
];

let partyOptions = [
    { value: 'family', label: 'Family' },
    { value: 'couple', label: 'Couple' },
    { value: 'solo', label: 'Solo' }
];

let flightOptions = [
    { value: 'direct', label: 'Direct' },
    { value: 'connecting', label: 'Connecting' },
    { value: 'layover', label: 'Layover' }
];


let stayOptions = [
    { value: 'resort', label: 'Resort' },
    { value: 'hotel', label: 'Hotel' },
    { value: 'homestay', label: 'Home Stay' }
];

let placesOptions = [
    { value: 'poi', label: 'Point of Interest' },
    { value: 'museum', label: 'Museum' },
    { value: 'park', label: 'Park' },
    { value: 'artgallery', label: 'Art Gallery' },
    { value: 'touristattraction', label: 'Tourist Attraction' },
    { value: 'establishment', label: 'Establishment' },
];

let restaurantOptions = [
    { value: 'local', label: 'Local' },
    { value: 'international', label: 'International' }    
];

export default class UserPreference extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            vacation: "",
            party: "",
            flight: "",
            stay: "",
            places: "",
            restaurant: ""
        };
        console.log(props);

        this.handleVacationChange = this.handleVacationChange.bind(this);
        this.handlePartyChange = this.handlePartyChange.bind(this);
        this.handleFlightChange = this.handleFlightChange.bind(this);
        this.handleStayChange = this.handleStayChange.bind(this);
        this.handlePlaceChange = this.handlePlacesChange.bind(this);
        this.handleRestaurantChange = this.handleRestaurantChange.bind(this);
        

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleRestaurantChange(evt) {
        
        let value = ''; 
        for(let i =0; i< evt.length; i++)
        {
            if(i===0)
            {
                 value = evt[i].value;
            }
            else
             {
                 value = value +  "," + evt[i].value;
             }
             
         }
         
         
         this.setState( {restaurant: value}, () => {                              
         //callback
         console.log(this.state) // myname
       });
         //console.log(this.state);
     }

    handlePlacesChange(evt) {
        
        let value = ''; 
        for(let i =0; i< evt.length; i++)
        {
            if(i===0)
            {
                 value = evt[i].value;
            }
            else
             {
                 value = value +  "," + evt[i].value;
             }
             
         }
         
         
         this.setState( {places: value}, () => {                              
         //callback
         console.log(this.state) // myname
       });
         //console.log(this.state);
     }

    handleStayChange(evt) {
        
        let value = ''; 
        for(let i =0; i< evt.length; i++)
        {
            if(i===0)
            {
                 value = evt[i].value;
            }
            else
             {
                 value = value +  "," + evt[i].value;
             }
             
         }
         
         
         this.setState( {stay: value}, () => {                              
         //callback
         console.log(this.state) // myname
       });
         //console.log(this.state);
     }

    handleFlightChange(evt) {
        
        let value = ''; 
        for(let i =0; i< evt.length; i++)
        {
            if(i===0)
            {
                 value = evt[i].value;
            }
            else
             {
                 value = value +  "," + evt[i].value;
             }
             
         }
         
         
         this.setState( {flight: value}, () => {                              
         //callback
         console.log(this.state) // myname
       });
         //console.log(this.state);
     }



    handlePartyChange(evt) {
        
        let value = ''; 
        for(let i =0; i< evt.length; i++)
        {
            if(i===0)
            {
                 value = evt[i].value;
            }
            else
             {
                 value = value +  "," + evt[i].value;
             }
             
         }
         
         
         this.setState( {party: value}, () => {                              
         //callback
         console.log(this.state) // myname
       });
         //console.log(this.state);
     }

    handleVacationChange(evt) {
        
       let value = ''; 
       for(let i =0; i< evt.length; i++)
       {
           if(i===0)
           {
                value = evt[i].value;
           }
           else
            {
                value = value +  "," + evt[i].value;
            }
            
        }
        
        
        this.setState( {vacation: value}, () => {                              
        //callback
        console.log(this.state) // myname
      });
        //console.log(this.state);
    }
    

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.props.location);
        this.props.handleUserPreference(this.state.vacation, this.state.party, this.state.flight, this.state.stay, this.state.places, this.state.restaurant);
    }

    render() {
        return ( <
            Fade top >
            <
            h2 >
            Please provide us your preferences

            <
            /h2> <
            div className = "location-form" >
            <
            form onSubmit = { this.handleSubmit } >
            
            <div style={{width: '300px'}}>
            <h3>Vacation Type</h3>
            <
            Select 
            closeMenuOnSelect = { false }
            components = { animatedComponents }
            defaultValue = {[] }
            isMulti 
            className="basic-multi-select"
            onChange={this.handleVacationChange}
            classNamePrefix="Choose"
            options = { vacationOptions }
            />
            <h3>Party Type</h3>
            <
            Select 
            closeMenuOnSelect = { false }
            components = { animatedComponents }
            defaultValue = {[] }
            isMulti 
            className="basic-multi-select"
            onChange={this.handlePartyChange}
            classNamePrefix="Choose"
            options = { partyOptions }
            />
            <h3>Flight Type</h3>
            <
            Select 
            closeMenuOnSelect = { false }
            components = { animatedComponents }
            defaultValue = {[] }
            isMulti 
            className="basic-multi-select"
            onChange={this.handleFlightChange}
            classNamePrefix="Choose"
            options = { flightOptions }
            />
            <h3>Choice of Stay</h3>
            <
            Select 
            closeMenuOnSelect = { false }
            components = { animatedComponents }
            defaultValue = {[] }
            isMulti 
            className="basic-multi-select"
            onChange={this.handleStayChange}
            classNamePrefix="Choose"
            options = { stayOptions }
            />
            <h3>Places To Visit</h3>
            <
            Select 
            closeMenuOnSelect = { false }
            components = { animatedComponents }
            defaultValue = {[] }
            isMulti 
            className="basic-multi-select"
            onChange={this.handlePlaceChange}
            classNamePrefix="Choose"
            options = { placesOptions }
            />
            <h3>Restaurant Type</h3>
            <
            Select 
            closeMenuOnSelect = { false }
            components = { animatedComponents }
            defaultValue = {[] }
            isMulti 
            className="basic-multi-select"
            onChange={this.handleRestaurantChange}
            classNamePrefix="Choose"
            options = { restaurantOptions }
            />
            </div>

            <
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
            /Button> < /
            form > <
            /div> < /
            Fade >

        );
    }
}