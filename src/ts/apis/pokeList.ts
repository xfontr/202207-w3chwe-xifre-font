import { CuratedPokemon } from "../types/interfaces.js";
import currentPokeList from "./currentPokeList.js";

const apiData = {
  apiUrl: "https://pokeapi.co/api/v2/pokemon",
  offset: `offset=0`,
  limit: `limit=10`,
  url() {
    return `${this.apiUrl}?${this.offset}&${this.limit}`;
  },
};

const readEachPokemon = async (pokemons: Array<Promise<{}>>): Promise<void> => {
  const allData = await Promise.all(pokemons);

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

const getEachPokemon = async (data: Promise<Array<any>>): Promise<void> => {
  const pokemons: Array<Promise<{}>> = [];

  Object.values(data).forEach((pokemon: { name: string; url: string }) => {
    const response = fetch(pokemon.url);
    pokemons.push(response);
  });

  readEachPokemon(pokemons);
};

const fetchList = async (offset = 0): Promise<void> => {
  apiData.offset = `offset=${offset}`;

  const response = await fetch(apiData.url());
  const { results }: { results: Promise<Array<any>> } = await response.json();

  getEachPokemon(results);
};

export default fetchList;
