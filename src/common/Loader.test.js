import React from "react";
import { shallow } from "enzyme";

import Loader from "./Loader";

describe("<Loader />", () => {
  it("running", () => {
    const LoaderComp = shallow(<Loader isLoading />);
    expect(LoaderComp).toMatchSnapshot();
  });

  it("not running", () => {
    const LoaderComp = shallow(<Loader isLoading={false} />);
    expect(LoaderComp).toMatchSnapshot();
  });
});
