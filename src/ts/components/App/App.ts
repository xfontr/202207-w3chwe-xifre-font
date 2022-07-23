import { IComponent } from "../../types/icomponents.js";
import Component from "../Component/Component.js";

class App extends Component implements IComponent {
  constructor(parent: HTMLElement) {
    super(parent, "app", "div");

    this.render();
  }

  render(): void {
    const html = `<header></header><main></main>`;

    this.element.innerHTML = html;
  }
}

export default App;
