import { CuratedPokemon, CurrentPokeList } from "./interfaces";

export interface IComponent {
  element: HTMLElement;
  render?(): void;
}

export interface IPokeList {
  element: HTMLElement;
  pokeList: CurrentPokeList;
  getPokemons?(): void;
  render?(): void;
}

export interface IPokemonCard {
  element: HTMLElement;
  pokemon: CuratedPokemon;
  render?(): void;
}
