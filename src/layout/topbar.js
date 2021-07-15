import React, {useState} from 'react';
import $ from "jquery";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChartPie, faCog, faSearch, faUserCog} from "@fortawesome/free-solid-svg-icons";

import Input from "../common/input";
import logo from "../assets/avatar.png";
import Messages from "./header/messages";
import Alerts from "./header/alerts";
import {Link} from "react-router-dom";

const Topbar = () => {

    const [search, setSearch] = useState("");

    return (
        <nav className="navbar navbar-expand navbar-light navbar-bg">
            <a className="sidebar-toggle" onClick={e => {
                e.preventDefault();
                sideBarToggle();
            }}>
                <i className="hamburger align-self-center"/>
            </a>


            {/*SEARCH*/}
            <form className="d-none d-sm-inline-block">
                <div className="input-group input-group-navbar">
                    <Input name={"search"} onChange={e => setSearch(e.currentTarget.value)}
                           placeholder={"Search Console"} type={"text"} value={search}/>
                    <button className="btn" type="button">
                        <FontAwesomeIcon icon={faSearch} className={"align-middle"}/>
                    </button>
                </div>
            </form>

            <ul className="navbar-nav">
                <li className="nav-item px-2 dropdown">
                    <a
                        className="nav-link btn btn-primary btn-pill text-dark fw-bolder"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                        title={"Online Streams"}
                    >
                        23
                    </a>
                    <div
                        className="dropdown-menu"
                        aria-labelledby="servicesDropdown"
                    >
                        <div className="d-md-flex align-items-start justify-content-start">
                            <div className="dropdown-mega-list">
                                <a className="dropdown-item">
                                    Live <span className="badge badge-soft-danger text-dark">10+</span>
                                </a>
                                <a className="dropdown-item" href="#">Catch Up</a>
                            </div>
                            <div className="dropdown-mega-list">
                                <a className="dropdown-item" href="#">Rewind</a>
                                <a className="dropdown-item" href="#">Recording</a>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>

            {/*RIGHT SECTION*/}
            <div className="navbar-collapse collapse">
                <ul className="navbar-nav navbar-align">

                    <li className="nav-item dropdown">
                        <Messages/>
                    </li>

                    <li className="nav-item dropdown">
                        <Alerts/>
                    </li>

                    <li className="nav-item dropdown">
                        <a
                            className="nav-icon d-inline-block d-sm-none"
                            href="#"
                            data-bs-toggle="dropdown"
                        >
                            <FontAwesomeIcon icon={faCog} className={"align-middle"}/>
                        </a>

                        <a
                            className="nav-link d-none d-sm-inline-block"
                            href="#"
                            data-bs-toggle="dropdown"
                        >
                            <img
                                src={logo}
                                className="avatar img-fluid rounded-circle me-1"
                                alt="Chris Wood"
                            />
                            <span className="text-dark">Chris Wood</span>
                        </a>
                        <div className="dropdown-menu dropdown-menu-end">
                            <a className="dropdown-item">
                                <FontAwesomeIcon icon={faUserCog} className={"align-middle me-1"}/>
                                Profile
                            </a>
                            <a className="dropdown-item">
                                <FontAwesomeIcon icon={faChartPie} className={"align-middle me-1"}/>
                                Analytics
                            </a>
                            <div className="dropdown-divider"/>
                            <Link className="dropdown-item" to={"/settings"}>
                                Settings & Privacy
                            </Link>
                            <a className="dropdown-item" href="#">Help</a>
                            <a className="dropdown-item" href="#">Sign out</a>
                        </div>
                    </li>

                </ul>
            </div>

        </nav>
    );
};

export const sideBarToggle = () => {
    $(".sidebar").toggleClass("collapsed").on("transitionend", function () {
        console.log("Resize done")
        window.dispatchEvent(new Event("resize"));
    });
}
export default Topbar;