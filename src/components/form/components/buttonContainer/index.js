import React from 'react';

import FormButton from '../../../formButton';

export default () => {
    return (
        <div className="button-container text-right">
            <FormButton buttonType="submit" buttonLabel="Submit" isPrimary />
            <FormButton buttonType="reset" buttonLabel="Reset" />
        </div>
    );
}