import * as Utils from "./Utils";

describe("Util", () => {
  it("return correct result 1", () => {
    const counter = Utils.countFn.increment();
    expect(counter).toEqual(1);
  });

  it("return correct result 1", () => {
    const counter = Utils.countFn.decrement();
    expect(counter).toEqual(1);
  });

  it("return correct result 0", () => {
    const counter = Utils.countFn.reset();
    expect(counter).toEqual(0);
  });
});
