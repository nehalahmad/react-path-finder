import * as Utils from "./Utils";

describe("Util", () => {
  it("return correct result", () => {
    const counter = Utils.countFn();
    expect(counter).toEqual(1);
  });
});
