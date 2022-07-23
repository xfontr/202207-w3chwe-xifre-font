import IComponent from "../../types/icomponents";
import Component from "../Component/Component";

class PokemonList extends Component implements IComponent {
  constructor(parent: HTMLElement) {
    super(parent, "pokemon-list", "section");
  }
}
export default PokemonList;
