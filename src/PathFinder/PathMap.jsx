// PathFinder/PathMap.jsx
import React, { Component } from "react";
import { Col } from "react-bootstrap";

import maps from "../services/GoogleMap";

import { ERROR_DIRECTION_SERVICE } from "../config/AppConstants";

// css
import "./PathMap.css";

/**
 * @name: Map
 * @description: Show default map and when inputs are provided show propper map
 */
class Map extends Component {
  map;
  maps;

  /**
   * @description: life cycle method
   */
  componentDidMount() {
    this.initMap();
  }

  render() {
    return (
      <Col sm="8" lg="9" as="main">
        <div ref="mapContainer" className="map-container" />
      </Col>
    );
  }

  /**
   * @description: initialize map
   */
  initMap = async () => {
    try {
      this.maps = await this.props.maps();

      this.map = new this.maps.Map(this.refs.mapContainer, {
        zoom: 10,
        center: { lat: 22.372081, lng: 114.107877 }
      });
    } catch (error) {
      this.props.setErrorMessage(error.message);
    }
  };

  /**
   * @description: create array of map object
   */
  preparePositionsFromPath = path => {
    return path.map(([lat, lng]) => new this.maps.LatLng(lat, lng));
  };

  /**
   * @description: show direction on map based upon input location values
   */
  showDirections = ({ path }) => {
    const directionsService = new this.maps.DirectionsService();
    const directionsRenderer = new this.maps.DirectionsRenderer();

    directionsRenderer.setMap(this.map);

    const positions = this.preparePositionsFromPath(path);
    const waypoints = positions
      .slice(1, positions.length - 1)
      .map(location => ({ location, stopover: false }));

    // request for the google map directions api
    const request = {
      origin: positions[0],
      destination: positions[positions.length - 1],
      waypoints,
      optimizeWaypoints: true,
      travelMode: this.maps.TravelMode.DRIVING
    };

    // get the route from directionService and then plot with the help of directionsRenderer
    directionsService.route(request, (response, status) => {
      if (status === this.maps.DirectionsStatus.OK) {
        directionsRenderer.setDirections(response);
      } else {
        this.props.setErrorMessage(ERROR_DIRECTION_SERVICE);
      }
    });
  };

  /**
   * @description: life cycle method
   * @param props
   * @param state
   * @param snapShot, this will be provided as a third parameter, if component continas method getSnapshotBeforeUpdate
   */
  componentDidUpdate(props, state, snapShot) {
    try {
      if (snapShot) {
        if (snapShot === "RESET_MAP") {
          this.initMap();
        } else {
          this.showDirections(snapShot);
        }
      }
    } catch (error) {
      this.props.setErrorMessage(error.message);
    }
  }

  /**
   * @description: life cycle method, render Map if directions changed
   * @param nextProps
   */
  shouldComponentUpdate(nextProps) {
    const { directions } = this.props;
    if (
      nextProps.directions &&
      nextProps.directions.path &&
      directions &&
      directions.path
    ) {
      if (directions.path.length === nextProps.directions.path.length) {
        for (let index = 0; index < directions.path.length; index++) {
          if (
            directions.path[index][0] !== nextProps.directions.path[index][0] ||
            directions.path[index][1] !== nextProps.directions.path[index][1]
          ) {
            return true;
          }
          return false;
        }
      }
    }
    return true;
  }

  /**
   * @description life cycle method
   * @param prevProps
   */
  getSnapshotBeforeUpdate(prevProps) {
    const { directions } = this.props;
    if (prevProps.directions !== directions) {
      if (directions === null) {
        return "RESET_MAP";
      }
      return this.props.directions;
    }
    return null;
  }
}

Map.defaultProps = {
  maps
};

export default Map;
