import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {createToast, createToastLoading} from "../../../utils/toasts";
import Http from "../../../services/http";

const initialState = {
    realtime: {},
    dashboard: {}
};

let toastLoading = createToastLoading();

export const fetchRealtime = createAsyncThunk(
    "overview/realtime",
    async () => {
        let {data} = await Http.get("partner/realtime?list=1");
        // console.log(data);
        return data;
    })

export const fetchDashBoard = () => createAsyncThunk("overview/dashboard", async () => {

})

let overviewSlice = createSlice({
    name: "overview",
    initialState,
    reducers: {
        concat: state => {
            console.log(state);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRealtime.pending, (state) => {
                toastLoading.fire({
                    title: "Retrieving Data",
                }).then(r => console.log("Toasted"))
            })
            .addCase(fetchRealtime.fulfilled, (state, action) => {
                state.realtime = action.payload;
                toastLoading.close();
            })
            .addCase(fetchRealtime.rejected, state => {
                createToast().fire({
                    title: "Could not fetch data",
                    icon: "error"
                }).then((e) => console.error("Toasted", e))
            });
    }
});

export const selectRealtime = (state) => state.overview.realtime;
export default overviewSlice.reducer;