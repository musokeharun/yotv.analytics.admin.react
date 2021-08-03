import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    user: null,
}


export const authSlice = createSlice({
    name: "Auth",
    initialState,
    reducers: {
        login: (state,action) => {
            state.user  = action.payload;
        },
    },
    extraReducers: (builder) => {

    },
})

//THUNKS BY HAND
// export const incrementIfOdd = (amount) => (dispatch, getState) => {
//     const currentValue = getUser(getState());
//     if (currentValue % 2 === 1) {
//         dispatch(alter(amount));
//     }
// };

export const getUser = (state) => state.auth['user'];
export const {login} = authSlice.actions;
export default authSlice.reducer;