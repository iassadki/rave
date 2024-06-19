import React, { useContext } from 'react';
import { SafeAreaView, ScrollView, Text, StyleSheet, View } from 'react-native';
import RecordItem from '../components/RecordItem';
import { RecordingContext } from '../context/RecordingContext';

export default function RaveScreen({ navigation }) {
    const { recordings, deleteRecording } = useContext(RecordingContext);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.pageTitle}>Rave steps</Text>
            <ScrollView>
                <Text style={styles.stepTitle}>Step 1 : Choose the audio</Text>
                <View>
                    {recordings.map(record => (
                        <RecordItem key={record.id} record={record} deleteRecording={deleteRecording} />
                    ))}
                </View>
                <Text style={styles.stepTitle}>Step 2 : Instrument model selection</Text>
                <Text style={styles.stepTitle}>Step 3 : List of your converted audios</Text>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#161719',
        padding: 10,
    },
    pageTitle: {
        marginTop: 40,
        marginLeft: 10,
        fontSize: 25,
        fontWeight: 'bold',
        marginVertical: 10,
        color: 'white',
    },
    stepTitle: {
        marginTop: 40,
        marginLeft: 10,
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
        color: 'white',
    },
});
