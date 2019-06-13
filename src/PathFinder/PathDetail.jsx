// PathFinder/PathDetail.jsx
import React, { Fragment } from 'react';
import { Alert } from 'react-bootstrap';

import { TOTAL_DISTANCE, TOTAL_TIME } from '../config/AppConstants';

/**
 * @description: to display information about distance, and also to show API response message
 */
const PathDetail = ({ direction, message }) => (
  <Fragment>
    {direction && (
      <Fragment>
        {[
          { key: TOTAL_DISTANCE, value: direction.total_distance },
          { key: TOTAL_TIME, value: direction.total_time }
        ].map(({ key, value }) => {
          return (
            <Alert variant="success" show={!!value} key={key}>
              <strong>{key}</strong>
              {` ${value}`}
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

export default PathDetail;
