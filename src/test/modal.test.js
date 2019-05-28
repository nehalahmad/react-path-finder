import React from "react";
import Modal from "./../components/modal";
import { shallow } from "enzyme";

describe("<Modal />", () => {
  let setErrorMessageHandler;
  let errorMessage = "";
  beforeEach(() => {
    setErrorMessageHandler = jest.fn();
    errorMessage = "Oops! something went wrong!";
  });

  it("Render modal with a message", () => {
    const modalObj = shallow(
      <Modal
        errorMessage="Oops! something went wrong!"
        setErrorMessageHandler={setErrorMessageHandler}
      />
    );
    expect(modalObj).toMatchSnapshot();
  });

  it("Render modal without a message", () => {
    errorMessage = "";
    const modalObj = shallow(
      <Modal setErrorMessageHandler={setErrorMessageHandler} />
    );
    expect(modalObj).toMatchSnapshot();
  });

  it("it'll close the modal message", () => {
    const modalObj = shallow(
      <Modal
        errorMessage={errorMessage}
        setErrorMessageHandler={setErrorMessageHandler}
      />
    );
    expect(modalObj).toMatchSnapshot();

    let crossBtn = modalObj.find("button.close");
    expect(crossBtn.length).toEqual(1);

    crossBtn.simulate("click");
    expect(setErrorMessageHandler.mock.calls.length).toEqual(1);
  });
});
