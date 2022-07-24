import { IComponent } from "../../types/icomponents.js";
import { CuratedPokemon } from "../../types/interfaces.js";
import Component from "../Component/Component.js";

class Form extends Component implements IComponent {
  pokemon: CuratedPokemon;

  constructor(parent: HTMLElement, pokemon: CuratedPokemon) {
    super(parent, "full-screen", "div");

    this.pokemon = pokemon;

    this.render();
    this.addEventListeners();
  }

  render(): void {
    const html = `
    <form class="form">
      <label class="form__label">
        <input class="form__data-name" type="text"></input>
      </label>

      <label class="form__label">
        <input class="form__data-height" type="number"></input>
      </label>
      
      <label class="form__label">
        <input class="form__data-weight" type="number"></input>
      </label>
    
      <button type="submit">Update data</button>
    </div>
    `;

    this.element.innerHTML = html;
  }

  addEventListeners(): void {
    const form = this.element.querySelector(".form");
    const { id } = this.pokemon;

    const newName: HTMLInputElement =
      document.querySelector(".form__data-name");

    const newHeight: HTMLInputElement =
      document.querySelector(".form__data-height");

    const newWeight: HTMLInputElement =
      document.querySelector(".form__data-weight");

    form.addEventListener("submit", () => {
      fetch(`https://custom-poke-api.herokuapp.com/pokemon/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          id: this.pokemon.id,
          name: newName.value,
          height: newHeight.value,
          weight: newWeight.value,
          abilities: this.pokemon.abilities,
          types: this.pokemon.types,
          sprites: this.pokemon.sprites,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then(() => {
          window.location.href = "/pages/my-pokedex";
        });
    });
  }
}

export default Form;
