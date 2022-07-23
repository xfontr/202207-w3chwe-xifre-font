import PokemonList from "./PokemonList";

describe("Given a PokemonList component", () => {
  describe("When instantiated with a div as a parent", () => {
    test("Then there should be a element with class 'pokemon-list' inside said container", () => {
      const container = document.createElement("div");

      new PokemonList(container);

      expect(container.querySelector(".pokemon-list")).not.toBe(null);
    });
  });
});
