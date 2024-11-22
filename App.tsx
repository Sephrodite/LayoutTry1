import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useState, useEffect } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { SQLiteDatabase, SQLiteProvider, useSQLiteContext } from 'expo-sqlite';

import Meditate from './Screens/Meditate'
import Pomodoro from './Screens/Pomodoro'
import Graphs from './Screens/Graphs';
import Logs from './Screens/Logs';
import Settings from './Screens/Settings';
import ManageScreens from './components/ManageScreens';
import { colours } from './assets/colours';

function Header() {
  console.log('test')
  const db = useSQLiteContext();
  const [version, setVersion] = useState('');
  useEffect(() => {
    async function setup() {
      const result = await db.getFirstAsync<{ 'sqlite_version()': string }>(
        'SELECT sqlite_version()'
      );
      setVersion(result['sqlite_version()']);
    }
    setup();
  }, []);
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>SQLite version: {version}</Text>
    </View>
  );
}

interface Todo {
  value: string;
  intValue: number;
}

function Content() {
  const db = useSQLiteContext();
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    async function setup() {
      const result = await db.getAllAsync<Todo>('SELECT * FROM todos');
      setTodos(result);
    }
    setup();
  }, []);

  return (
    <View style={styles.contentContainer}>
      {todos.map((todo, index) => (
        <View style={styles.todoItemContainer} key={index}>
          <Text>{`${todo.intValue} - ${todo.value}`}</Text>
        </View>
      ))}
      <Button title="pushy" onPress={Debletble} />
    </View>
  );
}

async function Debletble(db: SQLiteDatabase) {

    await db.runAsync('DROP TABLE IF EXISTS todos');
    console.log("yeet")
}

async function migrateDbIfNeeded(db: SQLiteDatabase) {
  const DATABASE_VERSION = 1;
  let { user_version: currentDbVersion } = await db.getFirstAsync<{ user_version: number }>(
    'PRAGMA user_version'
  );
  if (currentDbVersion >= DATABASE_VERSION) {
    return;
  }
  if (currentDbVersion === 0) {
    await db.execAsync(`
PRAGMA journal_mode = 'wal';
CREATE TABLE todos (id INTEGER PRIMARY KEY NOT NULL AUTOINCREMENT, value TEXT NOT NULL, intValue INTEGER);
`);
    await db.runAsync('INSERT INTO todos (value, intValue) VALUES (?, ?)', 'pomodoro', 1);
    await db.runAsync('INSERT INTO todos (value, intValue) VALUES (?, ?)', 'meditate', 2);
    currentDbVersion = 1;
  }
  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}


const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function NavBar() {
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: colours.colors.first },
        headerTintColor: colours.colors.second,
        tabBarStyle: { backgroundColor: colours.colors.first },
        tabBarActiveTintColor: colours.colors.second,
      })}
    >
      <BottomTabs.Screen
        name="Home"
        component={Graphs}
        options={{
          title: 'Graphs',
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bar-chart-outline" size={33} color={color} />
          )
        }}
      />
      <BottomTabs.Screen
        name="Pomodoro"
        component={Pomodoro}
        options={{
          title: 'Pomodoro',
          tabBarLabel: 'Pomodoro',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass-outline" size={33} color={color} />
          )
        }}
      />
      <BottomTabs.Screen
        name="Meditate"
        component={Meditate}
        options={{
          title: 'Meditate',
          tabBarLabel: 'Meditate',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="flower-outline" size={33} color={color} />
          )
        }}
      />
      <BottomTabs.Screen
        name="Logs"
        component={Logs}
        options={{
          title: 'Logs',
          tabBarLabel: 'Logs',
          tabBarIcon: ({ color }) => (
            <Ionicons name="library-outline" size={33} color={color} />
          )
        }}
      />
      <BottomTabs.Screen
        name="Settings"
        component={Settings}
        options={{
          title: 'Settings',
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={33} color={color} />
          )
        }}
      />
    </BottomTabs.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <SQLiteProvider databaseName="test.db" onInit={migrateDbIfNeeded}>
        <Header />
        <Content />
      </SQLiteProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: colours.colors.first },
            headerTintColor: colours.colors.second,
          }}
        >
          <Stack.Screen
            name="Navbar"
            component={NavBar}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="leScreen"
            component={ManageScreens}
            options={{ presentation: 'modal' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: colours.colors.bglight,
  },
  headerContainer: {},
  headerText: {},
  contentContainer: {},
  todoItemContainer: {}
})

