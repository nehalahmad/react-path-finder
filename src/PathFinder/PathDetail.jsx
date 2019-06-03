import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Alert } from "react-bootstrap";

import { TOTAL_DISTANCE, TOTAL_TIME } from "../config/AppConstants";

/**
 * @description: to display information about distance, and also to show reachable message
 */
const PathDetail = props => {
  const { direction, message } = props;

  return (
    <Fragment>
      {direction && (
        <Fragment>
          {[
            { key: TOTAL_DISTANCE, value: direction.total_distance },
            { key: TOTAL_TIME, value: direction.total_time }
          ].map(({ key, value }, index) => {
            return (
              <Alert variant="success" show={!!value} key={index}>
                <strong>{key}</strong>
                {" " + value}
              </Alert>
            );
          })}
        </Fragment>
      )}
      <Alert variant="danger" show={!!message}>
        {message}
      </Alert>
    </Fragment>
  );
};

// validate prop types
PathDetail.propTypes = {
  message: PropTypes.string,
  direction: PropTypes.object
};

export default PathDetail;
