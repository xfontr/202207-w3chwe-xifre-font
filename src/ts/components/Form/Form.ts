import { IComponent } from "../../types/icomponents.js";
import Component from "../Component/Component.js";

class Form extends Component implements IComponent {
  constructor(parent: HTMLElement) {
    super(parent, "full-screen", "div");

    this.render();
  }

  render(): void {
    const html = `
    <form class="container">
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
}

export default Form;
