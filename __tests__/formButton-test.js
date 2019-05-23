import React from 'react';
import {shallow} from 'enzyme';
import FormButton from './../src/components/formButton';

test("Form Button Renders", () => {
    const FormButton = shallow(
        <FormButton buttonType="submit" buttonLabel="Submit" isPrimary />
    );
    expect(FormButton.type()).toEqual("submit");
});