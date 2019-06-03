import React from "react";
import ButtonContainer from "./ButtonContainer";
import { shallow } from "enzyme";
import {
  SUBMIT_TEXT,
  RESUBMIT_TEXT,
  RESET_TEXT
} from "../config/AppConstants";

describe("<ButtonContainer />", () => {
  it("submit button renders", () => {
    const buttonContainerObj = shallow(
      <ButtonContainer submitBtnText={SUBMIT_TEXT} />
    );
    expect(buttonContainerObj).toMatchSnapshot();

    let mockCallBack = jest.fn(); // mock function

    const btnSubmit = buttonContainerObj.find("[type='submit']"); // get submit button
    if (btnSubmit) {
      expect(btnSubmit.text()).toEqual(SUBMIT_TEXT);
      btnSubmit.simulate("click");  // simulate click
      expect(mockCallBack.mock.calls.length).toEqual(0);  // it should be 0
    }

    const btnReset = buttonContainerObj.find("[type='reset']"); // get reset button
    if (btnReset) {
      expect(btnReset.text()).toEqual(RESET_TEXT);
      btnReset.simulate("click");
      expect(mockCallBack.mock.calls.length).toEqual(0);
    }
  });

  it("resubmit button renders", () => {
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
