import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

const InputItem = ({ recordTitle, setRecordTitle }) => {

    // console.log le titre du record
    console.log(recordTitle);

    return (
        <View style={styles.container}>
            <View style={styles.searchBar}>
                <TextInput
                    style={styles.input}
                    placeholder="Name of your recording"
                    value={recordTitle}
                    onChangeText={text => setRecordTitle(text)}  // Met à jour recordTitle avec le texte saisi
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 15,
        marginTop: 40,
        marginBottom: 20,
        justifyContent: "flex-start",
        alignItems: "center",
        width: "90%",
    },
    searchBar: {
        padding: 15,
        flexDirection: "row",
        width: "100%",
        backgroundColor: "#d9dbda",
        borderRadius: 15,
        alignItems: "center",
    },
    input: {
        fontSize: 20,
        marginLeft: 10,
        width: "70%",
    },
});

export default InputItem;
