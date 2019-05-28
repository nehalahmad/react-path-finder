import React, { Fragment } from "react";

/**
 * @description: A definition list to display distance information, and also to show message
 */
export default props => {
  return (
    <Fragment>
      {props.direction && (
        <dl className="dl-horizontal">
          <dt>Total distance: </dt> <dd>{props.direction.total_distance}</dd>
          <dt>Total time: </dt> <dd>{props.direction.total_time}</dd>
        </dl>
      )}
      {props.message && <p className="bg-danger">{props.message}</p>}
    </Fragment>
  );
};
