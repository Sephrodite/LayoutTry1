import { StyleSheet, View, Text, TextInput, Modal } from "react-native";
import { useState, useEffect } from 'react';
import { PieChart } from "react-native-gifted-charts";
import { Ionicons } from '@expo/vector-icons';

function Pomodoro() {
    const pieData = [
        { value: 54, color: '#177AD5' },
        { value: 40, color: '#79D2DE' },
        { value: 20, color: '#ED6665' },
    ];
    const [timerCount, setTimer] = useState(60)

    useEffect(() => {
        let interval = setInterval(() => {
            setTimer(lastTimerCount => {
                if (lastTimerCount == 0) {
                    <Ionicons name="checkmark-circle-outline" size={33} color={color} />
                } else {
                    lastTimerCount <= 1 && clearInterval(interval)
                    return lastTimerCount - 1
                }
            })
        }, 1000) 
        return () => clearInterval(interval)
    }, []);

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
                    return <Text style={{ fontSize: 30 }}>{timerCount}</Text>;
                }}
            />
            <Text>Pomodoro here</Text>
        </View>
    )
}

export default Pomodoro;

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    }
})