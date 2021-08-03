import React from "react";
import classNames from "classnames";

const Select = ({
                    name,
                    options,
                    label,
                    selected = null,
                    errors,
                    onChange,
                    inputClass
                }) => {
    return (
        <div className="form-group mb-3">
            {label && <label htmlFor={name}>{label}</label>}
            <select
                name={name}
                onChange={onChange}
                className={classNames({"form-control": !inputClass, [inputClass]: !!inputClass})}
                id={name}
            >
                {options.map(test => (
                    <option
                        selected={selected && selected._id === test._id ? true : false}
                        key={test._id}
                        value={test._id}
                    >
                        {test.name}
                    </option>
                ))}
            </select>
            {errors && <div className="alert alert-danger">{errors}</div>}
        </div>
    );
};

export default Select;
