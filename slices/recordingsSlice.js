// recordingsSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    recordings: [],
    currentSound: null,
};

const recordingsSlice = createSlice({
    name: 'recordings',
    initialState,
    reducers: {
        addRecording: (state, action) => {
            state.recordings.push(action.payload);
        },
        deleteRecording: (state, action) => {
            state.recordings = state.recordings.filter(record => record.name !== action.payload.id);
        },
    },
});

export const { addRecording, deleteRecording } = recordingsSlice.actions;
export default recordingsSlice.reducer;
