import { StyleSheet, View, Text, Button, Modal } from "react-native";
import { useState, useEffect } from 'react';
import { PieChart } from "react-native-gifted-charts";
import React from "react";
import Slider from "react-native-sliders";

const pieData = [
    { value: 54, color: '#177AD5' },
    { value: 40, color: '#79D2DE' },
    { value: 20, color: '#ED6665' },
];

const [restTime, setRestTime] = useState()
    const [restLeft, setRestLeft] = useState()

    const [workTime, setWorkTime] = useState()
    const [workLeft, setWorkLeft] = useState()

    const [roundsNum, setRoundsNum] = useState()
    const [roundsLeft, setRoundsLeft] = useState()

    const [isRunning, setIsRunning] = useState(false)

    

function Timer() {
    
/*     const [restTime, setRestTime] = useState(5)
    const [restLeft, setRestLeft] = useState()

    const [workTime, setWorkTime] = useState(10)
    const [workLeft, setWorkLeft] = useState()

    const [roundsNum, setRoundsNum] = useState(2)
    const [roundsLeft, setRoundsLeft] = useState()

    const [isRunning, setIsRunning] = useState(true) */

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
        <Modal>
        <View style={styles.timerContainer}>
            <PieChart
                donut
                textColor="black"
                radius={160}
                textSize={10}
                innerRadius={130}
                data={pieData}
                centerLabelComponent={() => {
                    return <Text style={{ fontSize: 30 }}>{workLeft}</Text>;
                }}
            />
            <Text>{roundsLeft} is roundsLeft</Text>
            <Text>{workLeft} is workLeft</Text>
            <Text>{restLeft} is restLeft</Text>
            <Button title={'set'} onPress={set} />
        </View>
        </Modal>
    )
}

function Sliders() {
    /* const [restTime, setRestTime] = useState()
    const [workTime, setWorkTime] = useState()
    const [roundsNum, setRoundsNum] = useState() */

    return (
        <View style={styles.slider}>
            <View>
                <Text>Work: {workTime} minutes</Text>
                <Slider
                    minimumValue={1}
                    maximumValue={90}
                    step={1}
                    value={workTime}
                    onValueChange={(value) => setWorkTime(value)}
                />
            </View>
            <View>
                <Text>Rest: {restTime} minutes</Text>
                <Slider
                    minimumValue={1}
                    maximumValue={30}
                    step={1}
                    value={restTime}
                    onValueChange={(value) => setRestTime(value)}
                />
            </View>
            <View>
                <Text>Rounds: {roundsNum}</Text>
                <Slider
                    minimumValue={1}
                    maximumValue={25}
                    step={1}
                    value={roundsNum}
                    onValueChange={(value) => setRoundsNum(value)}
                />
            </View>
            <View>
                <Button title={'Start'} onPress={startTimerHandler}/>
            </View>
        </View>

    )
}

function Pomodoro(){

}

export default Pomodoro;

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    timerContainer: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    slider: {
        padding: 30,
        flex: 1,
        alignContent: 'center',
        justifyContent: 'space-evenly'
    }
})