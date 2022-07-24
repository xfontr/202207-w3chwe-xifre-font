import { IComponent } from "../../types/icomponents.js";
import { CuratedPokemon } from "../../types/interfaces.js";
import Component from "../Component/Component.js";

class ShowDetails extends Component implements IComponent {
  data: any;
  pokemon: CuratedPokemon;
  dataWithCaps: string;
  id = "";

  constructor(parent: HTMLElement) {
    super(parent, "details-container", "section");

    const getQuery = () => {
      let query = false;
      let id = "";
      for (let index = 0; index < window.location.href.length; index += 1) {
        if (query) {
          id += window.location.href[index];
        }
        if (window.location.href[index] === "?") {
          query = true;
        }
      }

      this.id = id;
    };

    getQuery();
    this.fetchAndRender();
  }

  fetchAndRender() {
    const getData = async () => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${this.id}`
      );
      const {
        id,
        name,
        height,
        weight,
        abilities,
        types,
        sprites: {
          other: {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            "official-artwork": { front_default },
          },
        },
      }: CuratedPokemon = await response.json();

      this.pokemon = {
        id,
        name,
        height,
        weight,
        abilities,
        types,
        sprites: {
          other: {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            "official-artwork": { front_default },
          },
        },
      };
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
    };

    getData();
  }

  nameWithCaps(name: string): void {
    this.dataWithCaps = name.charAt(0).toUpperCase() + name.slice(1);
  }
}

export default ShowDetails;
