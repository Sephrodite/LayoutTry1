import { StyleSheet, View, Text, TextInput, Modal } from "react-native";
import { useState } from 'react';
import { PieChart } from "react-native-gifted-charts";


function Meditate() {
    const pieData = [
        { value: 54, color: '#177AD5', text: '54%' },
        { value: 40, color: '#79D2DE', text: '30%' },
        { value: 20, color: '#ED6665', text: '26%' },
    ];

    return (
        <View style={styles.inputContainer}>
            <PieChart
                donut
                textColor="black"
                radius={160}
                textSize={10}
                innerRadius={130}
                data={pieData}
                centerLabelComponent={() => {
                    return <Text style={{ fontSize: 20 }}>Breathe in</Text>;
                }}
            />
            <Text>Meditation here</Text>
        </View>
    )
}

export default Meditate;

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    }
})