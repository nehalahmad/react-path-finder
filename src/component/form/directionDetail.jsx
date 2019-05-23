import React from 'react';

const DirectionDetail = props => {
    if (props.direction == null) {
        return null;
    }
    return (
        <dl className="dl-horizontal">
            <dt>Total distance: </dt> <dd>{props.direction.total_distance}</dd>
            <dt>Total time: </dt> <dd>{props.direction.total_time}</dd>
        </dl>
    );
}
export default DirectionDetail;