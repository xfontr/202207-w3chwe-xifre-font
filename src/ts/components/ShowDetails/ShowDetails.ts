import { IComponent } from "../../types/icomponents.js";
import { CuratedPokemon } from "../../types/interfaces.js";
import Component from "../Component/Component.js";
import Form from "../Form/Form.js";

class ShowDetails extends Component implements IComponent {
  data: any;
  pokemon: CuratedPokemon;
  dataWithCaps: string;
  id = "";
  isEditable: boolean;

  constructor(
    parent: HTMLElement,
    currentPokemon: CuratedPokemon = undefined,
    isEditable: boolean = false
  ) {
    super(parent, "pokemon-list pokemon-list--data", "section");

    this.isEditable = isEditable;
    if (currentPokemon) {
      this.pokemon = currentPokemon;
    } else {
      this.getQuery();
    }
    this.fetchAndRender();
  }

  getQuery(): void {
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
  }

  fetchAndRender() {
    const getData = async () => {
      if (!this.pokemon) {
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
              "official-artwork": { front_default },
            },
          },
        };
      }

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

    <header class="card-list__header" style="width: 100%">
      <i class="card-list__count fa-solid fa-eye"></i>
      <a class="card-list__link card-list__link--not-last" href="/pages/my-pokedex">Main Pokedex</a>
      <a class="card-list__link" href="/pages/my-pokedex">My pokemon</a>
    </header>
    
    <div clas="poke-card__data-group">
      <img class="poke-card__image" src="${
        this.pokemon.sprites.other["official-artwork"].front_default
      }" alt="Artwork of a ${this.pokemon.name} pokemon"></img>
    </div>

    <div clas="poke-card__data-group">
      <h3 class="poke-card__title">${this.dataWithCaps}</h3>
      <span class="poke-card__id">ID: #${this.pokemon.id}</span>
        
      <ul class="poke-card__data-list">
        <li class="poke-card__data-element"> Height:
          <span class="tag">${this.pokemon.height / 10} m</span>
        </li>

        <li class="poke-card__data-element"> Weight:
          <span class="tag">${this.pokemon.weight / 10} kg</span>
          </li>
        </ul>
        
        <ul class="poke-card__data-list">
          <li class="poke-card__data-element" style="width: 100%"> Types:
          ${typesHtml}
        </li>

        <li class="poke-card__data-element"> Abilities:
          ${abilitiesHtml}
        </li>
      </ul>
    </div>
      ${
        this.isEditable
          ? '<a class="poke-card__edit"><i class="fa-solid fa-pencil"></i></a>'
          : ""
      }      
    `;

      this.element.innerHTML = html;
      this.addEventListeners();
    };

    getData();
  }

  nameWithCaps(name: string): void {
    this.dataWithCaps = name.charAt(0).toUpperCase() + name.slice(1);
  }

  addEventListeners(): void {
    if (!this.isEditable) return;

    const editButton = this.element.querySelector(".poke-card__edit");

    editButton.addEventListener("click", () => {
      new Form(document.body, this.pokemon);
    });
  }
}

export default ShowDetails;
