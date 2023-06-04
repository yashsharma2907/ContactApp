import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import MyContact from './components/MyContact'

export default function App() {
  const Stack = createStackNavigator()
  return (
    <NavigationContainer style ={styles.container}>
      <Stack.Navigator>
      <Stack.Screen style ={styles.container} name='MyContact' component={MyContact}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Set the background color to the desired color
  },
});