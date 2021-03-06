import Button from "@material-ui/core/Button";
import calendarPic from "../../Images/calendario.jpeg";
import "./DatesForm.css";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import Fade from "react-reveal/Fade";
import React from "react";

const _MS_PER_DAY = 1000 * 60 * 60 * 24;
// get the duration of the trip based off of the two dates (account for different timezones)
let dateDiffInDays = (dateOne, dateTwo) => {
  const utc1 = Date.UTC(
    dateOne.getFullYear(),
    dateOne.getMonth(),
    dateOne.getDate()
  );
  const utc2 = Date.UTC(
    dateTwo.getFullYear(),
    dateTwo.getMonth(),
    dateTwo.getDate()
  );

  return Math.floor((utc2 - utc1) / _MS_PER_DAY + 1);
};

export default class DateForm extends React.Component {
  constructor() {
    super();
    this.state = {
      date: [new Date(), new Date()]
    };
  }

  onChange = date => this.setState({ date });

  handleSubmit = event => {
    event.preventDefault();

    // get the duration of the trip
    let duration = dateDiffInDays(this.state.date[0], this.state.date[1]);

    // pass both the dates and the duration to Home.js so they can be written to firebase
    this.props.handleDate(
      [this.state.date[0].toDateString(), this.state.date[1].toDateString()],
      duration
    );

    // reset the date input
    this.setState({
      date: [new Date(), new Date()]
    });
  };

  render() {
    return (
      <Fade top>
        <h2>
          What are our dates?
          <img
            className="calendar-pic"
            src={calendarPic}
            alt="hand drawn calendar"
          />
        </h2>
        <form className="dates-form" onSubmit={this.handleSubmit}>
          <DateRangePicker
            required
            onChange={this.onChange}
            value={this.state.date}
            minDate={new Date()}
          />
          <Button
            style={{
              backgroundColor: "#836529",
              marginTop: "5%",
              width: "10%"
            }}
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Fade>
    );
  }
}
