import React from 'react';
import {shallow} from 'enzyme';
import MapTextBox from '../src/components/inputbox';

test("Form Button Renders", () => {
    const FormButton = shallow(
        <MapTextBox title="Starting a location" ref="startLoc" />
    );
    expect(FormButton.find("label").innerHTML).toEqual("Starting a location");
});