import React, {Fragment, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchUsers, selectUsers} from "./usersSlice";
import Input from "../../common/input";
import Select from "../../common/select";
import {v1} from "uuid";
import _ from "lodash";
import classNames from "classnames";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEllipsisH} from "@fortawesome/free-solid-svg-icons";
import $ from "jquery";
import CheckButton from "../../common/checkButton";

const Users = () => {

    const [search, setSearch] = useState("");
    const users = useSelector(selectUsers);
    const dispatch = useDispatch();
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        dispatch(fetchUsers())
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Data", $(e.currentTarget).serialize());

    }

    return (
        <Fragment>
            <h1 className="h3 mb-3 fw-bolder">Users</h1>

            <div className={"row"}>


                <div className={"col-md"}>


                    <div className={"card"}>

                        <div className="card-header">
                            <div className="row align-items-center">
                                <div className="col">
                                    <h3 className="mb-0">Registered<span
                                        className="d-none d-sm-inline-block">({users.length || 0})</span></h3>
                                </div>
                                <div className="col">
                                    <form>
                                        <div className="row g-0 align-items-center">
                                            <div className="col">
                                                <Input name={"search-partners"}
                                                       inputClass={"form-control form-control-sm"}
                                                       type="text"
                                                       value={search}
                                                       placeHolder={"Search"}
                                                       onChange={e => setSearch(e.currentTarget.value)}
                                                />
                                            </div>
                                            <div className="col d-md-block d-none">
                                                <Select
                                                    inputClass={"form-select form-select-sm ms-2"}
                                                    name={"filter"}
                                                    options={[{_id: 1, name: "All"}]}
                                                />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div className={"card-body"}>

                            <table className="table table-hover">

                                <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Status</th>
                                    <th/>
                                </tr>
                                </thead>

                                <tbody>

                                {
                                    !!users && !!users.length && users.map((user, index) => {

                                        if (search && !user.email.includes(search))
                                            return <React.Fragment/>

                                        return (
                                            <tr key={v1()}>
                                                <td>{index + 10}</td>
                                                <td>{_.capitalize(user.name || "N/A")}</td>
                                                <td>{user.email}</td>
                                                <td>
                                                <span className={classNames("btn", {
                                                    "btn-primary": !!user.isActive,
                                                    "btn-warning": !user.isActive
                                                })}> {user.isActive ? "Active" : "Inactive"} </span>
                                                </td>
                                                <td>
                                                    <a onClick={e => {
                                                        e.preventDefault();
                                                        setUserId(user.id);
                                                    }}>
                                                        <FontAwesomeIcon icon={faEllipsisH}/>
                                                    </a>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }

                                </tbody>

                            </table>

                            <button
                                onClick={e => setUserId(0)}
                                className={"btn btn-outline-primary"}>
                                Add User
                            </button>

                        </div>
                    </div>
                </div>

                <div style={{transition: "all 1s 0s ease"}}
                     className={classNames("col-md-4", {"d-none": isNaN(parseInt(userId))})}>
                    <div className={"w-100 d-flex justify-content-around"}>
                        <span className={"h3"}>Add User</span>
                        <button className={"btn-close close btn"} onClick={e => setUserId(null)}/>
                    </div>

                    <form className={"w-lg-75 w-100"} onSubmit={e => handleSubmit(e)}>
                        <div className={"mb-md-3"}>
                            <Input name={"email"} type={"email"} required placeholder={"Email"}/>
                        </div>
                        <div className={"mb-md-3"}>
                            <Input name={"password"} type={"password"} required placeholder={"Password**"}
                                   minlength={6}/>
                        </div>
                        <div className={"mb-md-3"}>
                            <Input name={"name"} type={"text"} placeholder={"Name (optional)"}/>
                        </div>
                        <div className={"d-flex align-items-center"}>
                            <span className={"text-muted me-md-2 me-1"}>Status</span>
                            <CheckButton
                                name={"status"}
                                checked={false}
                                label={"Active"}
                                value={"yes"}
                            />
                        </div>
                        <p className={"text-muted"}>
                            Roles
                        </p>
                        <button type={"submit"} className={"btn btn-primary w-100 d-block"}>
                            Submit
                        </button>
                    </form>
                </div>

            </div>

        </Fragment>
    );
};

export default Users;