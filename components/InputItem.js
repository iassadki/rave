import React, { useState } from "react";
import { StyleSheet, TextInput, View, TouchableOpacity, Text } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function InputItem({ record, setRecordName }) {
    // old props : searchPhrase, setSearchPhrase, setSearchOption

    return (
        <View style={styles.container}>
            <View style={styles.searchBar}>
                {/* Search Icon */}
                {/* <Feather
                    name="search"
                    size={20}
                    color="black"
                    style={{ marginLeft: 1 }}
                /> */}
                {/* Input field */}
                <TextInput
                    style={styles.input}
                    placeholder="Name of your recording"
                    value={record}
                    onChangeText={setRecordName}
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

