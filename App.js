import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import firebase from "firebase/app";

import LandingScreen from "./components/auth/Landing";
import RegisterScreen from "./components/auth/Register";

// Initialize Firebase
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDosg-0c-IcHMRPZC_nsgQodb6hyvxGNTA",
  authDomain: "instagram-dev-feb5b.firebaseapp.com",
  projectId: "instagram-dev-feb5b",
  storageBucket: "instagram-dev-feb5b.appspot.com",
  messagingSenderId: "35538064149",
  appId: "1:35538064149:web:b8f4826a2e1f61ae314f1c",
  measurementId: "G-MP18CX0L93",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const Stack = createStackNavigator();

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        });
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        });
      }
    });
  }
  render() {
    const { loggedIn, loaded } = this.state;
    if (!loaded) {
      return (
        <View>
          <Text style={{flex: 1, justifyContent: 'center'}} >loading</Text>
        </View>
      );
    } 

    if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen
              name="Landing"
              component={LandingScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
    return (
      <View  style={{flex: 1, justifyContent: 'center'}}>
        <Text>You're not loggedIn </Text>
      </View>
    );
  }
}
