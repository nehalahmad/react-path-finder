import React from "react";
import { shallow } from "enzyme";

import Loader from "./Loader";

describe("<Loader />", () => {
  it("Loader renders", () => {
    const LoaderComp = shallow(<Loader isLoading />);
    expect(LoaderComp).toMatchSnapshot();
  });
});
