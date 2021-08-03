import Http, {apiUrl} from "../../../services/http";
import {DateTime} from "luxon";
import _ from "lodash";

export const fetchData = async (to, from) => {
    let {data} = await Http.post(apiUrl + "vod/report/",{to,from})
    console.log("Vod", data);
    return data;
}


export function getGraphObjects(data) {
    if (!Array.isArray(data) || !data.length)
        return;
    const result = {};
    const generated = {};
    let genres = {};
    let categories = {};


    //get genres
    const generatedGenres = _.groupBy(data, function (obj) {
        return obj['genre'];
    });
    generated['genres'] = generatedGenres;
    genres = Object.getOwnPropertyNames(generatedGenres);
    result['genres'] = _.mapValues(generatedGenres, function (val) {
        return val.length || 0;
    })

    //categories
    const generatedCategories = _.groupBy(data, function (obj) {
        return obj['category'];
    });
    generated['category'] = generatedCategories;
    categories = Object.getOwnPropertyNames(generatedCategories);
    result['category'] = _.mapValues(generatedCategories, function (val) {
        return val.length || 0;
    })

    //TIME OF THE DAY
    const generatedFinished = _.countBy(data, function (obj) {
        return obj['Finished'];
    });
    generated['finished'] = _.groupBy(data, function (obj) {
        return obj['Finished'];
    });
    result['finished'] = _.mapValues(generatedFinished, function (val) {
        return val;
    })

    //TIME OF THE DAY
    const generatedTimes = _.countBy(data, function (obj) {
        return obj['timeOfDay'].toUpperCase();
    });
    generated['times'] = _.groupBy(data, function (obj) {
        return obj['timeOfDay'].toUpperCase();
    });
    result['times'] = _.mapValues(generatedTimes, function (val) {
        return val;
    })

    //DAY OF the week
    const generatedDays = _.countBy(data, function (obj) {
        return obj['day'].toUpperCase();
    });
    generated['days'] = _.groupBy(data, function (obj) {
        return obj['day'].toUpperCase();
    });
    result['days'] = _.mapValues(generatedDays, function (val) {
        return val;
    })

    //HOUR OF THE DAY OF the week
    const generatedHours = _.countBy(data, function (obj) {
        return DateTime.fromISO(obj['lastSeen'], {zone: "utc"}).toFormat("ha");
    });
    generated['hours'] = _.groupBy(data, function (obj) {
        return DateTime.fromISO(obj['lastSeen'], {zone: "utc"}).toFormat("ha");
    });
    result['hours'] = _.mapValues(generatedHours, function (val) {
        return val;
    })

    //VENDOR STATS
    let vendorGen = function (obj) {
        if (["077", "078", "076", "072"].includes(obj['Profile'].slice(0, 3))) return "MTN";
        else if (["075", "070", "072"].includes(obj['Profile'].slice(0, 3))) return "Airtel";
        else if (["079"].includes(obj['Profile'].slice(0, 3))) return "Africell";
        else if (obj['Profile'].includes("@")) return "Email";
        return "N/A";
    };
    const generatedVendors = _.countBy(data, vendorGen);
    generated['vendors'] = _.groupBy(data, vendorGen);
    result['vendors'] = _.mapValues(generatedVendors, function (val) {
        return val;
    })

    const generatedCustomers = _.countBy(data, function (obj) {
        return obj['Profile']
    });
    generated['customers'] = _.groupBy(data, function (obj) {
        return obj['Profile']
    });
    result['customers'] = _(_.mapValues(generatedCustomers, function (val) {
        return val;
    })).toPairs()
        .orderBy([1], ['desc'])
        .slice(0, 5)
        .fromPairs()
        .value();

    console.log(result);
    window.result = result;
    window.generated = generated;
    return result;
}