import React from "react";
import { shallow } from "enzyme";

import ErrorBoundary from "./ErrorBoundary";

describe("<ErrorBoundary />", () => {
  it("renders", () => {
    const ErrorChildObj = () => {
      throw new Error("Something went wrong!");
    };

    const ErrorBoundaryObj = shallow(
      <ErrorBoundary>
        <ErrorChildObj />
      </ErrorBoundary>
    );
    expect(ErrorBoundaryObj).toMatchSnapshot();
  });
});
