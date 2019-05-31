import React from "react";
import { shallow } from "enzyme";

import DirectionDetail from "./DirectionDetail";

describe("<DirectionDetail />", () => {
  it("direction detail is rendered", () => {
    let direction = {
      total_distance: 1000,
      total_time: 500
    };

    const DirectionDetailComp = shallow(
      <DirectionDetail direction={direction} />
    );
    expect(DirectionDetailComp).toMatchSnapshot();
  });

  it("direction detail is rendered", () => {
    const DirectionDetailComp = shallow(
      <DirectionDetail message="This location is not accessible by Car" />
    );
    expect(DirectionDetailComp).toMatchSnapshot();
  });
});
