import { IComponent } from "../../types/icomponents.js";
import Component from "../Component/Component.js";

class PokemonList extends Component implements IComponent {
  constructor(parent: HTMLElement) {
    super(parent, "pokemon-list", "section");
  }
}
export default PokemonList;
