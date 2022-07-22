export interface Pokemon {
  name: string;
  url: string;
}

export type PokemonList = {
  count: number;
  next: string;
  previous: string;
  results: Array<Pokemon>;
};
