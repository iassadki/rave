import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function PlayItem({ recordTitle, onPress }) {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <FontAwesome name="microphone" size={25} color="white" />
            <Text style={styles.recordTitle}>{recordTitle}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        margin: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#424242',
        padding: 15,
        borderRadius: 15,
    },
    recordTitle: {
        marginLeft: 10,
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
    },
});