import React, {useState} from 'react';

const CheckButton = ({name, label, setChecked, value, checked}) => {

    const [check, setCheck] = useState(!!checked);

    return (
        <label className={"me-1 mb-1"}>
            <input className="settings-button-label" checked={!!check} type="checkbox" name={name}
                   onChange={e => setCheck(!check)}
                   value={value || label}/>
            <div className="settings-button">
                {label}
            </div>
        </label>
    );
};

export default CheckButton;