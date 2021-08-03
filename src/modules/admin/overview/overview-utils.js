import DateDiff from "date-diff";

export const getDateDifference = (endDate, startDate) => {
    console.log("End", endDate, "Start", startDate)
    let dateDiff = new DateDiff(endDate, startDate);
    let seconds = dateDiff.seconds();
    console.log("Seconds", seconds);
    return Math.abs(seconds);
}