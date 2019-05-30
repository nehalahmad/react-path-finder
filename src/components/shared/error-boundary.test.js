import React from "react";
import ErrorBoundary from "./error-boundary";
import { shallow } from "enzyme";

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
