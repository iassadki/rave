import React, { createContext, useState } from 'react';

export const RecordingContext = createContext();

export const RecordingProvider = ({ children }) => {
    const [recordings, setRecordings] = useState([]);

    const addRecording = (recording) => {
        setRecordings([...recordings, recording]);
    };

    return (
        <RecordingContext.Provider value={{ recordings, addRecording }}>
            {children}
        </RecordingContext.Provider>
    );
};
