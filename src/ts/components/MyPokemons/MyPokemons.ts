import { IComponent } from "../../types/icomponents.js";
import { CuratedPokemon } from "../../types/interfaces.js";
import Component from "../Component/Component.js";
import PokemonCard from "../PokemonCard/PokemonCard.js";

const apiData = {
  apiUrl: "https://custom-poke-api.herokuapp.com/pokemon",
  offset: 0,
  limit: 10,
};

class MyPokemons extends Component implements IComponent {
  pageLength = 0;

  constructor(parent: HTMLElement) {
    super(parent, "pokemon-list", "section");

    this.render();

    this.fetchAndRenderCards();
  }

  fetchAndRenderCards(): void {
    const fetchData = async () => {
      const response = await fetch(apiData.apiUrl);
      const data = await response.json();

      await data.map(async (dataElement: CuratedPokemon) => {
        const list: HTMLElement = document.querySelector(".card-list");
        const listElement: HTMLElement = document.createElement("li");
        listElement.className = "poke-card";
        list.appendChild(listElement);

        await new PokemonCard(listElement, dataElement, false);
        this.pageLength += 1;

        this.element.querySelector(
          ".card-list__count"
        ).textContent = `Your pokemons (${this.pageLength})`;
      });

      if (this.pageLength === 0) {
        const redirectUser = document.createElement("li");
        redirectUser.innerHTML =
          'You currently have no pokemons in your Pokedex.<a href="/" style="text-decoration: underline">Go add pokemons with the <i class="fa-solid fa-circle-plus"></i> button.</a>';
        this.element.querySelector(".card-list").appendChild(redirectUser);
      }
    };

    fetchData();
  }

  render(): void {
    const html = `
    <header class="card-list__header">
      <span class="card-list__count">Your pokemons (0)</span>
      <a class="card-list__link" href="/">Main Pokedex</a>
    </header>
    <ul class="card-list">
    </ul>
    `;

    this.element.innerHTML = html;
  }
}

export default MyPokemons;
