// PathFinder/LocationForm.jsx
import React, { Component, createRef } from "react";
import PropTypes from "prop-types";
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
  constructor(props) {
    super(props);
    this.startLocRef = createRef();
    this.dropOffLocRef = createRef();

    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleOnReset = this.handleOnReset.bind(this);
    this.resetDirDetailMessage = this.resetDirDetailMessage.bind(this);
  }

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
              ref={ref => (this.startLocRef = ref)}
              autoFocus
              setErrorMessage={setErrorMessage}
              resetDirDetailMessage={this.resetDirDetailMessage}
            />
            <LocationInput
              title={LOCATION.TWO.TITLE}
              ref={ref => (this.dropOffLocRef = ref)}
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
  handleOnSubmit(e) {
    e.preventDefault();

    this.props.handleOnSubmit({
      orgin: this.startLocRef.value,
      destination: this.dropOffLocRef.value
    });
  }

  /**
   * @name: Form on reset handler
   * @description: Will reset form inputs and some state as well
   */
  handleOnReset() {
    this.startLocRef.value = "";
    this.dropOffLocRef.value = "";
    this.props.resetHandler();
  }

  /**
   * @description: to remove non-reachable location message from from if both the location inputs went blank
   */
  resetDirDetailMessage() {
    if (
      !document.getElementById("startLoc").value ||
      !document.getElementById("dropOffPoint").value
    ) {
      this.props.resetHandler();
    }
  }
}

LocationForm.propTypes = {
  handleOnSubmit: PropTypes.func.isRequired,
  resetHandler: PropTypes.func.isRequired,
  submitBtnText: PropTypes.string.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
  direction: PropTypes.object,
  message: PropTypes.string
};
