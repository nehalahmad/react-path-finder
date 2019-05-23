import React, { Component } from 'react';

import MapForm from "./form";
import Loader from "./loader";
import Map from "./map";

import * as API from "../services/api";
import { IN_PROGRESS, NUMBER_ATTEMPTS, SUCCESS, FAIL } from "../config/apiConstant";
import * as utils from '../services/utils';

export default class App extends Component {
  state = { isLoader: false, direction: null, token: null, message: '' };

  render() {
    return (
      <div className="row">
          <MapForm onSubmit={this._formSubmit} onReset={this._resetApp} direction={this.state.direction}
              submitBtnText={this.state.direction && this.state.token ? "Re-submit" : "Submit"} message={this.state.message} />
          <Map directions={this.state.direction} />
          <Loader isLoading={this.state.isLoader} />
      </div>
    );
  }
  
  _formSubmit = async formData => {
    try {
      this.setState({ isLoader: true });

      var token = await API.submitDirection(formData);
      this.setState({token}, this._getDirection);

    } catch(error) {
      alert(error.message);
      this._resetApp();
    } finally {
      this.setState({ isLoader: false });
    }
  }
  
  _getDirection = async () => {
    try {
      this.setState({ isLoader: true });

      var direction = await API.getDirection(this.state.token);
      if (direction) {
        this._handleDirectionResponse(direction);
      } else {
        throw new Error("Direction couldn't found!");
      }
    } catch(error) {
      alert(error.message);
      this._resetApp();
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
              this.setState({ direction: direction.data, message: '' });
              break;
          case IN_PROGRESS:
              let counterValue = utils.countFn();
              if (counterValue <= NUMBER_ATTEMPTS) {
                  this._getDirection();  // get data in case of any error
              }
              break;
          case FAIL:
              this._resetApp();
              this.setState({message: direction.data.error});
              break;
          default:
              this._resetApp();
              throw new Error("Oops, something went wrong!");
      }
  };
}