import React from "react";
import FormButton from "./formButton";
import { shallow } from "enzyme";

describe("<FormButton />", () => {
  it("submit button renders", () => {
    const SubmitButtonObj = shallow(
      <FormButton buttonType="submit" buttonLabel="Submit" isPrimary />
    );
    expect(SubmitButtonObj).toMatchSnapshot();
    expect(SubmitButtonObj.text()).toEqual("Submit");

    let mockCallBack = jest.fn();
    SubmitButtonObj.simulate("click");
    expect(mockCallBack.mock.calls.length).toEqual(0);
  });

  it("reset button renders", () => {
    const ResetButtonObj = shallow(
      <FormButton buttonType="reset" buttonLabel="Reset" />
    );
    expect(ResetButtonObj).toMatchSnapshot();
    expect(ResetButtonObj.text()).toEqual("Reset");

    let mockCallBack = jest.fn();
    ResetButtonObj.simulate("click");
    expect(mockCallBack.mock.calls.length).toEqual(0);
  });
});
