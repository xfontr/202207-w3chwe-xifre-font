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
    this.addEventListeners();
  }

  nameWithCaps(name: string): void {
    this.dataWithCaps = name.charAt(0).toUpperCase() + name.slice(1);
  }

  addEventListeners() {
    if (!this.pokemon) return;
    const showDetails = this.element.querySelector(".poke-card__show-details");
    showDetails.addEventListener("click", (event) => {
      event.preventDefault();
      sessionStorage.setItem("pokeId", showDetails.getAttribute("id"));

      window.location.href = showDetails.getAttribute("href");
    });
  }

  render(): void {
    if (!this.pokemon) return;

    let typesHtml = '<ul class="poke-card__data-container">';
    this.pokemon.types.forEach((type) => {
      this.nameWithCaps(type.type.name);

      typesHtml += `<li><span class="${this.dataWithCaps.toLowerCase()} tag tag--type">${
        this.dataWithCaps
      }</span></li>`;
    });
    typesHtml += "</ul>";

    let abilitiesHtml = '<ul class="poke-card__data-container">';
    this.pokemon.abilities.forEach((ability) => {
      this.nameWithCaps(ability.ability.name);

      abilitiesHtml += `<li><span class="tag tag--abilities">${this.dataWithCaps}</span></li>`;
    });
    abilitiesHtml += "</ul>";

    this.nameWithCaps(this.pokemon.name);

    const html = `
    <h3 class="poke-card__title">${this.dataWithCaps}</h3>
    <span class="poke-card__id">#${this.pokemon.id}</span>
    <a href="/pages/show-detail" id="${
      this.pokemon.id
    }" class="poke-card__show-details">
      <i class="fa-solid fa-eye"></i>
    </a>
    <img class="poke-card__image" src="${
      this.pokemon.sprites.other["official-artwork"].front_default
    }" alt="Artwork of a ${this.pokemon.name} pokemon"></img>
    
    <ul class="poke-card__data-list">
      <li class="poke-card__data-element"> Height:
        <span class="tag">${this.pokemon.height / 10} m</span>
      </li>

      <li class="poke-card__data-element"> Weight:
        <span class="tag">${this.pokemon.weight / 10} kg</span>
      </li>

      <li class="poke-card__data-element"> Types:
        ${typesHtml}
      </li>

      <li class="poke-card__data-element"> Abilities:
        ${abilitiesHtml}
      </li>
    </ul>
    `;

    this.element.innerHTML = html;
  }
}

export default PokemonCard;
