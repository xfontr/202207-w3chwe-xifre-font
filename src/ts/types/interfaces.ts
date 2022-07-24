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
  pokeId?: number;
  id?: number;
  name: string;
  height: number;
  weight: number;
  abilities: CuratedPokemonAbilitiesList;
  types: CuratedPokemonTypesList;
  sprites: {
    other: {
      "official-artwork": { front_default: string };
    };
  };
}

export interface CuratedPokemonAbilities {
  ability: {
    name: string;
    url: string;
  };
}

export interface CuratedPokemonAbilitiesList
  extends Array<CuratedPokemonAbilities> {}

export interface CuratedPokemonTypes {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface CuratedPokemonTypesList extends Array<CuratedPokemonTypes> {}

export interface CurrentPokeList extends Array<CuratedPokemon> {}
