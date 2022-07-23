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

    let typesHtml = "";
    this.pokemon.types.forEach((type) => {
      typesHtml += `${type.type.name} `;
    });

    let abilitiesHtml = "";
    this.pokemon.abilities.forEach((ability) => {
      abilitiesHtml += `${ability.ability.name} `;
    });

    const html = `
    <h3>${this.pokemon.name}</h3>
    <img src="${this.pokemon.sprites.front_default}"></img>
    <ul>
      <li>${this.pokemon.height}</li>
      <li>${this.pokemon.weight}</li>
      <li>${typesHtml}</li>
      <li>${abilitiesHtml}</li>
    </ul>
    `;

    this.element.innerHTML = html;
  }
}

export default PokemonCard;
