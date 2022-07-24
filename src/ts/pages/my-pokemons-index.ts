import App from "../components/App/App.js";
import MyPokemons from "../components/MyPokemons/MyPokemons.js";

const body = document.querySelector("body");

new App(body);
new MyPokemons(document.querySelector("main"));
