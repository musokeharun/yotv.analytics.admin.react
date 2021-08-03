import React, {Fragment, useEffect} from 'react';
import $ from "jquery";
import {useDispatch, useSelector} from "react-redux";
import {selectChannels, setSelectedChannels} from "../modules/admin/funnel/funnelSlice";
import CheckButton from "../common/checkButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFilter} from "@fortawesome/free-solid-svg-icons";

const Panel = () => {

    const channels = useSelector(selectChannels);
    const dispatch = useDispatch();
    const togglePanel = () => {
        $(".js-settings").toggleClass("open")
    }

    return (
        <Fragment>
            <div className="settings js-settings">
                <div className="settings-toggle">
                    <div className="settings-toggle-option settings-toggle-option-text fw-bolder"
                         onClick={e => togglePanel()}
                         title="Filter">
                        Filter
                    </div>
                    <span className="settings-toggle-option">
                        <FontAwesomeIcon icon={faFilter}/>
                    </span>
                </div>
                <div className="settings-panel">
                    <div className="settings-content">
                        <form id={"panel-form"} onSubmit={e => {
                            e.preventDefault();
                            let serializeArray = $("#panel-form").serializeArray();
                            togglePanel();
                            console.log(serializeArray);
                            dispatch(setSelectedChannels(serializeArray))
                        }}>
                            <div className="settings-title d-flex align-items-center">
                                <button type="button" className="btn-close float-right" onClick={e => togglePanel()}
                                        aria-label="Close"/>

                                <h4 className="mb-0 ms-2 d-inline-block">Filter</h4>
                            </div>

                            <div className="settings-body">

                                <h6>Channels</h6>
                                {

                                    channels && !!channels.length && channels.map((channel, index) => {
                                        return <CheckButton
                                            key={index}
                                            value={channel.id} label={channel.name}
                                            name={"channels"}
                                        />
                                    })

                                }
                            </div>
                            <div className="settings-footer">
                                <div className="d-grid">
                                    <button className="btn btn-primary btn-lg btn-block"
                                            type={"submit"}>
                                        Apply
                                    </button>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Panel;