import React, {useEffect, useState} from 'react';
import {fetchData} from "./vod-api";
import PageHeader from "../../../layout/header/pageHeader";
import {DateTime} from "luxon";

const Vod = () => {
    let now = DateTime.now();
    console.log("Now", now.toSQL());
    let last12Hrs = now.minus({hours: 12});
    console.log("Before", last12Hrs.toSQL());
    const [to, setTo] = useState(now.toMillis());
    const [from, setFrom] = useState(last12Hrs.toMillis());


    useEffect(async () => {
        let data = await fetchData(from, to);
    }, [])


    return (
        <>

            <PageHeader label={"Vod Illustrations"}/>

        </>
    );
};

export default Vod;