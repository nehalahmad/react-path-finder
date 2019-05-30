import React from "react";
import ErrorBoundary from "./errorBoundary";
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
