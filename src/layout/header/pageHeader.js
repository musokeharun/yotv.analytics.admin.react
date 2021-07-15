import React, {Fragment} from "react";
import Flatpickr from "react-flatpickr";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFilter, faRoute} from "@fortawesome/free-solid-svg-icons";
import "../../assets/flatpickr.min.css";

const PageHeader = ({label, dateEnabled, channelsEnabled, dateValue, setDate}) => {
    if (!label) return <Fragment/>;
    return (
        <div className="row mb-2 mb-xl-3">
            <div className="col-auto d-none d-sm-block">
                <h3>{label}</h3>
            </div>

            <div className="col-auto ms-auto text-end mt-n1">
                <span>Showing data for </span>
                <div className="me-2 d-inline-block">
                    <Flatpickr
                        data-enable-time
                        defaultValue={""}
                        options={{mode: "range"}}
                        className={"form-control"}
                        value={dateValue}
                        onChange={date => setDate(date)}
                    />
                </div>

                <button
                    className="btn btn-primary shadow-sm me-md-1"
                    data-bs-toggle="dropdown"
                    title={"Filter"}
                >
                    <FontAwesomeIcon icon={faFilter} className={"align-middle "}>
                        &nbsp;
                    </FontAwesomeIcon>
                </button>

                <div className="dropdown-menu" aria-labelledby="servicesDropdown">
                    <div className="d-md-flex align-items-start justify-content-start">
                        <div className="tab tab-vertical">
                        </div>
                    </div>
                </div>
                <button className="btn btn-primary shadow-sm">
                    <FontAwesomeIcon icon={faRoute} className={"align-middle"}>
                        &nbsp;
                    </FontAwesomeIcon>
                </button>
            </div>
        </div>
    );
};
export default PageHeader;
