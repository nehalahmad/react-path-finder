import React from "react";
import ButtonContainer from "./buttonContainer";
import { shallow } from "enzyme";
import { SUBMIT_TEXT, RESUBMIT_TEXT, RESET_TEXT } from "../../../config/appConstants";

describe("<ButtonContainer />", () => {
  it("submit button renders", () => {
    const buttonContainerObj = shallow(
      <ButtonContainer submitBtnText={SUBMIT_TEXT} />
    );
    expect(buttonContainerObj).toMatchSnapshot();

    let mockCallBack = jest.fn();

    const btnSubmit = buttonContainerObj.find("[type='submit']");
    if (btnSubmit) {
      expect(btnSubmit.text()).toEqual(SUBMIT_TEXT);
      btnSubmit.simulate("click");
      expect(mockCallBack.mock.calls.length).toEqual(0);
    }

    const btnReset = buttonContainerObj.find("[type='reset']");
    if (btnReset) {
      expect(btnSubmit.text()).toEqual(RESET_TEXT);
      btnReset.simulate("click");
      expect(mockCallBack.mock.calls.length).toEqual(0);
    }
  });

  it("submit button renders", () => {
    const buttonContainerObj = shallow(
      <ButtonContainer submitBtnText={RESUBMIT_TEXT} />
    );
    expect(buttonContainerObj).toMatchSnapshot();
    const btnSubmit = buttonContainerObj.find("[type='submit']");
    if (btnSubmit) {
      expect(btnSubmit.text()).toEqual(RESUBMIT_TEXT);

      let mockCallBack = jest.fn();
      btnSubmit.simulate("click");
      expect(mockCallBack.mock.calls.length).toEqual(0);
    }
  });
});
