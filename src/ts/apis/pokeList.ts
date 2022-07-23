import { CuratedPokemon, Pokemon, PokemonList } from "../types/interfaces.js";
import currentPokeList from "./currentPokeList.js";

const apiData = {
  apiUrl: "https://pokeapi.co/api/v2/pokemon",
  offset: `offset=0`,
  limit: `limit=10`,
  url() {
    return `${this.apiUrl}?${this.offset}&${this.limit}`;
  },
};

const getEachPokemon = async (data: PokemonList) => {
  const pokemons: any = [];

  data.results.forEach((pokemon: Pokemon) => {
    const response = fetch(pokemon.url);
    pokemons.push(response);
  });

  const allData = await Promise.all(pokemons);

  allData.forEach(async (pokemon) => {
    const pokeData: any = await pokemon.json();

    const {
      id,
      name,
      height,
      weight,
      abilities,
      types,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      sprites: { front_default },
    }: CuratedPokemon = pokeData;

    currentPokeList.push({
      id,
      name,
      height,
      weight,
      abilities,
      types,
      sprites: { front_default },
    });
  });
};

const fetchList = async (offset = 0): Promise<void> => {
  apiData.offset = `offset=${offset}`;

  const response = await fetch(apiData.url());
  const data: any = await response.json();

  getEachPokemon(data);
};

export default fetchList;
