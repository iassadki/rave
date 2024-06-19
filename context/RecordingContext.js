// RecordingContext.js
import React, { createContext, useState } from 'react';

export const RecordingContext = createContext();

export const RecordingProvider = ({ children }) => {
    const [recordings, setRecordings] = useState([]);

    const addRecording = (record) => {
        setRecordings([...recordings, { ...record, id: Date.now().toString() }]);
    };

    return (
        <RecordingContext.Provider value={{ recordings, addRecording }}>
            {children}
        </RecordingContext.Provider>
    );
};
