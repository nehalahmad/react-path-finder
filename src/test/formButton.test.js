import React from 'react';
import MapButton from '../components/formButton';
import { shallow } from 'enzyme';

describe("<MapButton />", () => {
  it("submit button renders", () => {
      const SubmitButtonObj = shallow(<MapButton buttonType="submit" buttonLabel="Submit" isPrimary />);
      expect(SubmitButtonObj).toMatchSnapshot();
      expect(SubmitButtonObj.text()).toEqual("Submit");

      let mockCallBack = jest.fn();
      SubmitButtonObj.simulate("click");
      expect(mockCallBack.mock.calls.length).toEqual(0);
  });

  it("reset button renders", () => {
    const ResetButtonObj = shallow(<MapButton buttonType="reset" buttonLabel="Reset" />);
    expect(ResetButtonObj).toMatchSnapshot();
    expect(ResetButtonObj.text()).toEqual("Reset");

    let mockCallBack = jest.fn();
    ResetButtonObj.simulate("click");
    expect(mockCallBack.mock.calls.length).toEqual(0);
  });
});