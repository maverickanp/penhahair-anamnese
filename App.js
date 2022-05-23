/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from "react";
import {
SafeAreaView,
ScrollView,
StatusBar,
StyleSheet,
TextInput,
Text,
useColorScheme,
Button,
View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import appSettings from "./settings.json";
const Stack = createNativeStackNavigator();


const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen 
        name="Dashboard" 
        component={DashboardScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleButtonPress = async () => {
    const response = await fetch(
      appSettings.url_login,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        consumerToken: appSettings.consumer_token,
        email,
        password
      })
    });
    const data = await response.text();
    navigation.navigate('Dashboard', { email })
    //console.log(data);
  }

  return (
    <View style={styles.container}>
      <TextInput placeholder="Usuario" style={styles.textInput} onChangeText={setEmail}/>
      <TextInput placeholder="Senha" style={styles.textInput} onChangeText={setPassword}/>
        <View style={styles.button}>
          <Button
            onPress={ handleButtonPress }
            title={"Login"}
          />
        </View>
    </View>
  );
};
const DashboardScreen = ({ navigation, route }) => {
  return <Text>This is the email {route.params.email} passed across LoginScreen</Text>;
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "50%",
    padding: 20,
  },
  textInput: {
    borderBottomColor: "red",
    borderBottomWidth: 1,
    width: "100%",
    height: 50
  },
  button: {
    marginTop: 30,
    width: "100%",
    height: 50
  }
});

export default App;
