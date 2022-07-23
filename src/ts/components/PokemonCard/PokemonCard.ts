import { IPokemonCard } from "../../types/icomponents.js";
import { CuratedPokemon } from "../../types/interfaces.js";
import Component from "../Component/Component.js";

class PokemonCard extends Component implements IPokemonCard {
  pokemon: CuratedPokemon;

  constructor(parent: HTMLElement, pokemon: CuratedPokemon = undefined) {
    super(parent, "poke-card", "article");

    this.pokemon = pokemon;

    this.render();
  }

  render(): void {
    if (!this.pokemon) return;

    const html = `<h3>${this.pokemon.name}</h3>`;

    this.element.innerHTML = html;
  }
}

export default PokemonCard;
