// PathFinder/LocationForm.jsx
import React, { Component } from "react";
import { Form, Col } from "react-bootstrap";

import LocationInput from "./LocationInput";
import PathDetail from "./PathDetail";
import ButtonContainer from "./ButtonContainer";

import { LOCATION } from "../config/AppConstants";

// css
import "./LocationForm.css";

/**
 * @description: Form container, creating the locations input form
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
          onSubmit={this.handleOnSubmit}
          onReset={this.handleOnReset}
          id="mapForm"
        >
          <fieldset>
            <legend>Location input form</legend>
            <LocationInput
              ref="startLoc"
              autoFocus
              setErrorMessage={setErrorMessage}
              resetDirDetailMessage={this.resetDirDetailMessage}
            />
            <LocationInput
              title={LOCATION.TWO.TITLE}
              ref="dropOffLoc"
              placeholder={LOCATION.TWO.PLACEHOLDER}
              id="dropOffPoint"
              setErrorMessage={setErrorMessage}
              resetDirDetailMessage={this.resetDirDetailMessage}
            />
            <PathDetail direction={direction} message={message} />
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
  handleOnSubmit = e => {
    e.preventDefault();

    this.props.handleOnSubmit({
      from: this.refs.startLoc.getValue(),
      to: this.refs.dropOffLoc.getValue()
    });
  };

  /**
   * @name: Form on reset handler
   * @description: Will reset form inputs and some state as well
   */
  handleOnReset = () => {
    this.refs.startLoc.setValue("");
    this.refs.dropOffLoc.setValue("");
    this.props.resetHandler();
  };

  /**
   * @description: to remove non-reachable location message from from if both the location inputs went blank
   */
  resetDirDetailMessage = () => {
    if (
      !document.getElementById("startLoc").value ||
      !document.getElementById("dropOffPoint").value
    ) {
      this.props.resetHandler();
    }
  };
}
