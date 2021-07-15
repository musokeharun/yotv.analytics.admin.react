import React, {useState} from 'react';
import logo from "../../../assets/logo.png";
import Input from "../../../common/input";
import {v1} from "uuid";
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "./authSlice";

const PartnerLogin = () => {

    const user = useSelector(getUser);
    const dispatch = useDispatch()

    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const fileId = v1();

    const submit = e => {
        e.preventDefault();
    }

    const fileChange = e => {
        let file = e.currentTarget.files[0];
        if (!file) return;
        const {name, type, size} = file;
        if (type !== "text/plain") {
            console.log("File not supported");
            return;
        }
    }

    console.log(user);

    return (
        <div className="main d-flex justify-content-center w-100">
            <main className="content d-flex p-0">
                <div className="container d-flex flex-column">

                    <div className="row h-100">
                        <div className="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
                            <div className="d-table-cell align-middle">
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
                                                    alt="Chris Wood"
                                                    className="img-fluid rounded-circle"
                                                    width="132"
                                                    height="132"
                                                />
                                            </div>

                                            <form onSubmit={e => submit(e)}>

                                                <Input
                                                    name={"name"}
                                                    errors={""}
                                                    label={"Username"}
                                                    value={name}
                                                    inputClass={"form-control-lg"}
                                                    placeholder={"Enter your username"}
                                                    onChange={e => setName(e.currentTarget.value)}/>

                                                <Input
                                                    name={"password"}
                                                    errors={""}
                                                    label={"Password"}
                                                    value={password}
                                                    inputClass={"form-control-lg"}
                                                    placeholder={"Enter your token"}
                                                    onChange={e => setName(e.currentTarget.value)}/>

                                                <label htmlFor={fileId}
                                                       className={"form-label text-primary cursor-pointer"}>
                                                    Upload file (.yotv.txt)
                                                </label>
                                                <input id={fileId} name={"file"} onChange={e => fileChange(e)}
                                                       className={"d-none"} type={"file"}/>


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

export default PartnerLogin;
