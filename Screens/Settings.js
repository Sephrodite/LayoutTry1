import { StyleSheet, View, Text, TextInput, Modal } from "react-native";
import { useState } from 'react';

function Settings() {
    const [enteredName, setEnteredName] = useState("")

    function nameInputHandler(enteredText) {
        setEnteredName(enteredText);
    }

    return (
        <View>
            <Text>Profile</Text>
            <Text>Name</Text>
            <TextInput
                style={styles.inputContainer}
                placeholder="Set your Name here"
                onChangeText={nameInputHandler}
            />
        </View>
    )
}

export default Settings;

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: "#cccccc",
    }
})