import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { CheckBox } from 'react-native-elements';

const RecordItem = ({ record, playRecording, pauseRecording, deleteRecording }) => {
    const [checked, setChecked] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlayPause = async () => {
        if (isPlaying) {
            await pauseRecording();
        } else {
            await playRecording(record.uri);
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <TouchableOpacity style={styles.record}>
            <View style={styles.recordItem}>
                <CheckBox
                    checked={checked}
                    onPress={() => setChecked(!checked)}
                    checkedColor="white"
                    uncheckedColor="white"
                />
                <Text style={styles.recordTitle}>{record.name}</Text>
                <View style={styles.recordButtonsGrid}>
                    <TouchableOpacity style={styles.button} onPress={handlePlayPause}>
                        <FontAwesome name={isPlaying ? "pause" : "play"} size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => deleteRecording(record.id)}>
                        <FontAwesome name="trash" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    record: {
        margin: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#424242',
        marginVertical: 5,
        borderRadius: 5,
    },
    recordTitle: {
        fontSize: 15,
        flex: 1,
        marginLeft: 10,
        fontWeight: '500',
        color: '#FFFFFF',
    },
    recordButtonsGrid: {
        flexDirection: 'row',
    },
    button: {
        backgroundColor: '#424242',
        padding: 10,
        margin: 10,
        borderRadius: 5,
    },
    recordItem: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'space-between',
    },
});

export default RecordItem;
