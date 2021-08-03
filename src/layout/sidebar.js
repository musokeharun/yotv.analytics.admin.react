import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBalanceScale, faBell,
    faBellSlash,
    faChartLine,
    faChartPie,
    faCog,
    faConciergeBell,
    faFileContract,
    faFunnelDollar,
    faLocationArrow, faMobile,
    faPhoneSquareAlt,
    faStream,
    faTv, faUserGraduate, faUsers,
} from "@fortawesome/free-solid-svg-icons";
import {faDashcube} from "@fortawesome/free-brands-svg-icons";
import {faTablets} from "@fortawesome/free-solid-svg-icons";
import {Link, NavLink} from "react-router-dom";
import logo from "../assets/logo.png";

const Sidebar = () => {
    let darkerBackgroundColor = "#391C4F";
    let cogStyles = {
        backgroundColor: `${darkerBackgroundColor} !important`,
        position: "absolute",
        color: "white",
        top: "12px",
        right: "20px",
    };
    return (
        <nav
            id="sidebar"
            className="sidebar"
            style={{
                backgroundColor: darkerBackgroundColor,
                minHeight: "100vh",
                maxHeight: "100vh",
                overflowY: "hidden",
            }}
        >
            <div
                className="sidebar-content js-simplebar"
                style={{backgroundColor: darkerBackgroundColor}}
            >
                <a className="sidebar-brand">
                    <img src={logo} alt={"Yotv Console"}/>
                    <span className="align-middle ms-1">Console</span>
                </a>
            </div>

            <ul
                className="sidebar-nav scrollbar"
                style={{height: "60h", maxHeight: "60vh"}}
            >
                <li className="sidebar-item">
          <span className="sidebar-link">
            <FontAwesomeIcon icon={faChartPie} className={"align-middle"}/>
            <NavLink
                to={"admin/overview"}
                className="align-middle fs-lg text-decoration-none text-white"
            >
              Overview
            </NavLink>
            <span style={cogStyles}>
              <div className="dropstart">
                <span data-bs-toggle="dropdown" aria-expanded="false">
                  <FontAwesomeIcon icon={faCog} className={"fa-2x mx-auto"}/>
                </span>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={"/settings"}>
                      Settings
                    </Link>
                  </li>
                  <li>
                    <Link to={"/users"} className="dropdown-item">
                      Users and Permissions
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/partners">
                      Partners and tokens
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider"/>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/admin/login">
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            </span>
          </span>
                </li>
                <li className="sidebar-item">
                    <a className="sidebar-link">
                        <FontAwesomeIcon icon={faBell} className={"align-middle"}/>
                        <span className="align-middle fs-sm">Push Notifications</span>
                        <span className="badge badge-sidebar-primary">2</span>
                    </a>
                </li>
                <li className="sidebar-item">
                    <Link to={"/vod"} className="sidebar-link">
                        <FontAwesomeIcon icon={faMobile} className={"align-middle"}/>
                        <span className="align-middle fs-lg">Vod</span>
                        <span className="badge badge-sidebar-primary">2</span>
                    </Link>
                </li>

                <li className="sidebar-header">Flows</li>
                <li className="sidebar-item">
                    <Link className="sidebar-link" to={"/admin/funnel"}>
                        <FontAwesomeIcon className={"align-middle"} icon={faFunnelDollar}/>
                        <span className="align-middle">Funnel Analysis</span>
                    </Link>
                </li>
                <li className="sidebar-item">
                    <a className="sidebar-link">
                        <FontAwesomeIcon className={"align-middle"} icon={faStream}/>
                        <span className="align-middle">Streams</span>
                    </a>
                </li>
                <li className="sidebar-item">
                    <a className="sidebar-link">
                        <FontAwesomeIcon
                            className={"align-middle"}
                            icon={faPhoneSquareAlt}
                        />
                        <span className="align-middle">Devices</span>
                    </a>
                </li>
                <li className="sidebar-item">
                    <a className="sidebar-link">
                        <FontAwesomeIcon className={"align-middle"} icon={faTv}/>
                        <span className="align-middle">Programs</span>
                    </a>
                </li>
                <li className="sidebar-item">
                    <a className="sidebar-link">
                        <FontAwesomeIcon
                            className={"align-middle"}
                            icon={faLocationArrow}
                        />
                        <span className="align-middle">Location</span>
                    </a>
                </li>

                <li className="sidebar-header">Reports</li>
                <li className="sidebar-item">
                    <a className="sidebar-link">
                        <FontAwesomeIcon className={"align-middle"} icon={faFileContract}/>
                        <span className="align-middle">Reports</span>
                    </a>
                </li>
                <li className="sidebar-item">
                    <a className="sidebar-link">
                        <FontAwesomeIcon className={"align-middle"} icon={faBalanceScale}/>
                        <span className="align-middle">Comparison</span>
                    </a>
                </li>
                <li className="sidebar-item">
                    <a className="sidebar-link">
                        <FontAwesomeIcon className={"align-middle"} icon={faBellSlash}/>
                        <span className="align-middle">Alerts</span>
                    </a>
                </li>

                <li className="sidebar-header">Marketing</li>
                <li className="sidebar-item">
                    <a className="sidebar-link">
                        <FontAwesomeIcon className={"align-middle"} icon={faTablets}/>
                        <span className="align-middle">Marketing Overview</span>
                    </a>
                </li>
                <li className="sidebar-item">
                    <a className="sidebar-link">
                        <FontAwesomeIcon className={"align-middle"} icon={faDashcube}/>
                        <span className="align-middle">Social Platforms</span>
                    </a>
                </li>
                <li className="sidebar-item">
                    <a className="sidebar-link">
                        <FontAwesomeIcon
                            className={"align-middle"}
                            icon={faConciergeBell}
                        />
                        <span className="align-middle">Notifications</span>
                    </a>
                </li>

                <li className="sidebar-header">Authentication</li>
                <li className="sidebar-item">
                    <Link to={"/users"} className="sidebar-link">
                        <FontAwesomeIcon className={"align-middle"} icon={faUsers}/>
                        <span className="align-middle">Users</span>
                    </Link>
                </li>
                <li className="sidebar-item">
                    <Link to={"/partners"} className="sidebar-link">
                        <FontAwesomeIcon className={"align-middle"} icon={faUserGraduate}/>
                        <span className="align-middle">Partners & Tokens</span>
                    </Link>
                </li>
                <li className="sidebar-item">
                    <Link to={"/settings"} className="sidebar-link">
                        <FontAwesomeIcon className={"align-middle"} icon={faCog}/>
                        <span className="align-middle">Settings</span>
                    </Link>
                </li>

            </ul>

            <div className="sidebar-cta align-baseline">
                <div
                    className="sidebar-cta-content"
                    style={{backgroundColor: "#42205C"}}
                >
                    <strong className="d-inline-block mb-2">Monthly Sales Report</strong>
                    <div className="mb-3 text-sm">
                        Your monthly sales report is ready for download!
                    </div>

                    <div className="d-grid">
                        <Link to={""} disabled className="disabled btn btn-primary">
                            Download
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Sidebar;
