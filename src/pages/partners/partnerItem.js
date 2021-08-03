import React from 'react';
import classNames from "classnames";

const PartnerItem = ({img, title, subTitle, status, onClickListener}) => {

    let _img = img && (img.startsWith("http") ? img : "https://mw.channels256.com/" + img)

    return (
        <div className="d-flex  flex-row justify-content-center">
            <img src={_img} width="70" height="60" className="rounded me-2" alt={title}/>
            <div className="flex-grow-1 d-flex flex-column align-items-sm-start justify-content-center">
                <p className="my-1"><strong>{title}</strong></p>
                <button onClick={e => onClickListener ? onClickListener() : ""} title={title}
                        className={classNames("btn btn-sm", {
                            "btn-outline-primary": !!status,
                            "btn-outline-danger": !status
                        })}>
                    {status ? "Active" : "Activate?"}
                </button>
            </div>
        </div>
    );
};

export default PartnerItem;