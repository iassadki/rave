import React, { useState, useContext } from 'react';
import { Alert, Text, StyleSheet, SafeAreaView } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { Audio } from 'expo-av';
import { useDispatch, useSelector } from 'react-redux';
import InputItem from '../components/InputItem';
import RecordingItem from '../components/RecordingItem';
// import { RecordingContext } from '../context/RecordingContext'; // OLD
import { addRecording } from '../slices/recordingsSlice'; // NEW

export default function RecordingScreen() {
  // const {addRecording} = useContext(RecordingContext); // OLD
  const dispatch = useDispatch();
  const [recording, setRecording] = useState(null);
  const [recordTitle, setRecordTitle] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const record = useSelector((state) => state.recordings.recordings);

  // afficher tout les fichiers avec console.log, afficher que les noms
  console.log("record.name : ", record);
  console.log("record.name : ", record[0].name);
  console.log("record.name : ", record.name);

  const startRecording = async () => {
    // Condition si l'utilisateur a ou non ecrit un nom pour l'enregistrement
    // if (!recordTitle.trim()) {
    //   Alert.alert('Please enter a title for the recording!');
    //   return;
    // }
    try {
      const permission = await Audio.requestPermissionsAsync();
      // Vérification de l'autorisation d'accès au microphone
      if (permission.status === 'granted') {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
        // Début de l'enregistrement
        const { recording } = await Audio.Recording.createAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );
        setRecording(recording);
        setIsRecording(true);
        await recording.startAsync(); // Démarrer l'enregistrement
      } else {
        alert('Permission to access microphone is required!');
      }
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const stopRecording = async () => {
    try {
      await recording.stopAndUnloadAsync(); // Arrêter l'enregistrement
      const uri = recording.getURI();
      console.log(uri);
      console.log('Titre du recording : ', recordTitle);
      setRecording(null);
      setIsRecording(false);

      // Check if the recordings folder exists, create it if it doesn't
      const recordingsFolder = `${FileSystem.documentDirectory}recordings`;
      const folderInfo = await FileSystem.getInfoAsync(recordingsFolder);
      if (!folderInfo.exists) {
        await FileSystem.makeDirectoryAsync(recordingsFolder, { intermediates: true });
      }

      // Move the recording to the recordings folder
      if (recordTitle.trim()) {
        const newUri = `${recordingsFolder}/${recordTitle}.m4a`;
        await FileSystem.moveAsync({
          from: uri,
          to: newUri,
        });
        dispatch(addRecording({ name: recordTitle, uri: newUri })); // Ajouter l'enregistrement à la liste avec dispatch
      }
      setRecordTitle(''); // Réinitialiser le titre de l'enregistrement
    } catch (err) {
      console.error('Failed to stop recording', err);
    }
    setRecording(null); // Réinitialiser l'état de l'enregistrement
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
