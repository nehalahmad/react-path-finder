import React, { Component } from "react";

import MapForm from "./form";
import Loader from "./loader";
import Map from "./map";

import * as API from "../services/api";
import {
  IN_PROGRESS,
  NUMBER_ATTEMPTS,
  SUCCESS,
  FAIL
} from "../config/apiConstant";
import * as utils from "../services/utils";
import ToastMessage from "./toastMessage";

/**
 * @description: Main file to display overall map page UI
 */
export default class App extends Component {
  state = {
    isLoader: false,
    direction: null,
    token: null,
    message: "",
    errorMessage: ""
  };

  render() {
    return (
      <div className="row">
        <MapForm
          onSubmit={this._formSubmit}
          onReset={this._resetApp}
          direction={this.state.direction}
          submitBtnText={this.state.direction ? "Re-submit" : "Submit"}
          message={this.state.message}
        />
        <Map
          directions={this.state.direction}
          setErrorMessage={this._setErrorMessageHandler}
        />
        <Loader isLoading={this.state.isLoader} />
        {this.state.errorMessage && (
          <ToastMessage
            errorMessage={this.state.errorMessage}
            setErrorMessageHandler={this._setErrorMessageHandler}
          />
        )}
      </div>
    );
  }

  componentDidUpdate(prevProps, nextState, snapshot) {
    if (nextState.errorMessage) {
      this.timerID = setTimeout(() => {
        this._setErrorMessageHandler("");
      }, 2000);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timerID);
  }

  /**
   * @description: Form submit handler
   */
  _formSubmit = async formData => {
    try {
      this.setState({ isLoader: true });

      var token = await API.submitDirection(formData);
      this.setState({ token }, this._getDirection);
    } catch (error) {
      this._resetApp({ errorMessage: error.message });
    } finally {
      this.setState({ isLoader: false });
    }
  };

  /**
   * @description: Make API call to get direction
   * @param: token
   */
  _getDirection = async () => {
    try {
      this.setState({ isLoader: true });

      var direction = await API.getDirection(this.state.token);
      if (direction) {
        this._handleDirectionResponse(direction);
      } else {
        throw new Error("Direction couldn't found!");
      }
    } catch (error) {
      this._resetApp({ errorMessage: error.message });
    } finally {
      this.setState({ isLoader: false });
    }
  };

  /**
   * @description: Message handler to set error message
   */
  _setErrorMessageHandler = errorMessage => {
    this.setState({ errorMessage });
  };

  /**
   * @description: Reset app state
   */
  _resetApp = (stateObj = {}) => {
    this.setState({ ...stateObj, direction: null, token: null });
  };

  /**
   * @description: Handle directions of Map
   */
  _handleDirectionResponse = direction => {
    switch (direction.data.status) {
      case SUCCESS:
        this.setState({ direction: direction.data, message: "" });
        break;
      case IN_PROGRESS:
        let counterValue = utils.countFn();
        if (counterValue <= NUMBER_ATTEMPTS) {
          this._getDirection(); // get data in case of any error
        }
        break;
      case FAIL:
        this._resetApp({ message: direction.data.error });
        break;
      default:
        this._resetApp();
        throw new Error("Oops, something went wrong!");
    }
  };  
}
