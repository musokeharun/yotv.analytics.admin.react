import React, {useState} from 'react';
import logo from "../../../assets/logo.png";
import Input from "../../../common/input";
import {useDispatch, useSelector} from "react-redux";
import {getUser, login} from "./authSlice";
import User from "../../../services/user";

const Login = ({history}) => {

    const user = useSelector(getUser);
    const dispatch = useDispatch()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async e => {
        e.preventDefault();
        let user = await User.login(email, password)
        if (!user) return;
        dispatch(login(user))
        alert("Login Successful")
        window.location.href = "/";
    }
    return (
        <div className="main d-flex justify-content-center w-100">
            <main className="content d-flex p-0">
                <div className="container d-flex flex-column">

                    <div className="row h-100">
                        <div className="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
                            <div className="d-table-cell ">
                                <div className="text-center mt-4">
                                    <h1 className="h2">Welcome back</h1>
                                    <p className="lead">Sign in to your account to continue</p>
                                </div>

                                <div className="card bg-light">
                                    <div className="card-body">
                                        <div className="m-sm-4">
                                            <div className="text-center">
                                                <img
                                                    src={logo}
                                                    alt="Logo"
                                                    className="img-fluid rounded-circle"
                                                    width="132"
                                                    height="132"
                                                />
                                            </div>

                                            <form onSubmit={e => handleSubmit(e)}>

                                                <Input
                                                    name={"email"}
                                                    errors={""}
                                                    label={"Email"}
                                                    value={email}
                                                    type={"email"}
                                                    inputClass={"form-control-lg"}
                                                    placeholder={"Enter your email"}
                                                    onChange={e => setEmail(e.currentTarget.value)}/>

                                                <Input
                                                    name={"password"}
                                                    errors={""}
                                                    label={"Password"}
                                                    type={"password"}
                                                    value={password}
                                                    inputClass={"form-control-lg"}
                                                    placeholder={"***"}
                                                    onChange={e => setPassword(e.currentTarget.value)}/>

                                                <div className="text-center mt-3">
                                                    <button type="submit" className="btn btn-lg btn-primary">Sign in
                                                    </button>
                                                </div>
                                            </form>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Login;
