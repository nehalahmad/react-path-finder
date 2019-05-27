import React from 'react';
import ButtonContainer from './../components/form/components/buttonContainer';
import {shallow} from 'enzyme';

describe("<ButtonContainer />", () => {
  it("button container renders with 'Submit' text", () => {
    const buttonContainerObj = shallow(
      <ButtonContainer submitBtnText="Submit" />
    );
    expect(buttonContainerObj).toMatchSnapshot();
  });

  it("button container renders with 'Re-submit' text", () => {
    const buttonContainerObj = shallow(
      <ButtonContainer submitBtnText="Re-submit" />
    );
    expect(buttonContainerObj).toMatchSnapshot();
  });
});