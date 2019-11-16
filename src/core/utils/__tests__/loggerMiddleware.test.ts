import createLoggerMiddleware from "../loggerMiddleware";

it("should create logger middleware", () => {
  const loggerMiddleware = createLoggerMiddleware();
  expect(loggerMiddleware).toBeInstanceOf(Function);
});
