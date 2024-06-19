import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const RecordingItem = ({ startRecording, stopRecording, isRecording }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={isRecording ? stopRecording : startRecording}>
                <FontAwesome name={isRecording ? 'stop' : 'microphone'} size={25} color="white" />
                <Text style={styles.buttonText}>{isRecording ? 'Stop Recording' : 'Start Recording'}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 15,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#424242',
        padding: 15,
        borderRadius: 15,
        width: '70%',
    },
    buttonText: {
        marginLeft: 10,
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
    },
});

export default RecordingItem;
