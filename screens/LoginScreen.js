import React, { useState } from 'react';
import { SafeAreaView, Text, StyleSheet, TextInput, Button, View } from 'react-native';
import { Snackbar } from 'react-native-paper';

const LoginScreen = ({ navigation }) => {
    const [ipAddress, setIpAddress] = useState('192.168.1.48'); // Adresse IP du serveur
    const [port, setPort] = useState('8000'); // Port du serveur
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch(`http://${ipAddress}:${port}/`);
            if (response.ok) {
                setSnackbarMessage('Connexion réussie');
                setSnackbarVisible(true);
                navigation.navigate('Main', { screen: 'Recording' });
            } else {
                setSnackbarMessage('Identifiants incorrects');
                setSnackbarVisible(true);
            }
        } catch (error) {
            console.error('Erreur lors de la connexion au serveur:', error);
            setSnackbarMessage('Erreur de connexion au serveur');
            setSnackbarVisible(true);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.pageTitle}>Login</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Adresse IP"
                    value={ipAddress}
                    onChangeText={setIpAddress}
                    keyboardType="numeric"
                    placeholderTextColor="black"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Port"
                    value={port}
                    onChangeText={setPort}
                    keyboardType="numeric"
                    placeholderTextColor="black"
                />
            </View>
            <Button
                title="Se connecter"
                onPress={handleLogin}
            />
            <Snackbar
                visible={snackbarVisible}
                onDismiss={() => setSnackbarVisible(false)}
                duration={Snackbar.DURATION_SHORT}
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
            >
                {snackbarMessage}
            </Snackbar>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#161719',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    pageTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        marginVertical: 10,
        color: 'white',
    },
    inputContainer: {
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        marginVertical: 10,
        paddingHorizontal: 10,
        fontSize: 18,
        color: 'black',
    },
});

export default LoginScreen;
