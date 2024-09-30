import { createReducer } from "@reduxjs/toolkit";

// DataReducer using builder callback notation
export const DataReducer = createReducer({}, (builder) => {
    builder
        .addCase('DATA_REQUEST', (state) => {
            state.loading = true;
        })
        .addCase('DATA_SUCCESS', (state, action) => {
            state.loading = false;
            state.allTickets = action.payload.tickets;
            state.allUser = action.payload.users;
        })
        .addCase('DATA_FAILURE', (state) => {
            state.loading = false;
            state.allTickets = [];
            state.allUser = [];
        });
});

// SelectDataReducer using builder callback notation
export const SelectDataReducer = createReducer({}, (builder) => {
    builder
        .addCase('SELECT_DATA_REQUEST', (state) => {
            state.loading = true;
            state.selectedData = [];
        })
        .addCase('SELECT_DATA_SUCCESS', (state, action) => {
            state.loading = false;
            state.selectedData = action.payload.selectedData;
            state.user = action.payload.user;
        })
        .addCase('SELECT_DATA_FAILURE', (state, action) => {
            state.loading = false;
            state.selectedData = [];
            state.message = action.payload.message;
        });
});
