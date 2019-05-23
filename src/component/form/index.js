import React, { Component } from 'react';

import MapTextBox from "../inputbox/mapTextBox";
import DirectionDetail from "./directionDetail";
import ButtonContainer from './components/buttonContainer';

export default class DirectionForm extends Component {
  _onFormSubmit = e => {
    e.preventDefault();

    this.props.onSubmit({from: this.refs.startLoc.getValue(), to: this.refs.dropOffLoc.getValue()});
  }
  
  _onFormReset = () => {
    this.refs.startLoc.setValue("");
    this.refs.dropOffLoc.setValue("");
    this.props.onReset();
  }

  render() {
    let { direction, message } = this.props;

    return (
      <div className="col-sm-3">
        <form name="locationForm" onSubmit={this._onFormSubmit} onReset={this._onFormReset} id="mapForm">
          <fieldset>
            <legend>Map Form</legend>
            <MapTextBox title="Starting a location" ref="startLoc" />
            <MapTextBox title="Drop-off point" ref="dropOffLoc" />
            <DirectionDetail direction={direction} />
            {message && <p className="bg-danger">{message}</p>}
            <ButtonContainer />
          </fieldset>
        </form>
      </div>
    );
  }
}