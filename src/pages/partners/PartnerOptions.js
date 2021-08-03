import React, {useState} from 'react';
import Input from "../../common/input";
import CheckBox from "../../common/CheckBox";
import {createToast} from "../../utils/toasts";
import CheckButton from "../../common/checkButton";
import {v1} from "uuid";
import _ from "lodash";
import $ from "jquery";

const PartnerOptions = ({isActive, logo, onGenerateToken, roles}) => {

    const [status, setStatus] = useState(isActive)
    const [expiry, setExpiry] = useState("")
    const [_logo, setLogo] = useState(logo)

    // console.log("Roles", JSON.stringify(roles));

    function downloadToken() {
        if (!expiry) {
            let toast = createToast();
            toast.fire({title: "Expiry days are required", icon: "warning"})
            return;
        }
        onGenerateToken(expiry)
    }

    let rolesValues = Object.values(roles);

    function onSubmit(e) {
        e.preventDefault();

        console.log($(e.target).serializeArray());

        // TODO UPDATE SUBMIT PARTNER DATA

        return undefined;
    }

    return (
        <div className={"row text-start"}>

            <div className={"col-md-6"}>
                <form onSubmit={onSubmit}>

                    <h6 className={"text-decoration-underline"}>Update</h6>

                    <CheckBox
                        name={"status"}
                        label={"Status"}
                        setChecked={e => setStatus(e)}
                        _checked={!!status}
                    />

                    <Input
                        name={"logo"}
                        placeholder={"Add a logo"}
                        label={"Logo"}
                        value={_logo}
                        type={"url"}
                        disabled
                    />

                    <h6>Roles</h6>
                    <div className={"row"}>

                        {
                            !!roles && !!rolesValues && Object.keys(roles).slice(3).map((role, index) => {
                                if (index !== 1) {
                                    return <CheckButton
                                        label={_.capitalize(role.startsWith("data") ? "Relative Data" : role)}
                                        name={"roles"}
                                        checked={!!rolesValues[index]}
                                        value={role}
                                        key={"Role" + index}
                                    />
                                }
                            })
                        }
                    </div>

                    <button
                        type={"submit"}
                        className={"btn btn-primary d-block my-2"}>
                        Update
                    </button>

                </form>

            </div>
            <div className={"col-md-6"}>

                <h6 className={"text-decoration-underline"}>Create token</h6>

                <Input
                    name={"expiry"}
                    value={expiry}
                    label={"Token Expiry (days)"}
                    type={"number"}
                    step={1}
                    required
                    placeholder={"Add Expiry in days."}
                    onChange={e => setExpiry(parseInt(e.currentTarget.value))}
                />

                <a className={"text-primary"} onClick={e => {
                    e.preventDefault();
                    downloadToken()
                }}>
                    Generate
                </a>

            </div>

        </div>
    );
};

export default PartnerOptions;