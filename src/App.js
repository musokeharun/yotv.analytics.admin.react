import React, {Fragment, useState} from "react";
import {HashRouter, Switch, Route, Redirect} from "react-router-dom";
import "jquery/dist/jquery.min";
import "popper.js/dist/popper.min";
import "bootstrap/dist/js/bootstrap.bundle";
import "./assets/light.css";
import "./user.css";

import Sidebar from "./layout/sidebar";
import TopBar from "./layout/topbar";
import Footer from "./layout/footer";
import Settings from "./pages/settings";
import AdminLogin from "./modules/admin/login";
import Funnel from "./modules/partner/funnel/funnel";
import {useSelector} from "react-redux";
import {getUser} from "./modules/partner/auth/authSlice";
import OverView from "./modules/partner/overview/overView";
import "sweetalert2/dist/sweetalert2.min.css";
import Panel from "./layout/panel";

function App() {
    const user = useSelector(getUser);
    const [channels, setChannels] = useState(null);

    return (
        <HashRouter>
            <Switch>
                <Route
                    path={"/admin/login"}
                    render={(props) => <AdminLogin {...props} />}
                />
                <Route
                    path={"/"}
                    render={(props) => {
                        if (!user) return <Redirect to={"/admin/login"}/>;
                        return (
                            <Fragment>
                                <Sidebar/>
                                <div
                                    className="main scrollbar overflow-auto"
                                    style={{maxHeight: "100vh"}}
                                >
                                    <TopBar/>
                                    <main className="content ">
                                        <div className="container-fluid p-0">
                                            <Switch>
                                                <Route
                                                    path={"/settings"}
                                                    exact
                                                    render={(props) => <Settings {...props} />}
                                                />
                                                <Route
                                                    path={"/admin/overview"}
                                                    render={(props) => <OverView {...props} channels={channels}/>}
                                                />
                                                <Route
                                                    path={"/admin/funnel"}
                                                    render={(props) => <Funnel {...props} channels={channels}/>}
                                                />
                                                <Redirect to={"/admin/overview"}/>
                                            </Switch>
                                        </div>
                                    </main>
                                    <Footer/>
                                </div>
                                <Panel onSubmit={e => setChannels(e)}/>
                            </Fragment>
                        );
                    }}
                />
            </Switch>
        </HashRouter>
    );
}

export default App;
