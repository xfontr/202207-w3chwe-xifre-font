import Form from "./Form";

describe("Given a component Form", () => {
  const container = document.createElement("section");
  const className = "full-screen";
  const tag = "div";

  describe("When instantiated inside a section as a parent", () => {
    new Form(container);
    test("Then it should show a div 'full-screen' inside said parent", () => {
      expect(container.querySelector(tag)).not.toBeNull();
      expect(container.querySelector(tag).className).toBe(className);
    });
  });

  test("Then it should return a form inside the 'full-screen' div", () => {
    const formClass = "form";
    expect(container.getElementsByClassName(formClass)).not.toBeNull();
  });
});
