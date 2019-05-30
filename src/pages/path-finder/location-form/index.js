import React, { Component } from "react";
import { Form, Col } from "react-bootstrap";

import LocationInput from "./locationInput";
import DirectionDetail from "./directionDetail";
import ButtonContainer from "./buttonContainer";
import { LOCATION } from "../../../config/appConstants";

import "./locationForm.css";

/**
 * @description: Form container all the input fields
 */
export default class LocationForm extends Component {
  render() {
    const {
      direction,
      message,
      submitBtnText,
      isLoader,
      setErrorMessage
    } = this.props;

    return (
      <Col sm="4" lg="3" as="aside">
        <Form
          name="locationForm"
          onSubmit={this._submitHandler}
          onReset={this._resetHandler}
          id="mapForm"
        >
          <fieldset>
            <legend>Location input form</legend>
            <LocationInput
              ref="startLoc"
              id="startLoc"
              autoFocus
              setErrorMessage={setErrorMessage}
              resetDirDetailMessage={this._resetDirDetailMessage}
            />
            <LocationInput
              title={LOCATION.TWO.TITLE}
              ref="dropOffLoc"
              placeholder={LOCATION.TWO.PLACEHOLDER}
              id="dropOffPoint"
              setErrorMessage={setErrorMessage}
              resetDirDetailMessage={this._resetDirDetailMessage}
            />
            <DirectionDetail direction={direction} message={message} />
            <ButtonContainer
              submitBtnText={submitBtnText}
              isLoader={isLoader}
            />
          </fieldset>
        </Form>
      </Col>
    );
  }

  /**
   * @name: Form submit handler
   * @description: on submit will set from location and to location
   */
  _submitHandler = e => {
    e.preventDefault();

    this.props.submitHandler({
      from: this.refs.startLoc._getValue(),
      to: this.refs.dropOffLoc._getValue()
    });
  };

  /**
   * @name: Form on reset handler
   * @description: Will reset form inputs and some state as well
   */
  _resetHandler = () => {
    this.refs.startLoc._setValue("");
    this.refs.dropOffLoc._setValue("");
    this.props.resetHandler();
  };

  /**
   * @description: to remove non-reachable location message from from if both the location inputs are blank
   */
  _resetDirDetailMessage = () => {
    if (
      !document.getElementById("startLoc").value ||
      !document.getElementById("dropOffPoint").value
    ) {
      this.props.resetDirDetailMessage();
    }
  };
}
