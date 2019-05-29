import React, { Component } from "react";

import * as API from "../services/api";
import {
  IN_PROGRESS,
  NUMBER_ATTEMPTS,
  SUCCESS,
  FAIL
} from "../config/apiConstant";
import * as utils from "../services/utils";

import MapForm from "./form";
import Loader from "./loader";
import Map from "./map";
import Modal from "./modal";

import "./../assets/css/app.css";

/**
 * @description: main file to display overall map page UI
 */
export default class MainArea extends Component {
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
      <div className="App container-fluid">
        <div className="row">
          <MapForm
            onSubmit={this._formSubmit}
            onReset={this._resetApp}
            resetFormMessage={this._resetFormMessage}
            submitBtnText={(!isLoader && (token || message)) ? "Re-submit" : "Submit"}
            setErrorMessage={this._setErrorMessageHandler}
            {...this.state}
          />
          <Map
            directions={direction}
            setErrorMessage={this._setErrorMessageHandler}
          />
          <Loader isLoading={isLoader} />
          <Modal
            errorMessage={errorMessage}
            setErrorMessageHandler={this._setErrorMessageHandler}
          />
        </div>
      </div>
    );
  }

  /**
   * @description: life cycle method
   * @param {*} prevProps
   * @param {*} nextState
   * @param {*} snapshot
   */
  componentDidUpdate(prevProps, nextState, snapshot) {
    if (nextState.errorMessage) {
      this.timerID = setTimeout(() => {
        this._setErrorMessageHandler("");
      }, 1500);
    }
  }

  /**
   * @description: life cycle method
   */
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
      document.body.classList.add("modal-open");
      this._resetApp({ errorMessage: error.message, isLoader: false });
    }
  };

  /**
   * @description: Make API call to get direction
   * @param: token
   */
  _getDirection = async () => {
    try {
      var direction = await API.getDirection(this.state.token);
      if (direction) {
        this._handleDirectionResponse(direction);
      } else {
        throw new Error("Direction couldn't found!");
      }
    } catch (error) {
      document.body.classList.add("modal-open");
      this._resetApp({ errorMessage: error.message, isLoader: false });
    }
  };

  /**
   * @description: Message handler to set error message
   */
  _setErrorMessageHandler = errorMessage => {
    document.body.classList.remove("modal-open");
    this.setState({ errorMessage });
  };

  /**
   * @description: Reset app state
   */
  _resetApp = (stateObj = {}) => {
    this.setState({ direction: null, token: null, message: "", ...stateObj });
  };

  /**
   * @description: reset message in form
   */
  _resetFormMessage = () => {
    this.setState({ message: "" });
  };

  /**
   * @description: Handle directions of Map
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
        let counterValue = utils.countFn();
        if (counterValue <= NUMBER_ATTEMPTS) {
          this._getDirection(); // get data in case of any error
        }
        break;
      case FAIL:
        this._resetApp({ message: direction.data.error, isLoader: false });
        break;
      default:
        this._resetApp({ isLoader: false });
        throw new Error("Oops, something went wrong!");
    }
  };
}
