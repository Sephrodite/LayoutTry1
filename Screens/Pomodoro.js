import { StyleSheet, View, Text, TextInput, Modal, Button } from "react-native";
import { useState, useEffect } from 'react';
import { PieChart } from "react-native-gifted-charts";
import { Ionicons } from '@expo/vector-icons';
import React from "react";
import Slider from '@react-native-community/slider';

const PieData = ([
    { value: 100, color: 'tomato' },    // Decreasing slice
    { value: 0, color: 'skyblue' },          // Static slice
]);

function Pomodoro() {
    const [restTime, setRestTime] = useState(1)
    const [restLeft, setRestLeft] = useState(null)

    const [workTime, setWorkTime] = useState(1)
    const [workLeft, setWorkLeft] = useState(60)

    const [roundsNum, setRoundsNum] = useState(2)
    const [roundsLeft, setRoundsLeft] = useState(null)

    const [isRunning, setIsRunning] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [pieData, setPieData] = useState([
        { value: 100, color: 'tomato' },
        { value: 0, color: 'skyblue' }
    ])

    const startTimer = () => {
        setRoundsLeft(roundsNum)
        setWorkLeft(workTime * 60)
        setRestLeft(restTime * 60)
        setIsRunning(true)
        setModalVisible(true)
    }

    const cancelHandler = () => {
        setIsRunning(false)
        setModalVisible(false)
        setPieData(PieData)
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
                    setWorkLeft(workLeft - 1)

                    const percentage = ((workLeft - 1) / parseInt(workTime * 60)) * 100;
                    const leftovers = 100 - percentage

                    setPieData([
                        { value: percentage, color: 'tomato' },    // Decreasing slice
                        { value: leftovers, color: 'skyblue' },          // Static slices
                    ]);
                }, 1000);

            }
            else if (restLeft > 0) {
                timer1 = setTimeout(() => {
                    setRestLeft(restLeft - 1)

                    const percentage = ((restLeft - 1) / parseInt(restTime * 60)) * 100;
                    const leftovers = 100 - percentage

                    setPieData([
                        { value: percentage, color: 'lightblue' },    // Decreasing slice
                        { value: leftovers, color: 'skyblue' },          // Static slice
                    ]);
                }, 1000);

            }
            else {
                if (roundsLeft > 1) {
                    setRoundsLeft(roundsLeft - 1);
                    setWorkLeft(parseInt(workTime * 60));
                    setRestLeft(parseInt(restTime * 60));
                }
                else {
                    // Stop the timer when all repetitions are done
                    setIsRunning(false);
                    setModalVisible(false)
                }
            }
        }

        // Clean up the timer when the component unmounts or updates
        return () => clearTimeout(timer, timer1);
    }, [isRunning, roundsLeft, workLeft, restLeft]);


    return (
        <>
            <Modal visible={modalVisible} animationType="slide">
                <View style={styles.inputContainer}>
                    <PieChart
                        donut
                        textColor="black"
                        radius={160}
                        textSize={10}
                        innerRadius={130}
                        data={pieData}
                        centerLabelComponent={() => {
                            if (workLeft === workTime){
                                return <Text style={{ fontSize: 30 }}>{format(workTime)}</Text>;
                            }
                            else if (workLeft > 0) {
                                return <Text style={{ fontSize: 30 }}>{format(workLeft)}</Text>;
                            }
                            else if (workLeft === 0 && (restLeft === null || restLeft === restTime)) {
                                return <Text style={{ fontSize: 30 }}>{format(restTime)}</Text>;
                            }
                            else {
                                return <Text style={{ fontSize: 30 }}>{format(restLeft)}</Text>;
                            }
                        }}
                    />
                    <Button title="Cancel" onPress={cancelHandler} />
                </View>
            </Modal>
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
                    <Button title={'Start'} onPress={startTimer} />
                </View>
            </View>

        </>
    )
}

export default Pomodoro;

const styles = StyleSheet.create({
    inputContainer: {
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