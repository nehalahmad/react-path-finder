import * as Utils from "./utils";

describe("Testing util function", () => {
  it("call correctly", () => {
    const counter = Utils.countFn();
    expect(counter).toEqual(1);
  });
});
