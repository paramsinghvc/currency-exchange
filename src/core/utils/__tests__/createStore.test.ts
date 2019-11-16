import createReduxStore from "../createStore";

it("should create the store", () => {
  expect(createReduxStore()).toBeDefined();
});
