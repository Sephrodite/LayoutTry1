import React from "react";
import Slider from "react-native-sliders";
import { useState } from "react";
import { StyleSheet, View, Text, Button, PixelRatio } from "react-native";
import { NavigationContainer } from '@react-navigation/native';

function Sliders() {
    const [restTime, setRestTime] = useState()
    const [workTime, setWorkTime] = useState()
    const [roundsNum, setRoundsNum] = useState()



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
                <Button title={'Start'} />
            </View>
        </View>

    )
}
export default Sliders;

const styles = StyleSheet.create({
    slider: {
        padding: 30,
        flex: 1,
        alignContent: 'center',
        justifyContent: 'space-evenly'
    }
})

