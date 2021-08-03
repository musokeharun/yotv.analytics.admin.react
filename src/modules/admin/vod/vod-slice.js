import {createSlice} from "@reduxjs/toolkit";

let initialState = {
    data: {},
};

const vodSlice = createSlice({
    initialState,
    name: "vod",
    reducers: {
        save: (state, action) => {
            state.data = action.payload;
        },
    }
})

export const {save} = vodSlice.actions;
export default vodSlice.reducer;