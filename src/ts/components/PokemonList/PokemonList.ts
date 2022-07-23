import { IPokeList } from "../../types/icomponents.js";
import { CuratedPokemon, CurrentPokeList } from "../../types/interfaces.js";
import Component from "../Component/Component.js";
import PokemonCard from "../PokemonCard/PokemonCard.js";

const apiData = {
  apiUrl: "https://pokeapi.co/api/v2/pokemon",
  offset: `offset=0`,
  limit: `limit=10`,
  url() {
    return `${this.apiUrl}?${this.offset}&${this.limit}`;
  },
};
class PokemonList extends Component implements IPokeList {
  pokeList: CurrentPokeList;

  currentPage = 0;

  constructor(parent: HTMLElement) {
    super(parent, "pokemon-list", "section");

    this.render();
    this.getPokemons();
    this.addEventListenmers();
  }

  updatePage(direction: boolean): void {
    this.currentPage += direction ? -10 : 10;
    this.currentPage = this.currentPage < 0 ? 0 : this.currentPage;
    this.element.innerHTML = "";
    this.render();
    this.getPokemons();
    this.addEventListenmers();

    const currentPage = this.element.querySelector(
      ".card-list__pagination-page"
    );
    currentPage.textContent = `${this.currentPage / 10}`;
  }

  getPokemons(): void {
    const readEachPokemon = async (pokemons: Array<Promise<{}>>) => {
      const allData = await Promise.all(pokemons);
      const pokeList: CurrentPokeList = [];
      let index = 0;

      allData.forEach(async (pokemon: Response) => {
        const {
          id,
          name,
          height,
          weight,
          abilities,
          types,
          sprites: {
            other: {
              // eslint-disable-next-line @typescript-eslint/naming-convention
              "official-artwork": { front_default },
            },
          },
        }: CuratedPokemon = await pokemon.json();

        pokeList.push({
          id,
          name,
          height,
          weight,
          abilities,
          types,
          sprites: { other: { "official-artwork": { front_default } } },
        });

        const list: HTMLElement = this.element.querySelector(".card-list");
        const listElement: HTMLElement = document.createElement("li");
        list.appendChild(listElement);

        new PokemonCard(listElement, pokeList[index]);

        index += 1;
      });
    };

    const getEachPokemon = async (data: Promise<Array<any>>) => {
      const pokemons: Array<Promise<{}>> = [];

      Object.values(data).forEach((pokemon: { name: string; url: string }) => {
        const response = fetch(pokemon.url);
        pokemons.push(response);
      });

      return readEachPokemon(pokemons);
    };

    const fetchList = async (offset = 0) => {
      apiData.offset = `offset=${offset}`;

      const response = await fetch(apiData.url());
      const { results }: { results: Promise<Array<any>> } =
        await response.json();

      return getEachPokemon(results);
    };

    fetchList(this.currentPage);
  }

  render(): void {
    const html = `
    <ul class="card-list">
    </ul>
    <div class="card-list__pagination">

      <button type="button" class="card-list__pagination-button card-list__pagination-button--back">
        <i class="fa-solid fa-circle-chevron-left"></i>
      </button>

      <span class="card-list__pagination-page">0</span>

      <button type="button" class="card-list__pagination-button card-list__pagination-button--forward">
        <i class="fa-solid fa-circle-chevron-right"></i>
      </button>

    </div>
    `;

    this.element.innerHTML = html;
  }

  addEventListenmers(): void {
    const backButton = document.querySelector(
      ".card-list__pagination-button--back"
    );
    backButton.addEventListener("click", () => {
      this.updatePage(true);
    });

    const forwardButton = this.element.querySelector(
      ".card-list__pagination-button--forward"
    );
    forwardButton.addEventListener("click", () => {
      this.updatePage(false);
    });
  }
}
export default PokemonList;
