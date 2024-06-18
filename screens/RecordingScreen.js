import React, { useState, useContext } from 'react';
import { Button, View, StyleSheet, Text } from 'react-native';
import { Audio } from 'expo-av';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RecordingContext } from '../context/RecordingContext';
import InputItem from '../components/InputItem';
import PlayItem from '../components/PlayItem';

export default function RecordingScreen() {
  const { addRecording } = useContext(RecordingContext);
  const [recording, setRecording] = useState(null);

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
      addRecording({ id: Date.now(), uri });
      setRecording(null); // Remettre à null l'état d'enregistrement après l'arrêt
    } catch (err) {
      console.error('Failed to stop recording', err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.pageTitle}>Recording</Text>
      <InputItem />

      <PlayItem
        title={recording ? 'Stop Recording' : 'Start Recording'}
        onPress={recording ? stopRecording : startRecording}
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
