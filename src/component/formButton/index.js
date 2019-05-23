import React, { Component } from 'react';

export default class FormButton extends Component {
    render() {
        let { buttonType, buttonLabel, isPrimary } = this.props;

        return (
            <button type={buttonType} className={isPrimary ? 'btn btn-primary m-r-20' : 'btn btn-default'}>{buttonLabel}</button>
        );
    }
}