import React from 'react';
import { SafeAreaView, Text, StyleSheet, TextInput, Button, View } from 'react-native';

export default function LoginScreen({ navigation }) {
    const [ipAddress, setIpAddress] = React.useState('');
    const [port, setPort] = React.useState('');

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.pageTitle}>Login</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Adresse IP"
                    value={ipAddress}
                    onChangeText={setIpAddress}
                    keyboardType="default"
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
                onPress={() => { navigation.navigate('Main', { screen: 'Recording' }) }}
            />
        </SafeAreaView>
    );
}

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
