import React, { useState, useContext } from 'react';
import { Text, StyleSheet, SafeAreaView } from 'react-native';
import { Audio } from 'expo-av';
import { RecordingContext } from '../context/RecordingContext';
import InputItem from '../components/InputItem';
import RecordingItem from '../components/RecordingItem';

export default function RecordingScreen() {
  const { addRecording } = useContext(RecordingContext);
  const [recording, setRecording] = useState(null);
  const [recordTitle, setRecordTitle] = useState('');

  const startRecording = async () => {
    try {
      const permission = await Audio.requestPermissionsAsync();
      if (permission.status === 'granted') {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
        const { recording } = await Audio.Recording.createAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );
        setRecording(recording);
        await recording.startAsync();
      } else {
        alert('Permission to access microphone is required!');
      }
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const stopRecording = async () => {
    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      addRecording({ name: recordTitle, uri });
      setRecording(null);
      setRecordTitle('');
    } catch (err) {
      console.error('Failed to stop recording', err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.pageTitle}>Recording</Text>

      <InputItem recordTitle={recordTitle} setRecordTitle={setRecordTitle} />

      <RecordingItem
        startRecording={startRecording}
        stopRecording={stopRecording}
        isRecording={!!recording}
      />
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
});
