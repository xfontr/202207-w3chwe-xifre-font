export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonList {
  count: number;
  next: string;
  previous: string;
  results: Array<Pokemon>;
}

export interface CuratedPokemon {
  name: string;
}

export interface CurrentPokeList extends Array<CuratedPokemon> {}
