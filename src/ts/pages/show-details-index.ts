import App from "../components/App/App.js";
import ShowDetails from "../components/ShowDetails/ShowDetails.js";

const body = document.querySelector("body");

new App(body);
const storedData = localStorage.getItem("isEditable");
if (storedData === "true") {
  new ShowDetails(document.querySelector("main"), true);
} else {
  new ShowDetails(document.querySelector("main"), false);
}
