import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {createToast, createToastLoading} from "../../utils/toasts";
import Http from "../../services/http";

const initialState = {
    list: [],
};

let toastLoading = createToastLoading();

export const fetchUsers = createAsyncThunk(
    "users/list",
    async () => {
        let {data} = await Http.post("admin/users/list");
        // console.log(data);
        return data;
    })

export const saveUser = createAsyncThunk(
    "users/save",
    async ({name, logo, isActive}) => {
        let {data} = await Http.post("admin/users/save", {name, logo, isActive});
        // console.log(data);
        return data;
    })

let usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        concat: state => {
            console.log(state);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                toastLoading.fire({
                    title: "Retrieving Users",
                }).then(r => console.log("Toasted"))
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.list = action.payload;
                toastLoading.close();
            })
            .addCase(fetchUsers.rejected, state => {
                createToast().fire({
                    title: "Could not fetch data",
                    icon: "error"
                }).then((e) => console.error("Toasted", e))
            })
    }
});

export const selectUsers = (state) => state.users.list;
export default usersSlice.reducer;