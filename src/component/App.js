import React, { Component } from 'react';

import MapForm from "./form";
import Loader from "./loader/loader";
import Map from "./map";

import * as API from "../service/api";
import { IN_PROGRESS, NumberOfAttempts, SUCCESS, FAIL } from "./../config/apiConstant";
import * as utils from './../service/utils';

export default class App extends Component {
  state = { isLoader: false, direction: null, token: null };

  render() {
    return (
      <div className="row">
          <MapForm onSubmit={this._formSubmit} onReset={this._resetApp} direction={this.state.direction}
              submitBtnText={this.state.direction && this.state.token ? "Re-submit" : "Submit"} />
          <Map directions={this.state.direction} />
          <Loader isLoading={this.state.isLoader} />
      </div>
    );
  }
  
  _formSubmit = async formData => {
    this.setState({ isLoader: true });

    try {
      var token = await API.submitDirection(formData);
      this.setState({token}, this._getDirection);

    } catch(error) {
      alert(error.message);

    } finally {
      this.setState({ isLoader: false });
    }
  }
  
  _getDirection = async () => {
    this.setState({ isLoader: true });

    try {
      var direction = await API.getDirection(this.state.token);

      if (direction) {
        this._handleDirectionResponse(direction);
      } else {
        throw new Error("Direction couldn't found!");
      }
    } catch(error) {
      alert(error.message);
    } finally {
      this.setState({ isLoader: false });
    }
  }
  
  _resetApp = () => {
    this.setState({ direction: null, token: null });
  }

  _handleDirectionResponse = direction => {
      switch(direction.data.status) {
          case SUCCESS:
          case FAIL:
              this.setState({ direction: direction.data });
              break;
          case IN_PROGRESS:
              let counterValue = utils.countFn();
              if (counterValue <= NumberOfAttempts) {
                  this._getDirection();  // get data in case of any error
              }
              break;
          default:
              throw new Error(direction.data.status);
      }
  };
}