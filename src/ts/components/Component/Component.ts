import { IComponent } from "../../types/icomponents.js";

class Component implements IComponent {
  element: HTMLElement;

  constructor(parent: HTMLElement, className: string, tag: string) {
    this.element = document.createElement(tag);
    this.element.className = className;

    parent.appendChild(this.element);
  }
}

export default Component;
