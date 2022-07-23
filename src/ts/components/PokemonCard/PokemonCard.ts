import Component from "../Component/Component";

class PokemonCard extends Component {
  constructor(parent: HTMLElement) {
    super(parent, "article", "poke-card");
  }
}

export default PokemonCard;
