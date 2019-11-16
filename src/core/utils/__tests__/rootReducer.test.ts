import rootReducer from "../rootReducer";

it("should return a root reducer function", () => {
  expect(rootReducer).toBeInstanceOf(Function);
  expect(rootReducer.length).toBe(2);
});
