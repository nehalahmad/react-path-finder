import React from 'react';
import ToastMessage from './../components/toastMessage';
import {shallow} from 'enzyme';

describe("<ToastMessage />", () => {
  it("Render toast with a message", () => {
    const toastMessageObj = shallow(
      <ToastMessage errorMessage="Oops! something went wrong!" />
    );
    expect(toastMessageObj).toMatchSnapshot();
  });

  it("Render toast without a message", () => {
    const toastMessageObj = shallow(
      <ToastMessage />
    );
    expect(toastMessageObj).toMatchSnapshot();
  });

  it("it'll close the toast message", () => {
    const setErrorMessageHandler = jest.fn();
    const errorMessage = "Oops! something went wrong!";

    const toastMessageObj = shallow(
      <ToastMessage errorMessage={errorMessage} setErrorMessageHandler={setErrorMessageHandler} />
    );
    expect(toastMessageObj).toMatchSnapshot();

    let crossBtn = toastMessageObj.find('button.close');
    expect(crossBtn.length).toEqual(1);

    crossBtn.simulate("click");
    expect(setErrorMessageHandler.mock.calls.length).toEqual(1);
  });
});