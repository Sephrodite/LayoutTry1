import { useState, useEffect } from "react";
import { View } from "react-native";

function Timer(props){
    const [timerCount, setTimer] = useState({props})
    const [workTimer, setWorkTimer] = useState({props})
    const [restTimer, setRestTimer] = useState({props})
    const [roundsNum, setRoundsNum] = useState({props})

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

    return(
        <View>

        </View>
    )
}

