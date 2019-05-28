import React, { Component } from "react";
import maps from "../../services/googleMap";

/**
 * @name: InputBox
 * @description: Create Google Auto-Complete of places
 * @param: take input location
 */
export default class GoogleMapTextBox extends Component {
  state = { value: "" };

  /**
   * @description: life cycle method
   */
  componentDidMount() {
    this._autoComplete();
  }

  render() {
    const { title = "Starting location" } = this.props;

    return (
      <div className="form-group">
        <label>{title}</label>
        <input
          type="text"
          ref="formInput"
          value={this.state.value}
          className="form-control"
          required
          onChange={e => this.setState({ value: e.target.value })}
        />
        {this.state.value && (
          <span
            className="col-lg-1 cross-btn"
            onClick={() => {
              this.setState({ value: "" });
            }}
          >
            X
          </span>
        )}
      </div>
    );
  }

  /**
   * @description: set input value
   */
  _setValue = value => {
    this.setState({ value });
  };

  /**
   * @description: get input value
   */
  _getValue = () => {
    this._setValue(this.refs.formInput.value);
    return this.refs.formInput.value;
  };

  /**
   * @description: Autucomplete input fields based upon input location
   */
  _autoComplete = async () => {
    try {
      const maps = await this.props.maps();
      new maps.places.Autocomplete(this.refs.formInput);
    } catch (error) {
      console.log(error.message);
    }
  };
}

GoogleMapTextBox.defaultProps = {
  maps
};
