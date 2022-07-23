import App from "./App";

describe("Given a component App", () => {
  describe("When instantiated a section as a parent", () => {
    const container = document.createElement("section");
    new App(container);

    test("Then it should return an element with className app inside said container", () => {
      expect(container.querySelector(".app")).not.toBe(null);
    });

    test("Then it should return a header and a footer inside the app container", () => {
      const appContainer = container.querySelector(".app");

      expect(appContainer.querySelector("header")).not.toBe(null);
      expect(appContainer.querySelector("main")).not.toBe(null);
    });
  });
});
