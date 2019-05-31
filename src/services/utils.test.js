import * as Utils from "./Utils";

describe("Testing util function", () => {
  it("call correctly", () => {
    const counter = Utils.countFn();
    expect(counter).toEqual(1);
  });
});
