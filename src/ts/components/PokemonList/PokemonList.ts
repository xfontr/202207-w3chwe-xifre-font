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

  constructor(parent: HTMLElement) {
    super(parent, "pokemon-list", "section");

    this.getPokemons();

    this.render();
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
          // eslint-disable-next-line @typescript-eslint/naming-convention
          sprites: { front_default },
        }: CuratedPokemon = await pokemon.json();

        pokeList.push({
          id,
          name,
          height,
          weight,
          abilities,
          types,
          sprites: { front_default },
        });

        new PokemonCard(this.element, pokeList[index]);
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

    fetchList();
  }

  render(): void {
    const html = `
    <ul class=card-list>
    </ul>
    `;

    this.element.innerHTML = html;
  }
}
export default PokemonList;
