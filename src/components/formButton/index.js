import React from 'react';

const FormButton = props => {
    let { buttonType, buttonLabel, isPrimary } = props;

    return (
        <button type={buttonType} className={isPrimary ? 'btn btn-primary m-r-20' : 'btn btn-default'}>
            {buttonLabel}
        </button>
    );
}

export default FormButton;