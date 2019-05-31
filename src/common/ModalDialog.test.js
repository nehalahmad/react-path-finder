import React from "react";
import ModalDialog from "./ModalDialog";
import { shallow } from "enzyme";

describe("<ModalDialog />", () => {
  let setErrorMessageHandler;
  let errorMessage = "";
  beforeEach(() => {
    setErrorMessageHandler = jest.fn();
    errorMessage = "Oops! something went wrong!";
  });

  it("Render modal with a message", () => {
    const modalObj = shallow(
      <ModalDialog
        errorMessage="Oops! something went wrong!"
        setErrorMessageHandler={setErrorMessageHandler}
      />
    );
    expect(modalObj).toMatchSnapshot();
  });

  it("Render modal without a message", () => {
    errorMessage = "";
    const modalObj = shallow(
      <ModalDialog setErrorMessageHandler={setErrorMessageHandler} />
    );
    expect(modalObj).toMatchSnapshot();
  });

  it("it'll close the modal message", () => {
    const modalObj = shallow(
      <ModalDialog
        errorMessage={errorMessage}
        setErrorMessageHandler={setErrorMessageHandler}
      />
    );
    expect(modalObj).toMatchSnapshot();
  });
});
