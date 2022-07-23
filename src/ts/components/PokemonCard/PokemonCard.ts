import { IPokemonCard } from "../../types/icomponents.js";
import Component from "../Component/Component.js";

class PokemonCard extends Component implements IPokemonCard {
  constructor(parent: HTMLElement) {
    super(parent, "poke-card", "article");
  }
}

export default PokemonCard;
