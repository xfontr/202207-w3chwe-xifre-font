import App from "./components/App/App.js";
import PokemonList from "./components/PokemonList/PokemonList.js";

const body = document.querySelector("body");

new App(body);

new PokemonList(document.querySelector("main"));
