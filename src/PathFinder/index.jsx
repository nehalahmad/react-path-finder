// PathFinder/index.js
import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";

// import custom components
import { ErrorBoundary, Loader, ModalDialog } from "./../common";
import LocationForm from "./LocationForm";
import PathMap from "./PathMap";

// import api and utils
import * as API from "./PathFinderAPI";
import * as utils from "../services/Utils";

// import constants
import {
  IN_PROGRESS,
  NUMBER_ATTEMPTS,
  SUCCESS,
  FAIL
} from "../config/ApiConstants";
import {
  DIRECTION_NOT_FOUND,
  SOMETHING_WRONG,
  RESUBMIT_TEXT,
  SUBMIT_TEXT
} from "../config/AppConstants";

// css file
import "./../assets/css/App.css";

/**
 * @description: Main container file to display entire Map Page
 */
export default class PathFinder extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      isLoader: false,
      direction: null,
      token: null,
      message: "",
      errorMessage: ""
    };
  
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }
  

  render() {
    const { token, message, isLoader, errorMessage, direction } = this.state;

    return (
      <Container fluid className="App">
        <Row>
          <LocationForm
            handleOnSubmit={this.handleOnSubmit}
            resetHandler={this.resetApp}
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
  async handleOnSubmit(formData) {
    try {
      this.setState({ isLoader: true });

      const token = await API.getToken(formData);
      this.setState({ token }, this.getDirection);
    } catch (error) {
      this.resetApp({ errorMessage: error.message, isLoader: false });
    }
  };

  /**
   * @description: Make API call to get direction
   * @param: token
   */
  getDirection = async () => {
    try {
      const direction = await API.getDirection(this.state.token);
      if (direction) {
        this.handleDirectionResponse(direction);
      } else {
        throw new Error(DIRECTION_NOT_FOUND);
      }
    } catch (error) {
      this.resetApp({ errorMessage: error.message, isLoader: false });
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
  resetApp = (stateObj = {}) => {
    this.setState({ direction: null, token: null, message: "", ...stateObj });
  };

  /**
   * @description: Handle final response in case of success, failure and in-progress
   */
  handleDirectionResponse = direction => {
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
          this.getDirection(); // try to fetch direction data if it fails due to any reason
        }
        break;
      case FAIL:
        this.resetApp({ message: direction.data.error, isLoader: false });
        break;
      default:
        this.resetApp({ isLoader: false });
        throw new Error(SOMETHING_WRONG);
    }
  };
}
