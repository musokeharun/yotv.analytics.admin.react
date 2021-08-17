import React, {Fragment, useEffect} from "react";
import {HashRouter, Switch, Route, Redirect} from "react-router-dom";
import "@popperjs/core/lib/popper";
import "jquery/dist/jquery.min";
// import "popper.js/dist/popper.min";
import "bootstrap/dist/js/bootstrap.bundle";
import "./assets/light.css";
import "./user.css";

import Sidebar from "./layout/sidebar";
import TopBar from "./layout/topbar";
import Footer from "./layout/footer";
import Settings from "./pages/settings";
import Funnel from "./modules/admin/funnel/funnel";
import OverView from "./modules/admin/overview/overView";
import "sweetalert2/dist/sweetalert2.min.css";
import Panel from "./layout/panel";
import Users from "./pages/users";
import Partners from "./pages/partners";
import Login from "./modules/admin/auth/login";
import {getCurrentUser} from "./services/user";
import {fetchChannels, selectChannels} from "./modules/admin/funnel/funnelSlice";
import {useDispatch, useSelector} from "react-redux";
import Vod from "./modules/admin/vod";

function App() {
    let user = getCurrentUser();
    const channels = useSelector(selectChannels);
    const dispatch = useDispatch();

    useEffect(() => {
            if (user)
                dispatch(fetchChannels())
        },
        [])
    console.log("User", user);

    return (
        <HashRouter>
            <Switch>
                <Route
                    path={"/admin/login"}
                    render={(props) => <Login {...props} />}
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
                                                <Route
                                                    path={"/users"}
                                                    render={(props) => <Users {...props} channels={channels}/>}
                                                />
                                                <Route
                                                    path={"/partners"}
                                                    render={(props) => <Partners {...props}/>}
                                                />
                                                <Route path={"/vod"} render={(props) => <Vod {...props} />}/>
                                                <Redirect to={"/admin/overview"}/>
                                            </Switch>
                                        </div>
                                    </main>
                                    <Footer/>
                                </div>
                                <Panel/>
                            </Fragment>
                        );
                    }}
                />
            </Switch>
        </HashRouter>
    );
}

export default App;
