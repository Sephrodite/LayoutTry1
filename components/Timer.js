import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { PieChart } from "react-native-gifted-charts";

function Timer(props) {
    const pieData = [
        { value: 54, color: '#177AD5' },
        { value: 40, color: '#79D2DE' },
        { value: 20, color: '#ED6665' },
    ];

    const [restTime, setRestTime] = useState(5)
    const [restLeft, setRestLeft] = useState()

    const [workTime, setWorkTime] = useState(10)
    const [workLeft, setWorkLeft] = useState()

    const [roundsNum, setRoundsNum] = useState(2)
    const [roundsLeft, setRoundsLeft] = useState()

    const [isRunning, setIsRunning] = useState(true)

    const set = () => {
        setRoundsLeft(roundsNum)
        setWorkLeft(workTime)
        setRestLeft(restTime)
        setIsRunning(true)
    }

    // Prepend `0` for one digit numbers. For that the number has to be
    // converted to string, as numbers don't have length method
    const padTime = time => {
        return String(time).length === 1 ? `0${time}` : `${time}`;
    };

    const format = time => {
        // Convert seconds into minutes and take the whole part
        const minutes = Math.floor(time / 60);

        // Get the seconds left after converting minutes
        const seconds = time % 60;

        //Return combined values as string in format mm:ss
        return `${minutes}:${padTime(seconds)}`;
    };


    useEffect(() => {
        let timer = null;
        let timer1 = null;

        if (isRunning && roundsLeft > 0) {

            if (workLeft > 0) {
                timer = setTimeout(() => {
                    setWorkLeft(workLeft - 1);
                }, 1000);
            }
            else if (restLeft > 0) {
                timer1 = setTimeout(() => {
                    setRestLeft(restLeft - 1);
                }, 1000);
            }
            else {
                if (roundsLeft > 1) {
                    // Restart the countdown for the next repetition
                    setRoundsLeft(roundsLeft - 1);
                    setWorkLeft(parseInt(workTime));
                    setRestLeft(parseInt(restTime));
                }
                else {
                    // Stop the timer when all repetitions are done
                    setIsRunning(false);
                }
            }
        }

        // Clean up the timer when the component unmounts or updates
        return () => clearTimeout(timer, timer1);
    }, [isRunning, roundsLeft, workLeft, restLeft]);

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
                    return <Text style={{ fontSize: 30 }}>{format(counter)}</Text>;
                }}
            />
            <Text>{roundsLeft} is roundsLeft</Text>
            <Text>{workLeft} is workLeft</Text>
            <Text>{restLeft} is restLeft</Text>
            <Button title={'set'} onPress={set} />
        </View>
    )
}

export default Timer;
