import ShowDetails from "./ShowDetails";

describe("Given a Component ShowDetails", () => {
  describe("When instantiated with a div as a parent", () => {
    test("Then there should be a section inside said parent", () => {
      const parent = document.createElement("div");

      new ShowDetails(parent);

      expect(parent.querySelector("section")).not.toBeNull();
    });
  });
});
