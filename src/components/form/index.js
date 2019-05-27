import React, { Component } from "react";

import MapTextBox from "../inputbox";
import DirectionDetail from "./directionDetail";
import ButtonContainer from "./components/buttonContainer";

/**
 * @description: Form container all the input fields
 */
export default class DirectionForm extends Component {
  render() {
    const { direction, message, submitBtnText } = this.props;

    return (
      <div className="col-sm-3">
        <form
          name="locationForm"
          onSubmit={this._onFormSubmit}
          onReset={this._onFormReset}
          id="mapForm"
        >
          <fieldset>
            <legend>Map Form</legend>
            <MapTextBox title="Starting a location" ref="startLoc" />
            <MapTextBox title="Drop-off point" ref="dropOffLoc" />
            <DirectionDetail direction={direction} message={message} />
            <ButtonContainer submitBtnText={submitBtnText} />
          </fieldset>
        </form>
      </div>
    );
  }

  /**
   * @name: Form submit handler
   * @description: on submit will set from location and to location
   */
  _onFormSubmit = e => {
    e.preventDefault();
    this.props.onSubmit({
      from: this.refs.startLoc.getValue(),
      to: this.refs.dropOffLoc.getValue()
    });
  };

  /**
   * @name: Form on reset handler
   * @description: Will reset form inputs and some state as well
   */
  _onFormReset = () => {
    this.refs.startLoc.setValue("");
    this.refs.dropOffLoc.setValue("");
    this.props.onReset();
  };
}
