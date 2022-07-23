import data from "../../data.js";
import { IComponent } from "../../types/icomponents.js";
import Component from "../Component/Component.js";

class ShowDetails extends Component implements IComponent {
  data: any;

  constructor(parent: HTMLElement) {
    super(parent, "details-container", "section");

    this.getData();
  }

  async getData() {
    this.data = await data;
  }
}

export default ShowDetails;
