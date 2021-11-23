import firebase from "../../../config/Firebase";
import AccommoForm from "./AccommoForm";
import DeleteIcon from "@material-ui/icons/Delete";
import RestaurantIcon from '@material-ui/icons/Restaurant';
import Flight from "@material-ui/icons/Flight";
import LocalHotel from "@material-ui/icons/LocalHotel";
import StyledButton from "../StyledButton";
import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TravelIconButton from "./TravelIconButton";
import ExploreIcon from '@material-ui/icons/Explore';
import TransportForm from "./TransportForm";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import { Card, CardContent,IconButton, Typography, CardActions } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import RestauForm from "./RestaurantForm";
import ThingsForm from "./ThingsForm";

const useStyles = makeStyles({
  card: {
    color: "#836529",
    fontWeight: "bold",
    backgroundColor: "#f0f1f2"
  }
});

const iconButton = makeStyles(theme => ({
  root: {
    padding: "2px"
  }
}));

let travelFlag = false;
let accomoFlag = false;
let restauFlag = false;
let thignsFlag = false;

export default function TravelAndAccommoInput(props) {
  const [formType, setFormType] = useState("");

  const [accomoData, setAccomoData] = useState({});
  const [openAccommoForm, toggleAccommoForm] = useState(false);

  const [restaurantData, setRestaurantData] = useState({});
  const [openRestaurantForm, toggleRestaurantForm] = useState(false);

  const [thingsData, setThingsData] = useState({});
  const [openThingsForm, toggleThingsForm] = useState(false);

  const [childData, setChildData] = useState({});
  const [openTransportForm, toggleTransportForm] = useState(false);

  let [data, setData] = useState([]);
  const iconButtonClasses = iconButton();
  

  
  const handleTravelSubmit = data => {
    
    console.log(data);
    firebase
      .database()
      .ref(
        `${props.startDate}-${props.user}/Flights/${data.second_departure}-${data.second_arrival}-${data.first_origin}`
      )
      .set({
        Source: data.first_origin,
        Destination: data.first_dest,
        Carrier: data.first_carrier_name,
        checkIn: data.first_departure
        
      });
  };

  const raiseInvoiceClicked = data => {
      window.open(data.booking_url, '_blank');
  }
  const handleThingsSubmit = data => {
    const accommoLocation = data.city;
    const checkInString = thingsData.checkIn;
    firebase
      .database()
      .ref(
        `${props.startDate}-${props.user}/Things/${accommoLocation}-${checkInString.replace(/ /g, "")}`
      )
      .set({
        PlaceName: data.name,
        Address: data.address,
        Cuisine: data.rating,
        checkIn: thingsData.checkIn
        
      });
  };

  const handleRestaurantSubmit = data => {
    const accommoLocation = data.city;
    const checkInString = restaurantData.checkIn;
    firebase
      .database()
      .ref(
        `${props.startDate}-${props.user}/Restaurant/${accommoLocation}-${checkInString.replace(/ /g, "")}`
      )
      .set({
        RestaurantName: data.name,
        Address: data.address,
        Cuisine: data.categories,
        checkIn: restaurantData.checkIn
        
      });
  };

  const handleAccomoSubmit = data => {
    const accommoLocation = data.city;
    const checkInString = accomoData.checkIn;
    
    firebase
      .database()
      .ref(
        `${props.startDate}-${props.user}/Accommo/${accommoLocation}-${checkInString.replace(/ /g, "")}`
      )
      .set({
        HotelName: data.name,
        Address: data.address,
        Price: data.price,
        location: accomoData.location,
        checkIn: accomoData.checkIn,
        checkOut: accomoData.checkOut
      });
  };

  const handleAccomoLikeSubmit = data => {
    
    console.log("------------adadsadad-------------------");
    let preferences = {};
    firebase
      .database()
      .ref(`trip-planner-${props.user}-preference`)
      .on("value", snapshot => {
        preferences = snapshot.val();
      });

    console.log(data);
    data = preferences.stay + ',' + data;
    
    firebase
      .database()
      .ref(`trip-planner-${props.user}-preference`)
      .set({
        vacation: preferences.vacation,
        party: preferences.party,
        flight: preferences.flight,
        stay: data,
        places: preferences.places,
        restaurant: preferences.restaurant
    });
  };

  const getFlightData = () => {
    /*let preferences= {};
    firebase
      .database()
      .ref(`trip-planner-${props.user}-preference`)
      .on("value", snapshot => {
        preferences = snapshot.val();
      });

    let query = childData.seatingType.split(',');
    query.push(preferences.flight);
    
    query = query.join();

    firebase
      .database()
      .ref(`trip-planner-${props.user}-preference`)
      .set({
        vacation: preferences.vacation,
        party: preferences.party,
        flight: preferences.flight,
        stay: query,
        places: preferences.places,
        restaurant: preferences.restaurant
    });*/


    let seatingType = childData.seatingType;
    let source = childData.departsFrom;
    let dest = childData.destination;
    let outbound = childData.departDate;
    let inbound = childData.arrivalDate;

    let url = `https://3b1zxuqkmg.execute-api.us-east-1.amazonaws.com/v1/search-flights?class=${seatingType}&originplace=${source}&destinationplace=${dest}&outbounddate=${outbound}&inbounddate=${inbound}`;
    fetch(url
    , {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    ).then(function(response) {
        return response.json();
    }).then(x => {
      console.log(x);
      setData(x.body);
      })
      .then(function(myJson) {
        console.log(myJson);
      });
  }

  
  const getHotelData = () => {
    let preferences= {};
    firebase
      .database()
      .ref(`trip-planner-${props.user}-preference`)
      .on("value", snapshot => {
        preferences = snapshot.val();
      });

    let query = accomoData.location.split(',');
    if(preferences.stay !== null && preferences.stay !== undefined)
    {
      query.push(preferences.stay);
    }
    
    query = query.join();

    firebase
      .database()
      .ref(`trip-planner-${props.user}-preference`)
      .set({
        vacation: preferences.vacation,
        party: preferences.party,
        flight: preferences.flight,
        stay: query,
        places: preferences.places,
        restaurant: preferences.restaurant
    });

    let enroute = props.enroute.toLowerCase();
    let url = `https://detvv00sd6.execute-api.us-east-1.amazonaws.com/v1?query=${query}&location=${enroute}`;
    fetch(url
    , {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    ).then(function(response) {
        return response.json();
    }).then(x => {
      console.log(x);
      setData(x.body);
      })
      .then(function(myJson) {
        console.log(myJson);
      });
  }
  

  const getRestaurantData = () => {
    let preferences= {};
    firebase
      .database()
      .ref(`trip-planner-${props.user}-preference`)
      .on("value", snapshot => {
        preferences = snapshot.val();
      });

    let query = restaurantData.location.split(',');
    query.push(preferences.restaurant);
    
    query = query.join();

    firebase
      .database()
      .ref(`trip-planner-${props.user}-preference`)
      .set({
        vacation: preferences.vacation,
        party: preferences.party,
        flight: preferences.flight,
        stay: query,
        places: preferences.places,
        restaurant: preferences.restaurant
    });

    let enroute = props.enroute.toLowerCase();
    let url = `https://3b1zxuqkmg.execute-api.us-east-1.amazonaws.com/v1/search-restaurants?query=${query}&location=${enroute}`;
    fetch(url
    , {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    ).then(function(response) {
        return response.json();
    }).then(x => {
      console.log(x);
      setData(x.body);
      })
      .then(function(myJson) {
        console.log(myJson);
      });
  }

  const getThingsData = () => {
    let preferences= {};
    firebase
      .database()
      .ref(`trip-planner-${props.user}-preference`)
      .on("value", snapshot => {
        preferences = snapshot.val();
      });

    let query = thingsData.location.split(',');
    query.push(preferences.places);
    
    query = query.join();

    firebase
      .database()
      .ref(`trip-planner-${props.user}-preference`)
      .set({
        vacation: preferences.vacation,
        party: preferences.party,
        flight: preferences.flight,
        stay: query,
        places: preferences.places,
        restaurant: preferences.restaurant
    });

    let enroute = props.enroute.toLowerCase();
    let url = `https://3b1zxuqkmg.execute-api.us-east-1.amazonaws.com/v1/search-places-v2?query=${query}&location=${enroute}`;
    fetch(url
    , {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    ).then(function(response) {
        return response.json();
    }).then(x => {
      console.log(x);
      setData(x.body);
      })
      .then(function(myJson) {
        console.log(myJson);
      });
  }

  useEffect(() => {
    if (Object.keys(accomoData).length !== 0  ) {
      getHotelData();
      props.parentData(accomoData);
    }
    props.parentData(accomoData);
  }, [accomoData]);

  useEffect(() => {
    if (Object.keys(restaurantData).length !== 0  ) {
      getRestaurantData();
    }
    props.parentData(restaurantData);
  }, [restaurantData]);

  
  useEffect(() => {
    if (Object.keys(thingsData).length !== 0  ) {
      getThingsData();
    }
    props.parentData(thingsData);
  }, [thingsData]);

  useEffect(() => {
    if (formType === "Accommo") {
      console.log("Toggle");
      toggleAccommoForm(true);
        accomoFlag = true;
        restauFlag = false;
        thignsFlag = false;
        travelFlag = false;
        console.log("Accommo",thignsFlag,travelFlag, accomoFlag, restauFlag);
    
    }
    if (formType === "Flight" ) {
      
      toggleTransportForm(true);
        accomoFlag = false;
        restauFlag = false;
        thignsFlag = false;
        travelFlag = true;
        console.log("Flight",thignsFlag,travelFlag, accomoFlag, restauFlag);
    
  
          }
    if(formType === "Restaurant") {
      toggleRestaurantForm(true);
        accomoFlag = false;
        restauFlag = true;
        thignsFlag = false;
        travelFlag = false;
        console.log("Restaurant",thignsFlag,travelFlag, accomoFlag, restauFlag);
    
      }

      if (formType === "Things") {
        console.log("Toggle");
        toggleThingsForm(true);
          accomoFlag = false;
          restauFlag = false;
          thignsFlag = true;
          travelFlag = false;
          console.log("Things",thignsFlag,travelFlag, accomoFlag, restauFlag);
      
      }
    
    props.form(formType);
  }, [formType]);
  
  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    if (Object.keys(childData).length !== 0  ) {

              getFlightData();
          }
    props.parentData(childData);


  }, [childData]);

  const closeModal = () => {
    toggleAccommoForm(false);
    toggleTransportForm(false);
    toggleRestaurantForm(false);
    toggleThingsForm(false);
    console.log(childData);
    setFormType("");
  };

  const classes = useStyles();

  
  
  const display = () => {
    console.log("In Display");
    console.log(openAccommoForm,openRestaurantForm);
    
    console.log(thignsFlag,travelFlag, accomoFlag, restauFlag);
      //  thignsFlag = false;
       // travelFlag - false;
    
    if(accomoFlag) 
      return <div id= "grid" style={{height: '300px', overflow: 'auto'}}>
        {
          data.map((x, index) => 
          <Card
                    className={classes.root}
                    key={x.name}
          >
          <div className={classes.details}>
          
          </div>
          <CardContent className={classes.content}>
          <>
            <div className={`${classes.contentItem} ${classes.textContent}`}>
                  <div id="hotelname">{x.name}</div>
                  <div id="hoteladdress">{x.address}</div>
            </div>
            <div className={classes.contentItem}>
                <img src={x.thumbnail} />
            </div>
            <div className={`${classes.contentItem} ${classes.textContent}`}>
                  <div id="price">Price: {x.price}</div>
                  <div>Amenities: {x.amenities}</div>
                  <div>User Sentiments: {x.sentiment}</div>
            </div>
            </>
          </CardContent>
          <Typography component={"span"} variant={"caption"}>
            <div className="delete-entry">
              <CardActions>
            
                <IconButton
                    className={iconButtonClasses.root}
                    onClick={e =>  handleAccomoLikeSubmit(x.tagline)}
                >Like
                <ThumbUpIcon fontSize="small" />
                </IconButton>
                {''}
                {''}
                <IconButton
                    className={iconButtonClasses.root}
                    onClick={e =>  handleAccomoLikeSubmit(x.tagline)}
                >Dislike
                <ThumbDownAltIcon fontSize="small" />
                </IconButton>
                <StyledButton
                  text="Add"
                  handleClick={e => handleAccomoSubmit(x)}
                  type="submit"
                  form="accommo-form"
                />
          
              </CardActions>
            </div>
          </Typography>
          </Card>
              
          )
        }
      </div>
      
  
    if(restauFlag) 
      return <div id= "grid" style={{height: '300px', overflow: 'auto'}}>
          {
            data.map(((x, index) =>
            <Card
                      className={classes.root}
                      key={x.name}
            >
            <div className={classes.details}>
          
            </div>
            <CardContent className={classes.content}>
            <>
              <div className={`${classes.contentItem} ${classes.textContent}`}>
                    <div id="restarantname">{x.name}</div>
                    <div id="restarantaddress">{x.address}</div>
              </div>
             <div className={classes.contentItem}>
                  <img src={x.image_url} />
             </div>
              <div className={`${classes.contentItem} ${classes.textContent}`}>
                    <div id="price">Cuisine: {x.categories}</div>
                    <div>Rating: {x.rating}</div>
                    <div>User Review: {x.review}</div>
              </div>
              </>
            </CardContent>
            <Typography component={"span"} variant={"caption"}>
              <div className="delete-entry">
               <CardActions>
            
                  <IconButton
                      className={iconButtonClasses.root}
                      onClick={e =>  handleAccomoLikeSubmit(x.tagline)}
                  >Like
                  <ThumbUpIcon fontSize="small" />
                  </IconButton>
                  {''}
                  {''}
                  <StyledButton
                    text="Add"
                    handleClick={e => handleRestaurantSubmit(x)}
                    type="submit"
                    form="restau-form"
                  />
          
                </CardActions>
              </div>
            </Typography>
            </Card>
            
              
            ))
          }
        </div>
        
    if(thignsFlag) 
      return <div id= "grid" style={{height: '300px', overflow: 'auto'}}>
            {
              data.map((x, index) => 
              <Card
                        className={classes.root}
                        key={x.name}
              >
              <div className={classes.details}>
              
              </div>
              <CardContent className={classes.content}>
              <>
                <div className={`${classes.contentItem} ${classes.textContent}`}>
                      <div id="thingname">{x.name}</div>
                      <div id="thingaddress">{x.address}</div>
                </div>
                <div className={classes.contentItem}>
                    <img src={x.photo} />
                </div>
                <div className={`${classes.contentItem} ${classes.textContent}`}>
                      <div id="rating">Rating: {x.rating}</div>
                      <div>Total User Review: {x.total_user_ratings}</div>
                </div>
                </>
              </CardContent>
              <Typography component={"span"} variant={"caption"}>
                <div className="delete-entry">
                  <CardActions>
                
                    <IconButton
                        className={iconButtonClasses.root}
                        onClick={e =>  handleAccomoLikeSubmit(x.tagline)}
                    >Like
                    <ThumbUpIcon fontSize="small" />
                    </IconButton>
                    {''}
                    {''}
                    <StyledButton
                      text="Add"
                      handleClick={e => handleThingsSubmit(x)}
                      type="submit"
                      form="things-form"
                    />
              
                  </CardActions>
                </div>
              </Typography>
              </Card>
                  
              )
            }
          </div>
    
    if(travelFlag)
    return <div id= "grid" style={{height: '300px', overflow: 'auto'}}>
            {
              data.map((x, index) => 
              <Card
                        className={classes.root}
                        key={x.name}
              >
              <div className={classes.details}>
              
              </div>
              <CardContent className={classes.content}>
              <>
                <div className={`${classes.contentItem} ${classes.textContent}`}>
                      <div id="sorigin-dest">{x.first_origin}-To-{x.first_dest}</div>
                      <div id="ssrc-dest">{x.first_departure}-{x.first_arrival}</div>
                      <div id="scarr">{x.first_carrier_name}</div>
                      
                </div>
                <div className={classes.contentItem}>
                    <img src={x.first_carrier_image} />
                </div>
                <div className={`${classes.contentItem} ${classes.textContent}`}>
                      <div id="forigin-fdest">{x.second_origin}-To-{x.second_dest}</div>
                      <div id="fsrc-fdest">{x.second_departure}-{x.second_arrival}</div>
                      <div id="fcarr">{x.second_carrier_name}</div>
                      
                </div>
                <div className={classes.contentItem}>
                    <img src={x.second_carrier_image} />
                </div>
                <div className={`${classes.contentItem} ${classes.textContent}`}>
                      <div id="Price">Rating: {x.price}</div>
                </div>
                </>
              </CardContent>
              <Typography component={"span"} variant={"caption"}>
                <div className="delete-entry">
                  <CardActions>
                
                    <IconButton
                        className={iconButtonClasses.root}
                        onClick={e =>  handleAccomoLikeSubmit(x.tagline)}
                    >Like
                    <ThumbUpIcon fontSize="small" />
                    </IconButton>
                    {''}
                    {''}
                    <StyledButton
                      text="Add"
                      handleClick={e => handleTravelSubmit(x)}
                      type="submit"
                      form="things-form"
                    />
                    <StyledButton
                      text={x.agent}
                      handleClick={e => raiseInvoiceClicked(x)}
                      type="submit"
                      form="things-form"
                    />
              
                  </CardActions>
                </div>
              </Typography>
              </Card>
                  
              )
            }
          </div>
  
        };


const pintmsg = ()=>{console.log("In Div");}
  
  const pintdata = (x)=>{console.log("Data From API",x);}

  return (
    <div className="sticky-footer">
    {pintmsg()}
      <Card className={classes.card} elevation={3}>
        <div className="accommodation-travel-input">
          <TravelIconButton
            icon={<Flight />}
            value="Flight"
            label="Book and Add Flight"
            setForm={setFormType}
          />
          <TravelIconButton
            icon={<LocalHotel />}
            value="Accommo"
            label="Add a Hotel"
            setForm={setFormType}
          />
          <TravelIconButton
            icon={<RestaurantIcon />}
            value="Restaurant"
            label="Add a Restaurant"
            setForm={setFormType}
          />
          <TravelIconButton
            icon={<ExploreIcon />}
            value="Things"
            label="Add Things To Do"
            setForm={setFormType}
          />
        </div>
      </Card>
      <AccommoForm
        open={openAccommoForm}
        date={props}
        transport={formType}
        passChildData={setAccomoData}
        close={closeModal}
      />
      <RestauForm
        open={openRestaurantForm}
        date={props}
        transport={formType}
        passChildData={setRestaurantData}
        close={closeModal}
      />
      <ThingsForm
        open={openThingsForm}
        date={props}
        transport={formType}
        passChildData={setThingsData}
        close={closeModal}
      />
      <TransportForm 
        transport={formType}
        open={openTransportForm}
        date={props}
        passChildData={setChildData}
        close={closeModal}
      />
      {display()}
        </div>

  );
}
