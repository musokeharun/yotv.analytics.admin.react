import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {createToast, createToastLoading} from "../../utils/toasts";
import Http from "../../services/http";
import {download} from "../../utils/utils";

const initialState = {
    list: [],
};

let toastLoading = createToastLoading();

export const fetchPartners = createAsyncThunk(
    "partners/list",
    async () => {
        let {data} = await Http.post("admin/partner/list");
        // console.log(data);
        return data;
    })

export const savePartner = createAsyncThunk(
    "partner/create",
    async ({name, logo, isActive}) => {
        let {data} = await Http.post("admin/partner/save", {name, logo, isActive});
        // console.log(data);
        return data;
    })

export const createToken = createAsyncThunk(
    "partner/token",
    async ({partner, expiry, name}) => {
        let {data} = await Http.post("admin/partner/token", {partner, expiry});
        // console.log(data);
        return {data, name};
    })


let partnerSlice = createSlice({
    name: "partner",
    initialState,
    reducers: {
        concat: state => {
            console.log(state);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPartners.pending, (state) => {
                toastLoading.fire({
                    title: "Retrieving Partners",
                }).then(r => console.log("Toasted"))
            })
            .addCase(fetchPartners.fulfilled, (state, action) => {
                state.list = action.payload;
                toastLoading.close();
            })
            .addCase(fetchPartners.rejected, state => {
                createToast().fire({
                    title: "Could not fetch data",
                    icon: "error"
                }).then((e) => console.error("Toasted", e))
            })
            .addCase(createToken.fulfilled, (state, action) => {
                download(`${action.payload.name.replace(" ", "")}.yotv.txt`, action.payload.data)
            });
    }
});

export const selectPartners = (state) => state.partner.list;
export default partnerSlice.reducer;