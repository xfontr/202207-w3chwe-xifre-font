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
    super(parent, "my-pokemons", "section");

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
          ".pokemon-list__count"
        ).textContent = `${this.pageLength} pokemons`;
      });
    };

    fetchData();
  }

  render(): void {
    const html = `
    <span class="pokemon-list__count">${this.pageLength} pokemons</span>
    <ul class="card-list">
    </ul>
    `;

    this.element.innerHTML = html;
  }
}

export default MyPokemons;
