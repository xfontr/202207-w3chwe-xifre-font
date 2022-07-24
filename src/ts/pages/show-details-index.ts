import App from "../components/App/App.js";
import ShowDetails from "../components/ShowDetails/ShowDetails.js";

const body = document.querySelector("body");

new App(body);

const storedData = localStorage.getItem("isEditable");
const storedPokemon = localStorage.getItem("pokemon");
const currentPokemon = JSON.parse(storedPokemon);
localStorage.clear();

if (storedData === "true") {
  new ShowDetails(document.querySelector("main"), currentPokemon, true);
} else {
  new ShowDetails(document.querySelector("main"), currentPokemon, false);
}
