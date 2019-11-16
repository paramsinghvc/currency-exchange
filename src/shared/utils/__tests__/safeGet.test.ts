import safeGet from "../safeGet";

describe("Should retrieve the deep nested property", () => {
  it("should handle array index", () => {
    expect(safeGet([{ b: { c: 3 } }], "0.b.c", "Hola")).toEqual(3);
  });
  it("should handle array index in object", () => {
    expect(safeGet({ a: [{ b: { c: 3 } }] }, "a.0.b.c", "Hola")).toEqual(3);
    expect(safeGet({ a: [{ b: { c: 3 } }] }, "a[0]b.c", "Hola")).toEqual(3);
    expect(safeGet({ a: [{ b: { c: 3 } }] }, "a[0].b.c", "Hola")).toEqual(3);
    expect(safeGet({ a: [{ b: { c: 3 } }] }, "a.[0].b.c", "Hola")).toEqual(3);
    expect(safeGet({ a: [{ b: { c: 3 } }] }, "a.0.b", "Hola")).toEqual({
      c: 3
    });
  });
  it("should handle path as an array", () => {
    expect(safeGet({ a: [{ b: { c: 3 } }] }, ["a", 0, "b", "c"], "Hola")).toEqual(3);
    expect(safeGet({ a: [{ b: { c: 3 } }] }, ["a", 0, "b"], "Hola")).toEqual({
      c: 3
    });
  });
  it("should handle undefined gracefully", () => {
    expect(safeGet({ a: [{ b: { c: 3 } }] }, "a.1.b.c", "Hola")).toEqual("Hola");
  });
});
