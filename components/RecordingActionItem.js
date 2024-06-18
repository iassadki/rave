import React, { useState, useEffect } from 'react';
import { Button, View, StyleSheet, Text } from 'react-native';
import { Audio } from 'expo-av';

export default function RecordingActionItem() {
  const [recording, setRecording] = useState();
  const [recordingUri, setRecordingUri] = useState();
  const [isRecording, setIsRecording] = useState(false);
  const [permissionResponse, requestPermission] = Audio.usePermissions();

  async function startRecording() {
    try {
      if (permissionResponse.status !== 'granted') {
        await requestPermission();
      }
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        allowsRecordingIOS: true
      });
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      setIsRecording(true);
    } catch (err) {
      console.error(err);
    }
  }

  async function stopRecording() {
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false
    });
    const uri = recording.getURI();
    setRecordingUri(uri);
    setRecording(undefined);
    setIsRecording(false);
  }

  return (
    <View style={styles.container}>
      <Button
        title={isRecording ? "Stop Recording" : "Start Recording"}
        onPress={isRecording ? stopRecording : startRecording}
      />
      {recordingUri && (
        <Button
          title="Play Recording"
          onPress={async () => {
            const { sound } = await Audio.Sound.createAsync({ uri: recordingUri });
            await sound.playAsync();
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({

});