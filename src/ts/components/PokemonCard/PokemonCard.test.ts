import PokemonCard from "./PokemonCard";

describe("Given a PokemonCard component", () => {
  describe("When instantiated inside a section container", () => {
    test("Then there should be an article inside said container", () => {
      const container = document.createElement("section");

      new PokemonCard(container);

      expect(container.querySelector("article")).not.toBeNull();
    });
  });
});
