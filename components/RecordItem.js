import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const RecordItem = ({ record }) => {
    return (
        <TouchableOpacity style={styles.record}>
            <View style={styles.recordItem}>
                <Image style={styles.image} source={require('../assets/microphone.png')} />
                <Text style={styles.recordTitle}>{record.name}</Text>
                <View style={styles.recordButtonsGrid}>
                    <TouchableOpacity style={styles.button}>
                        <FontAwesome name="play" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
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
    image: {
        width: 30,
        height: 30,
        margin: 15,
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
