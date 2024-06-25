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
        // Ajouter un enregistrement à la liste
        addRecording: (state, action) => {
            state.recordings.push(action.payload);
        },
        // Supprimer un enregistrement de la liste
        deleteRecording: (state, action) => {
            state.recordings = state.recordings.filter(record => record.name !== action.payload.id);
        },
    },
});

export const { addRecording, deleteRecording } = recordingsSlice.actions;
export default recordingsSlice.reducer;
