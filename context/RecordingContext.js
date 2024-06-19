import React, { createContext, useState } from 'react';
import { Audio } from 'expo-av';

export const RecordingContext = createContext();

export const RecordingProvider = ({ children }) => {
    const [recordings, setRecordings] = useState([]);
    const [currentSound, setCurrentSound] = useState(null);

    const addRecording = (record) => {
        setRecordings([...recordings, { ...record, id: Date.now().toString() }]);
    };

    const deleteRecording = (id) => {
        setRecordings(recordings.filter(record => record.id !== id));
    };

    const playRecording = async (uri) => {
        if (currentSound) {
            await currentSound.unloadAsync();
        }
        const { sound } = await Audio.Sound.createAsync({ uri });
        setCurrentSound(sound);
        await sound.playAsync();
    };

    const pauseRecording = async () => {
        if (currentSound) {
            await currentSound.pauseAsync();
        }
    };

    const stopRecording = async () => {
        if (currentSound) {
            await currentSound.stopAsync();
            await currentSound.unloadAsync();
            setCurrentSound(null);
        }
    };

    return (
        <RecordingContext.Provider value={{ recordings, addRecording, playRecording, pauseRecording, stopRecording, deleteRecording }}>
            {children}
        </RecordingContext.Provider>
    );
};
