import DateTimePicker from "react-datetime-picker";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { monthStringToNum } from "../../../utils";
import React, { useContext, useState } from "react";
import StyledTextInput from "./StyledTextInput";
import StyledButton from "../StyledButton";
import { UserContext } from "../../../Contexts/loggedin-context";

const RestauForm = props => {
  //console.log(props);
  const [user] = useContext(UserContext);
  const currentMonth = monthStringToNum(props.date.startDate.slice(3, 7));
  const [reservation, setReservation] = useState("");
  const [checkIn, setCheckIn] = useState(
    new Date(props.date.startDate.slice(11), currentMonth, props.date.startDate.slice(7, 10))
  );

  const [restaurantLocation, setRestaurantLocation] = useState("");
  const [validationError, toggleValidationError] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();

    if (
      checkIn === "" ||
      restaurantLocation === "" ||
      reservation === ""
    ) {
      toggleValidationError(true);
      return;
    }
    toggleValidationError(false);
    const checkInString = `${checkIn
      .toString()
      .slice(16, 21)} ${checkIn.toDateString()}`;
    

      const data = {
        reservation: reservation,
        checkIn: checkInString,
        location: restaurantLocation
      };
      props.passChildData(data);
    
    
    toggleValidationError(false);
    setReservation("");
    setCheckIn(
      new Date(props.date.startDate.slice(11), currentMonth, props.date.startDate.slice(7, 10))
    );
    setRestaurantLocation("");

    props.close();
  };

  const reset = () => {
    toggleValidationError(false);
    setReservation("");
    setCheckIn(
      new Date(props.date.slice(11), currentMonth, props.date.startDate.slice(7, 10))
    );
    setRestaurantLocation("");
    props.close();
  };

  return (
    <Dialog
      open={props.open}
      onClose={reset}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Find Restaurant Reservation</DialogTitle>
      <DialogContent>
        <form
          className="travel-restau-form"
          id="restau-form"
          onSubmit={handleSubmit}
        >
          {validationError ? (
            <span style={{ color: "red", textAlign: "center" }}>
              {"Please fill in all fields."}
            </span>
          ) : null}
          <StyledTextInput
            label="Restaurant"
            value={reservation}
            updateValue={setReservation}
          /> <br/>
          <StyledTextInput
            label="Cuisine"
            value={restaurantLocation}
            updateValue={setRestaurantLocation}
          /> <br/>
          <label>
            <span>{"Check In: "}</span>
            <DateTimePicker
              value={checkIn}
              onChange={date => setCheckIn(date)}
              dayPlaceholder="dd"
              monthPlaceholder="mm"
              yearPlaceholder="yyyy"
              hourPlaceholder="hh"
              minutePlaceholder="mm"
              activeStartDate={
                new Date(
                  props.date.startDate.slice(11),
                  currentMonth,
                  props.date.startDate.slice(7, 10)
                )
              }
              minDate={
                new Date(
                  props.date.startDate.slice(11),
                  currentMonth,
                  props.date.startDate.slice(7, 10)
                )
              }
              size={100}
            />
          </label>
        </form>
      </DialogContent>
      <DialogActions style={{ display: "flex", justifyContent: "center" }}>
        <StyledButton text="Cancel" handleClick={reset} />
        <StyledButton
          text="Add"
          handleClick={handleSubmit}
          type="submit"
          form="restau-form"
        />
      </DialogActions>
    </Dialog>
  );
};

export default RestauForm;
