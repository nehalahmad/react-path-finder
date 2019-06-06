// PathFinder/LocationInput.jsx
import React, { Component } from "react";
import { Form, InputGroup } from "react-bootstrap";
import PropTypes from "prop-types";

import maps from "../services/GoogleMap";

import { LOCATION } from "../config/AppConstants";

/**
 * @name: InputBox
 * @description: Create Google Auto-Complete of places
 * @param: input location
 */
export default class LocationInput extends Component {
  state = { value: "" };

  /**
   * @description: life cycle method
   */
  componentDidMount() {
    this.autoComplete();
  }

  render() {
    const { title, placeholder, id, autoFocus } = this.props;
    const { value } = this.state;

    return (
      <Form.Group controlId={id}>
        <Form.Label>{title}</Form.Label>
        <InputGroup className="mb-3 map-input">
          <Form.Control
            type="text"
            ref="formInput"
            value={value}
            required
            onChange={e => this.setState({ value: e.target.value })}
            placeholder={placeholder}
            autoFocus={autoFocus}
            tabIndex={autoFocus ? 1 : 2}
          />
          {value && (
            <InputGroup.Append>
              <InputGroup.Text onClick={this.resetFieldHandler}>
                X
              </InputGroup.Text>
            </InputGroup.Append>
          )}
        </InputGroup>
      </Form.Group>
    );
  }

  /**
   * @description: set input value
   */
  setValue = value => {
    this.setState({ value });
  };

  /**
   * @description: get input value
   */
  getValue = () => {
    this.setValue(this.refs.formInput.value);
    return this.refs.formInput.value;
  };

  /**
   * @description: Autucomplete input fields based upon input location
   */
  autoComplete = async () => {
    try {
      const maps = await this.props.maps();
      new maps.places.Autocomplete(this.refs.formInput);
    } catch (error) {
      this.props.setErrorMessage(error.message);
    }
  };

  /**
   * @description: if location input went blank, reset the form then
   */
  resetFieldHandler = () => {
    this.setState({ value: "" });
    this.refs.formInput.focus();
    this.props.resetDirDetailMessage();
  };
}

// validate the prop types
LocationInput.propTypes = {
  title: PropTypes.string,
  placeholder: PropTypes.string,
  autoFocus: PropTypes.bool,
  setErrorMessage: PropTypes.func.isRequired,
  resetDirDetailMessage: PropTypes.func.isRequired
};

LocationInput.defaultProps = {
  maps,
  title: LOCATION.ONE.TITLE,
  placeholder: LOCATION.ONE.PLACEHOLDER,
  autoFocus: false,
  id: "startLoc"
};
