import { View, Text, StyleSheet, ScrollView } from "react-native"
import { LineChart } from "react-native-gifted-charts";
import { colours } from "../assets/colours";

function Graphs() {
    const data1 = [{ value: 15, label: 1 }, { value: 30, label: 2 }, { value: 26, label: 3 }, { value: 40, label: 4 }];
    const data2 = [{ value: 15, label: 1 }, { value: 30, label: 2 }, { value: 26, label: 3 }, { value: 40, label: 4 }];
    const data3 = [{ value: 15, label: 1 }, { value: 30, label: 2 }, { value: 26, label: 3 }, { value: 40, label: 4 }];
    return (
        <>
            <View style={styles.graphContainer}>
                <View>
                    <LineChart
                        data={data1}
                    />
                    <Text>
                        Brain Oxygen (%)
                    </Text>
                </View>
                <View>
                    <LineChart
                        data={data2}
                    />
                    <Text>
                        O2Hb (microM)
                    </Text>
                </View>
                <View>
                    <LineChart
                        data={data3}
                    />
                    <Text>
                        HHb (microM)
                    </Text>
                </View>
            </View>
        </>
    );
}

export default Graphs;

const styles = StyleSheet.create({
    graphContainer: {
        flex: 1,
        padding: 16,
        alignContent: 'space-between',
        justifyContent: 'space-evenly',
        backgroundColor: colours.colors.bglight,
    }
})