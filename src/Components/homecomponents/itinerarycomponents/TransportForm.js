import DateTimePicker from "react-datetime-picker";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import firebase from "../../../config/Firebase";
import { monthStringToNum } from "../../../utils";
import React, { useContext, useState } from "react";
import StyledTextInput from "./StyledTextInput";
import StyledButton from "../StyledButton";
import { UserContext } from "../../../Contexts/loggedin-context";

const url = "https://partners.api.skyscanner.net/apiservices/pricing/v1.0";

const TransportForm = props => {
  const [user] = useContext(UserContext);
  const currentMonth = monthStringToNum(props.date.startDate.slice(3, 7));
  const [seatingType, setSeatingType] = useState("");
  const [departsFrom, setDepartsFrom] = useState("");
  const [departDateTime, setDepartDateTime] = useState(
    new Date(props.date.startDate.slice(11), currentMonth, props.date.startDate.slice(7, 10))
  );
  const [destination, setDestination] = useState("");
  const [validationError, toggleValidationError] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();
    
    if (
      destination === "" || seatingType === "" ||
      departDateTime === "" ||
      departsFrom === ""
    ) {
      toggleValidationError(true);
      return;
    }

    toggleValidationError(false);

    const today = Date.now(`${props.date.startDate}`);
    const startDate = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(today);
    const split_date = startDate.substring(0,10).split('/');
    const sourceDate = split_date[2] + "-" + split_date[0] + "-" + split_date[1];
    
    const endDate = Date.now(`${props.date.endDate}`);
    console.log(endDate);
    const end_Date = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(endDate);
    const end_split_date = end_Date.substring(0,10).split('/');
    const destDate = end_split_date[2] + "-" + end_split_date[0] + "-" + end_split_date[1];
    
    const parentData = {
        seatingType: seatingType,
        departsFrom: departsFrom,
        destination: destination,
        departDate: "2021-05-01",
        arrivalDate: "2021-05-05"
    };

    props.passChildData(parentData);    
    
    
    toggleValidationError(false);
    setDepartsFrom("");
    setSeatingType("");
    setDepartDateTime(
      new Date(props.date.startDate.slice(11), currentMonth, props.date.startDate.slice(7, 10))
    );
    setDestination("");

    props.close();
  };

  const reset = () => {
    toggleValidationError(false);
    setSeatingType("");
    setDepartsFrom("");
    setDepartDateTime(
      new Date(props.date.startDate.slice(11), currentMonth, props.date.startDate.slice(7, 10))
    );
    setDestination("");
    props.close();
  };

  return (
    <Dialog
      open={props.open}
      onClose={reset}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        {!props.transport ? null : `Add a ${props.transport}`}
      </DialogTitle>
      <DialogContent>
        <form className="travel-accommo-form" onSubmit={handleSubmit}>
          {validationError ? (
            <span style={{ color: "red", textAlign: "center" }}>
              {"Please fill in all fields."}
            </span>
          ) : null}
          <StyledTextInput
            label="Departs From"
            value={departsFrom}
            updateValue={setDepartsFrom}
          />
          <StyledTextInput
            label="Destination"
            value={destination}
            updateValue={setDestination}
          />
          <StyledTextInput
            label="Seating Type"
            value={seatingType}
            updateValue={setSeatingType}
          />
          <label>
            <span>{"Departs at: "}</span>
            <DateTimePicker
              value={departDateTime}
              onChange={date => setDepartDateTime(date)}
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
        <StyledButton text="Submit" handleClick={handleSubmit} type="submit" />
      </DialogActions>
    </Dialog>
  );
};

export default TransportForm;
