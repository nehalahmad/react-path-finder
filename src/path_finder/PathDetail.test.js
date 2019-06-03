import React from "react";
import { shallow } from "enzyme";

import PathDetail from "./PathDetail";

describe("<PathDetail />", () => {
  it("direction detail is rendered", () => {
    let direction = {
      total_distance: 1000,
      total_time: 500
    };

    const PathDetailComp = shallow(
      <PathDetail direction={direction} />
    );
    expect(PathDetailComp).toMatchSnapshot();
  });

  it("direction detail is rendered", () => {
    const PathDetailComp = shallow(
      <PathDetail message="This location is not accessible by Car" />
    );
    expect(PathDetailComp).toMatchSnapshot();
  });
});
