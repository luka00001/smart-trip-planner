## Travel Planner

This travel palnning application is a one way shop for any traveller who feels overwhelmed when crafting their travel itineraries. The application would start a user’s journey after logging in and provides curated recommendations based on user’s reaction on recommendations.

It allows user specific recommendations based on preferences provided when signing in and then user can choose a destination, dates, then input events and reservation info based on their selections. This itineary information is then stored in Firebase database and displayed for the user whenever they signin so they can stay current on the things they planned to do during their trip.

It is built using React.js, with Material-UI used as the design system. The application is hosted on Google Firebase and it is employed for authentication as well as for storing the information regarding itineraries. React-Router is utilized for client side routing. It uses the Google Places API for suggesting travel destinations and skyscanner API to suggests flights in realtime and hotels and destination information are suggested from the data collected and stored in AWS dynamodb. Google Calendars API is integrated with the app so one can export their itinerary and have it with them anywhere they are traveling!

## Get Started

In the project directory:

1. npm / yarn install
2. npm / yarn start
3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Travel Planner is also available at [https://trip-planner-251a0.web.app/landing](https://trip-planner-251a0.web.app/landing/)
