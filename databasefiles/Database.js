import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  { name: 'mydatabase.db', location: 'default' },
  () => { },
  error => { console.error('Error opening database:', error); }
);

export default db;
