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
  const pokemonData: any = [];

  await allData.forEach((pokeshit) => pokemonData.push(pokeshit.json()));
};

const fetchList = async (offset = 0): Promise<void> => {
  apiData.offset = `offset=${offset}`;

  const response = await fetch(apiData.url());
  const data: any = await response.json();

  getEachPokemon(data);
};

export default fetchList;
