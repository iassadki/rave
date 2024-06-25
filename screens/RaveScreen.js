import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, Text, StyleSheet, View, FlatList, Button, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import RecordItem from '../components/RecordItem';
import { deleteRecording as deleteRecordingAction, playRecording } from '../slices/recordingsSlice';
import * as FileSystem from 'expo-file-system';

export default function RaveScreen({ navigation }) {
    const dispatch = useDispatch(); 
    const recordings = useSelector((state) => state.recordings.recordings);
    const [models, setModels] = useState([]);
    const [isDownloading, setIsDownloading] = useState(false);

    // Afficher les modeles
    useEffect(() => {
        fetchModels();
    }, []);

    // Supprimer un enregistrement
    const handleDeleteRecording = async (recordName) => {
        try {
            // Supprimer le fichier audio
            await FileSystem.deleteAsync(`${FileSystem.documentDirectory}recordings/${recordName}.m4a`);
            dispatch(deleteRecordingAction(recordName)); // Supprimer l'enregistrement du store
        } catch (error) {
            console.error('Error deleting recording:', error);
        }
    };

    // Récuperer les modeles
    const fetchModels = async () => {
        try {
            const response = await fetch(`http://192.168.1.48:8000/getmodels`);
            if (!response.ok) {
                throw new Error(`HTTP status ${response.status}`);
            }
            const data = await response.json();
            setModels(data.models);
            console.log(data.models);
        } catch (error) {
            console.error('Error fetching models:', error);
        }
    };

    // Télécharger un modele
    const downloadModel = async (modelName) => {
        setIsDownloading(true);
        try {
            // creer un telechargement 
            const downloadResumable = FileSystem.createDownloadResumable(
                `http://192.168.1.48:8000/download?model=${modelName}`,
                `${FileSystem.documentDirectory}${modelName}.model`
            );

            // telecharger le modele
            const { uri } = await downloadResumable.downloadAsync();
            Alert.alert('Download complete', `Model downloaded to ${uri}`);
        } catch (error) {
            console.error('Error downloading model:', error);
            Alert.alert('Download failed', 'Failed to download model');
        } finally {
            // fin du telechargement
            setIsDownloading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Text style={styles.pageTitle}>Rave steps</Text>
                <Text style={styles.stepTitle}>Étape 1 : Choisissez l'audio</Text>
                {/* Affichage des i */}
                <FlatList
                    data={recordings}
                    keyExtractor={(item) => item.name}
                    renderItem={({ item }) => (
                        <RecordItem record={item} deleteRecording={handleDeleteRecording} />
                    )}
                />
                <Text style={styles.stepTitle}>Étape 2 : Sélection du modèle d'instrument</Text>
                <FlatList
                    data={models}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.modelItem}>
                            <Text>{item}</Text>
                            <Button title="Download" onPress={() => downloadModel(item)} disabled={isDownloading} />
                        </View>
                    )}
                />
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
    modelItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});
