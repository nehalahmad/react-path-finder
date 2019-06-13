// PathFinder/LocationInput.jsx
import React, { Component, createRef } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';

import maps from '../services/GoogleMap';

import { LOCATION } from '../config/AppConstants';

/**
 * @name: InputBox
 * @description: Create Google Auto-Complete of places
 * @param: input location
 */
export default class LocationInput extends Component {
  constructor(props) {
    super(props);

    this.state = { value: '' };

    this.inputRef = createRef();
  }

  /**
   * @description: life cycle method
   */
  componentDidMount() {
    this.autoComplete();
  }

  /**
   * @description: set input value
   */
  set value(value) {
    this.setState({ value });
  }

  /**
   * @description: get input value
   */
  get value() {
    this.value = this.inputRef.value;
    return this.inputRef.value;
  }

  /**
   * @description: Autucomplete input fields based upon input location
   */
  autoComplete = async () => {
    try {
      const maps = await this.props.maps();
      new maps.places.Autocomplete(this.inputRef);
    } catch (error) {
      const { setErrorMessage } = this.props;
      setErrorMessage(error.message);
    }
  };

  /**
   * @description: if location input went blank, reset the form then
   */
  resetFieldHandler = () => {
    const { resetDirDetailMessage } = this.props;

    this.setState({ value: '' });
    this.inputRef.focus();
    resetDirDetailMessage();
  };

  render() {
    const { title, placeholder, id, autoFocus } = this.props;
    const { value } = this.state;

    return (
      <Form.Group controlId={id}>
        <Form.Label>{title}</Form.Label>
        <InputGroup className="mb-3 map-input">
          <Form.Control
            type="text"
            ref={ref => (this.inputRef = ref)}
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
}

// validate the prop types
LocationInput.propTypes = {
  setErrorMessage: PropTypes.func.isRequired,
  resetDirDetailMessage: PropTypes.func.isRequired,
  title: PropTypes.string,
  placeholder: PropTypes.string,
  autoFocus: PropTypes.bool,
  id: PropTypes.string
};

LocationInput.defaultProps = {
  maps,
  title: LOCATION.ONE.TITLE,
  placeholder: LOCATION.ONE.PLACEHOLDER,
  autoFocus: false,
  id: 'startLoc'
};
