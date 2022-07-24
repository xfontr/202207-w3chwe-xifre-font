import App from "../components/App/App.js";
import ShowDetails from "../components/ShowDetails/ShowDetails.js";

const body = document.querySelector("body");

new App(body);
new ShowDetails(document.querySelector("main"));
