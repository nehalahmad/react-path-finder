import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";

// import custom components
import ErrorBoundary from "./../../common/ErrorBoundary";
import LocationForm from "./LocationForm";
import Loader from "../../common/Loader";
import PathMap from "./PathMap";
import ModalDialog from "../../common/ModalDialog";

// import api and utils
import * as API from "./PathFinderAPI";
import * as utils from "../../services/Utils";

// import constants
import {
  IN_PROGRESS,
  NUMBER_ATTEMPTS,
  SUCCESS,
  FAIL
} from "../../config/ApiConstants";
import {
  DIRECTION_NOT_FOUND,
  SOMETHING_WRONG,
  RESUBMIT_TEXT,
  SUBMIT_TEXT
} from "../../config/AppConstants";

// css file
import "./../../assets/css/App.css";

/**
 * @description: Main container file to display entire Map Page
 */
export default class PathFinder extends Component {
  state = {
    isLoader: false,
    direction: null,
    token: null,
    message: "",
    errorMessage: ""
  };

  render() {
    const { token, message, isLoader, errorMessage, direction } = this.state;

    return (
      <Container fluid className="App">
        <Row>
          <LocationForm
            submitHandler={this.submitHandler}
            resetHandler={this._resetApp}
            submitBtnText={
              !isLoader && (token || message) ? RESUBMIT_TEXT : SUBMIT_TEXT
            }
            setErrorMessage={this.setErrorMessage}
            {...this.state}
          />
          <ErrorBoundary>
            <PathMap
              directions={direction}
              setErrorMessage={this.setErrorMessage}
            />
          </ErrorBoundary>
          <Loader isLoading={isLoader} />
          <ModalDialog
            errorMessage={errorMessage}
            setErrorMessageHandler={this.setErrorMessage}
          />
        </Row>
      </Container>
    );
  }

  /**
   * @description: Form submit handler, to get token first and then call another function to get direction
   */
  submitHandler = async formData => {
    try {
      this.setState({ isLoader: true });

      const token = await API.submitDirection(formData);
      this.setState({ token }, this._getDirection);
    } catch (error) {
      this._resetApp({ errorMessage: error.message, isLoader: false });
    }
  };

  /**
   * @description: Make API call to get direction
   * @param: token
   */
  _getDirection = async () => {
    try {
      const direction = await API.getDirection(this.state.token);
      if (direction) {
        this._handleDirectionResponse(direction);
      } else {
        throw new Error(DIRECTION_NOT_FOUND);
      }
    } catch (error) {
      this._resetApp({ errorMessage: error.message, isLoader: false });
    }
  };

  /**
   * @description: Message handler to set error message
   */
  setErrorMessage = errorMessage => {
    this.setState({ errorMessage });
  };

  /**
   * @description: Reset app state
   */
  _resetApp = (stateObj = {}) => {
    this.setState({ direction: null, token: null, message: "", ...stateObj });
  };

  /**
   * @description: Handle final response in case of success, failure and in-progress
   */
  _handleDirectionResponse = direction => {
    switch (direction.data.status) {
      case SUCCESS:
        this.setState({
          direction: direction.data,
          isLoader: false,
          message: ""
        });
        break;
      case IN_PROGRESS:
        let triedAttempt = utils.countFn();
        if (triedAttempt <= NUMBER_ATTEMPTS) {
          this._getDirection(); // try to fetch direction data if it fails due to any reason
        }
        break;
      case FAIL:
        this._resetApp({ message: direction.data.error, isLoader: false });
        break;
      default:
        this._resetApp({ isLoader: false });
        throw new Error(SOMETHING_WRONG);
    }
  };
}
