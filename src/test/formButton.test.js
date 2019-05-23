import React from 'react';
import MapButton from '../components/formButton';
import { shallow } from 'enzyme';

describe("<MapButton />", () => {
  it("submit button renders", () => {
      const SubmitButtonObj = shallow(<MapButton buttonType="submit" buttonLabel="Submit" isPrimary />);
      expect(SubmitButtonObj).toMatchSnapshot();
      expect(SubmitButtonObj.text()).toEqual("Submit");

      SubmitButtonObj.simulate("click");
  });

  it("reset button renders", () => {
    const ResetButtonObj = shallow(<MapButton buttonType="reset" buttonLabel="Reset" />);
    expect(ResetButtonObj).toMatchSnapshot();
    expect(ResetButtonObj.text()).toEqual("Reset");

    ResetButtonObj.simulate("click");
  });
});