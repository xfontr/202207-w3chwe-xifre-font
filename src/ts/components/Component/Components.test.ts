import Component from "./Component";

describe("Given a component Component", () => {
  describe("When instantiated with a container as a parent", () => {
    test("Then there should be a another div inside said parent", () => {
      const container = document.createElement("section");
      const tag = "div";

      new Component(container, "", tag);

      expect(container.querySelector(tag)).not.toBeNull();
    });
  });
});
