import React, {Fragment, useEffect, useState} from 'react';
import _ from "lodash";
import PageHeader from "../../../layout/header/pageHeader";
import {useDispatch, useSelector} from "react-redux";
import welcome from "../../../assets/welcom.png";
import {faArrowUp, faChartLine, faEllipsisH, faTv, faUserAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {fetchDashBoard, fetchRealtime, selectRealtime} from "./overviewSlice";
import classNames from "classnames";
import {DateTime} from "luxon";
import {getDateDifference} from "./overview-utils";
import Timeline from "./timeline";
import {getCurrentUser} from "../../../services/user";


const OverView = ({channels}) => {
    let user = getCurrentUser();
    let dispatch = useDispatch();
    let realtime = useSelector(selectRealtime);
    let [activeIndex, setIndex] = useState(0);

    let channelString = channels ? channels.map(a => a.value).join(",") : ""
    console.log("Channels", channelString);

    useEffect(() => {
        dispatch(fetchRealtime(channelString))
        dispatch(fetchDashBoard())
        setIndex(0)
    }, [channelString])

    //EPG
    const {epg} = realtime;
    let currentEpg = [];
    let okay = false;
    if (epg && Array.isArray(epg['current']) && epg["current"].length) {
        currentEpg = epg['current'].map(current => {

            let epg = {...current};
            let startDateTime = DateTime.fromISO(epg['start'], {setZone: true, zone: "utc"});
            let now = DateTime.now().setZone("Africa/Kampala");
            let endDateTime = DateTime.fromISO(epg['end'], {zone: "utc", setZone: true});

            console.log("Start", startDateTime.toSQL())
            console.log("Now", now.toSQL())
            console.log("End", endDateTime.toSQL())

            epg['start'] = startDateTime;
            epg['end'] = endDateTime;
            epg['duration'] = epg['duration'];
            epg['title'] = epg['title'];
            epg['used'] = getDateDifference(now.toJSDate(), startDateTime.minus({hours: 3}).toJSDate());
            epg['now'] = now;
            return epg;
        });

        console.log(currentEpg);
        okay = true;
    }

    return (
        <Fragment>

            <PageHeader label={"Overview"}/>

            <div className={"row"}>
                <div className="col-12 col-lg-6 col-xxl-3 d-flex">
                    <div className="card illustration flex-fill">
                        <div className="card-body p-0 d-flex flex-fill">
                            <div className="row g-0 w-100">
                                <div className="col-6">
                                    <div className="illustration-text p-3 m-1">
                                        <h6 className="illustration-text">
                                            Welcome Back, {_.capitalize(user.email.split("@")[0].toLowerCase())}!
                                        </h6>
                                        <p className="mb-0">Console
                                            <span className={"badge badge-soft-danger"}>
                                                YOTV
                                            </span>
                                        </p>
                                    </div>
                                </div>
                                <div className="col-6 align-self-end text-end">
                                    <img
                                        src={welcome}
                                        alt="Welcome"
                                        className="img-fluid illustration-img"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="col-12 col-lg-6 col-xxl-3 d-flex">
                    <div className={classNames("card flex-fill", {"shine": !okay})}>
                        <div className="card-body">
                            <div className="row">
                                <div className="col mt-0 scrollbar">
                                    <ul className="nav nav-tabs p-0 m-0" id="myTab" role="tablist">
                                        {!!channels && !!channels.length && channels.map(
                                            (channel, index) => (
                                                <li className="nav-item m-0 p-0" key={index}>
                                                    <a className={classNames("nav-link text-dark", {active: index === activeIndex})}
                                                       id="home-tab"
                                                       onClick={(e) => {
                                                           e.preventDefault();
                                                           setIndex(index)
                                                       }}
                                                       data-bs-toggle="tab" role="tab"
                                                    >
                                                        <small>
                                                            {
                                                                channel.value
                                                            }
                                                        </small>
                                                    </a>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                                <div className="col-auto" title={"Current Epg"}>
                                    <div className="stat stat-sm">
                                        <FontAwesomeIcon icon={faTv}/>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-content border-x border-bottom p-3" id="myTabContent">

                                {
                                    currentEpg.map((value, index) => (
                                        <Fragment>
                                            <div
                                                className={classNames("tab-pane fade", {"show active": index === activeIndex})}
                                                role="tabpanel">
                                                <h5 className="card-title font-weight-bold">
                                                    {value.title ? value.title : ""}
                                                </h5>
                                                <span className={"badge badge-soft-primary"}>Start</span>
                                                <span className={"font-weight-bold"}>
                                                {value.start ? value.start.toFormat("t") : ""}
                                            </span>
                                                <div className="progress my-lg-4 my-2">
                                                    {!!value.used &&
                                                    <div
                                                        className="progress-bar progress-bar-striped progress-bar-animated text-center"
                                                        role="progressbar" aria-valuenow="75" aria-valuemin="0"
                                                        aria-valuemax="100"
                                                        style={{width: `${(value.used / value.duration) * 100}%`}}>
                                                        {value.now ? value.now.toFormat("t") : ""}
                                                    </div>
                                                    }

                                                </div>
                                                <div
                                                    className="mb-0 d-flex flex-row align-items-center justify-content-end">
                                                    <span className={"badge badge-soft-primary"}>End</span>
                                                    <span className={"font-weight-bold"}>
                                                       {value.end ? value.end.toFormat("t") : ""}
                                                    </span>
                                                </div>
                                            </div>
                                        </Fragment>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-lg-6 col-xxl-3 d-flex">
                    <div className="card flex-fill">
                        <div className="card-body">
                            <div className="row">
                                <div className="col mt-0">
                                    <h5 className="card-title">Real-Time</h5>
                                </div>

                                <div className="col-auto">
                                    <div
                                        className="stat stat-sm d-flex align-items-center justify-content-center">
                                        <FontAwesomeIcon icon={faChartLine} className={"align-middle"}/>
                                    </div>
                                </div>
                            </div>
                            <span className="h1 d-inline-block mt-1 mb-4">1.856</span>
                            <div className="mb-0" title={200}>
                                            <span className="badge badge-soft-success me-2">
                                                <FontAwesomeIcon icon={faArrowUp}/>
                                                +2.25%
                                            </span>
                                <span className="text-muted">LIVE</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-lg-6 col-xxl-3 d-flex">
                    <div className={classNames("card flex-fill", {"shine": !okay})}>
                        <div className="card-body">
                            <div className="row">
                                <div className="col mt-0">
                                    <h5 className="card-title">Visitors</h5>
                                </div>

                                <div className="col-auto">
                                    <div
                                        className="stat stat-sm d-flex justify-content-center align-items-center">
                                        <FontAwesomeIcon icon={faUserAlt} className={"align-middle"}/>
                                    </div>
                                </div>
                            </div>
                            <span className="h1 d-inline-block mt-1 mb-4">
                                 {(epg && epg.count) ? epg.count.toLocaleString() : 0}
                            </span>
                            <div className="mb-0">
                                            <span className="badge badge-soft-danger me-2">
                                              <i className="mdi mdi-arrow-bottom-right"/> -1.25%
                                            </span>
                                <span className="text-muted">Last week</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row flex-lg-row-reverse">
                <div className="col-xl-5 d-flex h-100">
                    <div className="card flex-fill w-100">
                        <div className="card-header">
                            <h5 className="card-title mb-0">Watching</h5>
                        </div>
                        <div className={(classNames("card-body py-2 scrollbar", {"shine": !okay}))}
                             style={{maxHeight: "20rem", height: "20rem"}}>
                            {epg && epg.list && epg.list.map((item, index) => <Timeline {...item} key={index}/>)}
                        </div>
                    </div>
                </div>
                <div className="col-xl-7">
                    <div className="card flex-fill w-100 shine">
                        <div className="card-header">
                            <div className="card-actions float-end">
                                <div className="dropdown show">
                                    <a
                                        href="#"
                                        data-bs-toggle="dropdown"
                                        data-bs-display="static"
                                    >
                                        <FontAwesomeIcon icon={faEllipsisH} className="align-middle"/>
                                    </a>

                                    <div className="dropdown-menu dropdown-menu-end">
                                        <a className="dropdown-item" href="#">Refresh</a>
                                        <a className="dropdown-item" href="#">Another action</a>
                                        <a className="dropdown-item" href="#"
                                        >Something else here</a
                                        >
                                    </div>
                                </div>
                            </div>
                            <h5 className="card-title mb-0">Real-Time</h5>
                        </div>
                        <div className="card-body p-2">
                            <div id="world_map" style={{height: "19rem"}}/>
                        </div>
                    </div>
                </div>
            </div>

            {/*STARTED*/}
            <div className="row ">

                {/*LIST*/}
                <div className="col-12 col-lg-6 col-xl-4 d-flex">

                </div>

                <div className="col-12 col-lg-8 d-flex">
                    <div className="card flex-fill w-100">
                        <div className="card-header">
                            <div className="card-actions float-end">
                                <div className="dropdown show">
                                    <a
                                        href="#"
                                        data-bs-toggle="dropdown"
                                        data-bs-display="static"
                                    >
                                        <FontAwesomeIcon icon={faEllipsisH} className={"align-middle"}/>
                                    </a>

                                    <div className="dropdown-menu dropdown-menu-end">
                                        <a className="dropdown-item text-primary" href="#">Live</a>
                                        <a className="dropdown-item" href="#">Another action</a>
                                        <a className="dropdown-item" href="#"
                                        >Something else here</a
                                        >
                                    </div>
                                </div>
                            </div>
                            <h5 className="card-title mb-0">Yesterday</h5>
                        </div>
                        <div className="card-body d-flex w-100">
                            <div className="align-self-center chart chart-lg">
                                <canvas id="chartjs-dashboard-bar"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default OverView;