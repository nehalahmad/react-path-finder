import React, { Component } from "react";

import MapTextBox from "../inputbox";
import DirectionDetail from "./directionDetail";
import ButtonContainer from "./components/buttonContainer";

/**
 * @description: Form container all the input fields
 */
export default class DirectionForm extends Component {
  render() {
    const { direction, message, submitBtnText, isLoader } = this.props;

    return (
      <div className="col-sm-3">
        <form
          name="locationForm"
          onSubmit={this._onFormSubmit}
          onReset={this._onFormReset}
          id="mapForm"
        >
          <fieldset>
            <legend>Location input form</legend>
            <MapTextBox ref="startLoc" id="startLoc" autoFocus />
            <MapTextBox
              title="Drop-off point"
              ref="dropOffLoc"
              placeholder="enter drop-off point"
              id="dropOffPoint"
            />
            <DirectionDetail direction={direction} message={message} />
            <ButtonContainer
              submitBtnText={submitBtnText}
              isLoader={isLoader}
            />
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
      from: this.refs.startLoc._getValue(),
      to: this.refs.dropOffLoc._getValue()
    });
  };

  /**
   * @name: Form on reset handler
   * @description: Will reset form inputs and some state as well
   */
  _onFormReset = () => {
    this.refs.startLoc._setValue("");
    this.refs.dropOffLoc._setValue("");
    this.props.onReset();
  };
}
