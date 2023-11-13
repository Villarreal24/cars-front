import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    refresh: false,
    idSelected: null,
}

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setRefresh(state, action) {
            state.refresh = action.payload
        },
        setIdSeleted(state, action) {
            state.idSelected = action.payload
        }
    }
});

export const {
    setRefresh,
    setIdSeleted,
} = adminSlice.actions;
export default adminSlice.reducer;
