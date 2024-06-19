import React, { createContext, useState } from 'react';

export const RecordingContext = createContext();

export const RecordingProvider = ({ children }) => {
    const [recordings, setRecordings] = useState([]);

    const addRecording = (record) => {
        setRecordings([...recordings, { ...record, id: Date.now().toString() }]);
    };

    const deleteRecording = (id) => {
        setRecordings(recordings.filter(record => record.id !== id));
    };

    return (
        <RecordingContext.Provider value={{ recordings, addRecording, deleteRecording }}>
            {children}
        </RecordingContext.Provider>
    );
};
