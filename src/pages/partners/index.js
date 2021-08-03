import React, {useEffect, useState} from 'react';
import Input from "../../common/input";
import Select from "../../common/select";
import PartnerItem from "./partnerItem";
import {useDispatch, useSelector} from "react-redux";
import {savePartner, fetchPartners, selectPartners, createToken} from "./partnerSlice";
import {selectChannels} from "../../modules/admin/funnel/funnelSlice";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDown} from "@fortawesome/free-solid-svg-icons";
import Modal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import PartnerOptions from "./PartnerOptions";

const Partners = () => {

    const [search, setSearch] = useState("");
    const partners = useSelector(selectPartners);
    const dispatch = useDispatch();
    const channels = useSelector(selectChannels);

    useEffect(() => {
        dispatch(fetchPartners())
    }, [])

    const launchOptions = (partner) => {
        const PartnerModal = withReactContent(Modal)

        const handleGenerateToken = expiry => {
            dispatch(createToken({partner: partner.id, expiry, name: partner.name}))
            PartnerModal.close();
        }

        PartnerModal.fire({
            title: <h5 className={"h3 font-weight-bold"}>{partner && partner.name} (Edit)</h5>,
            footer: null,
            showDenyButton: false,
            showConfirmButton: false,
            width: "40rem",
            html: <PartnerOptions {...partner} onGenerateToken={e => handleGenerateToken(e)}/>,
        }).then(() => {
            // return PartnerModal.fire(<p>Shorthand works too</p>)
        })

    }

    const createOptions = (channel) => {
        const PartnerModal = withReactContent(Modal)

        PartnerModal.fire({
            title: `Do you want to add ${channel.name}?`,
            footer: null,
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: `Add and Activate`,
            confirmButtonColor: "green",
            denyButtonColor: "orange",
            cancelButtonColor: "red",
            denyButtonText: `Add and Deactivate`,
            cancelButtonText: `Dont Add`,
        }).then((result) => {
            // return PartnerModal.fire(<p>Shorthand works too</p>)
            let payload = {...channel};
            if (result.isConfirmed) {
                payload.isActive = 1;
            } else if (result.isDenied) {
                payload.isActive = 0;
            }
            dispatch(savePartner(payload));
            PartnerModal.fire('Channel is updating', '', 'info').then(() => dispatch(fetchPartners()))
        })

    }

    let partnerCollapseId = "partnerCollapseId";
    return (
        <React.Fragment>
            <h1 className="h3 mb-3 fw-bolder">Partners</h1>

            <div className={"row"}>
                <div className={"card"}>
                    <div className="card-header">
                        <div className="row align-items-center">
                            <div className="col">
                                <h3 className="mb-0">Enabled<span
                                    className="d-none d-sm-inline-block">({partners.length || 0})</span></h3>
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

                    <div className="card-body pb-5">
                        <div className="row g-0 text-center fs--1">

                            {
                                !!partners && !!partners.length && partners.map((partner) => {
                                    const {name, isActive, img, id} = partner;

                                    if (search && search.length > 0) {
                                        if (!name.toLowerCase().includes(search.toLowerCase())) {
                                            return <React.Fragment/>;
                                        }
                                    }

                                    return (
                                        <div className="col-6 col-md-3 col-lg-2 mb-2">
                                            <PartnerItem
                                                title={name}
                                                onClickListener={() => launchOptions(partner)}
                                                img={img}
                                                status={!!isActive} key={id}/>
                                        </div>
                                    );
                                })
                            }

                        </div>
                    </div>

                    <div className="card-header">
                        <div className="row align-items-center">
                            <a className="col text-decoration-none" data-bs-toggle="collapse"
                               data-bs-target={"#" + partnerCollapseId} href={"#" + partnerCollapseId}>
                                <h3 className="mb-0">All<span
                                    className="d-none d-sm-inline-block">({channels ? channels.length : 0})
                                </span>
                                </h3>
                            </a>
                            <div className="col d-flex justify-content-end">
                                <a className={"text-dark"} data-bs-toggle="collapse"
                                   data-bs-target={"#" + partnerCollapseId} href={"#" + partnerCollapseId}>
                                    <FontAwesomeIcon icon={faArrowDown} className={"text-dark"}/>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="card-body pb-5 ">
                        <div className="row g-0 text-center fs--1 collapse fade" id={partnerCollapseId}>
                            {
                                !!channels && !!channels.length && channels.map((channel) => {

                                    const {name, isActive, logo, id} = channel;

                                    if (search && search.length > 0) {
                                        if (!name.toLowerCase().includes(search.toLowerCase())) {
                                            return <React.Fragment/>;
                                        }
                                    }

                                    return (
                                        <div className="col-6 col-md-3 col-lg-2 mb-2">
                                            <PartnerItem
                                                title={name}
                                                onClickListener={() => createOptions(channel)}
                                                img={logo}
                                                status={!!isActive} key={id}/>
                                        </div>
                                    );
                                })
                            }

                        </div>
                    </div>

                </div>
            </div>
        </React.Fragment>
    );
};


export default Partners;