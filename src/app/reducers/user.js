import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    id: 0,
    firstName: "",
    lastName: "",
    userUid: "",
    hiringDate: 0,
    accessDate: 0,
    speciality: 0,
    grade: 0,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            debugger
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions

export const selectUser = (state) => state.userReducer;
export const selectUserID = (state) => state.userReducer.id;
export const selectUserName = (state) => `${state.userReducer.firstName} ${state.userReducer.lastName}`;

export default userSlice.reducer