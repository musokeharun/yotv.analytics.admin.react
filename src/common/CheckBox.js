import React, {useState} from 'react';
import {v1} from "uuid";

const CheckBox = ({_checked, label, name, setChecked, value}) => {

    const [checked, setCheck] = useState(!!_checked || false);

    let id = v1();
    return (
        <div className="form-check align-middle">
            <input
                id={id}
                className="form-check-input"
                name={name}
                type={"checkbox"}
                checked={checked}
                value={value || "1"}
                onChange={e => {
                    setCheck(!checked)
                    setChecked && setChecked(!checked)
                }}
            />
            <label
                className="form-check-label text-small text-sm"
                htmlFor={id}
            >{label}</label
            >
        </div>
    );
};

export default CheckBox;