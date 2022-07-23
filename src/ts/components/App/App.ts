import { IComponent } from "../../types/icomponents.js";
import Component from "../Component/Component.js";

class App extends Component implements IComponent {
  constructor(parent: HTMLElement) {
    super(parent, "app", "div");

    this.render();
  }

  render(): void {
    const html = `
    <header class="header">
      <h1 class="header__title">My Pokedex</h1>
    </header>
    <main></main>`;

    this.element.innerHTML = html;
  }
}

export default App;
