import { Pokemon, PokemonList } from "../types/interfaces.js";

const apiData = {
  offset: `offset=0`,
  limit: `limit=10`,
  url() {
    return `https://pokeapi.co/api/v2/pokemon?${this.offset}&${this.limit}`;
  },
};

const fetchPokemon = async (pokemon: Pokemon): Promise<void> => {
  const response = await fetch(pokemon.url);
  const data = await response.json();

  document.write(data);
};

const getEachPokemon = (data: PokemonList) => {
  data.results.forEach((pokemon: Pokemon) => {
    fetchPokemon(pokemon);
  });
};

const fetchList = async (offset = 0): Promise<void> => {
  apiData.offset = `offset=${offset}`;

  const response = await fetch(apiData.url());
  const data = await response.json();

  getEachPokemon(data);
};

export default fetchList;
