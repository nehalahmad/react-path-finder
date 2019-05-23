import React, {Fragment} from 'react';

const DirectionDetail = props => {
    return (
        <Fragment>
            {props.direction && <dl className="dl-horizontal">
                <dt>Total distance: </dt> <dd>{props.direction.total_distance}</dd>
                <dt>Total time: </dt> <dd>{props.direction.total_time}</dd>
            </dl>}
            {props.message && <p className="bg-danger">{props.message}</p>}
        </Fragment>

    );
}
export default DirectionDetail;