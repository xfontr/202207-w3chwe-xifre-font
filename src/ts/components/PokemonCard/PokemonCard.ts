import { IPokemonCard } from "../../types/icomponents.js";
import { CuratedPokemon } from "../../types/interfaces.js";
import Component from "../Component/Component.js";

class PokemonCard extends Component implements IPokemonCard {
  pokemon: CuratedPokemon;
  dataWithCaps: string;

  constructor(parent: HTMLElement, pokemon: CuratedPokemon = undefined) {
    super(parent, "poke-card__container", "article");

    this.pokemon = pokemon;

    this.render();
  }

  nameWithCaps(name: string): void {
    this.dataWithCaps = name.charAt(0).toUpperCase() + name.slice(1);
  }

  render(): void {
    if (!this.pokemon) return;

    let typesHtml = '<ul class="poke-card__data-container">';
    this.pokemon.types.forEach((type) => {
      this.nameWithCaps(type.type.name);

      typesHtml += `<li>${this.dataWithCaps}</li>`;
    });
    typesHtml += "</ul>";

    let abilitiesHtml = '<ul class="poke-card__data-container">';
    this.pokemon.abilities.forEach((ability) => {
      this.nameWithCaps(ability.ability.name);

      abilitiesHtml += `<li>${this.dataWithCaps}</li>`;
    });
    abilitiesHtml += "</ul>";

    this.nameWithCaps(this.pokemon.name);

    const html = `
    <h3 class="poke-card__title">${this.dataWithCaps}</h3>
    <span class="poke-card__id">${this.pokemon.id}</span>
    <img class="poke-card__image" src="${
      this.pokemon.sprites.other["official-artwork"].front_default
    }" alt="Artwork of a ${this.pokemon.name} pokemon"></img>
    
    <ul class="poke-card__data-list">
      <li class="poke-card__data-element"> Height:
        <span class="tag">${this.pokemon.height / 10} m</span>
      </li>

      <li class="poke-card__data-element"> Weight:
        <span class="tag">${this.pokemon.weight}</span>
      </li>

      <li class="poke-card__data-element"> Types:
        <span class="tag">${typesHtml}</span>
      </li>

      <li class="poke-card__data-element"> Abilities:
        <span class="tag">${abilitiesHtml}</span>
      </li>
    </ul>
    `;

    this.element.innerHTML = html;
  }
}

export default PokemonCard;
