import React from 'react';

const CheckButton = ({value, name, label}) => {
    return (
        <label className={"me-1 mb-1"}>
            <input className="settings-button-label" type="checkbox" name={name} value={label}/>
            <div className="settings-button">
                {label}
            </div>
        </label>
    );
};

export default CheckButton;