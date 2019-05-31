import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Alert } from "react-bootstrap";

import { TOTAL_DISTANCE, TOTAL_TIME } from "../../../config/appConstants";

/**
 * @description: to display information about distance, and also to show reachable message
 */
const DirectionDetail = props => {
  const { direction, message } = props;

  return (
    <Fragment>
      {direction && (
        <Fragment>
          <Alert variant="success" show={!!direction.total_distance}>
            <strong>{TOTAL_DISTANCE}</strong>
            {" " + direction.total_distance}
          </Alert>
          <Alert variant="success" show={!!direction.total_time}>
            <strong>{TOTAL_TIME}</strong>
            {" " + direction.total_time}
          </Alert>
        </Fragment>
      )}
      <Alert variant="danger" show={!!message}>
        {message}
      </Alert>
    </Fragment>
  );
};

// validate prop types
DirectionDetail.propTypes = {
  message: PropTypes.string,
  direction: PropTypes.object
};

export default DirectionDetail;
