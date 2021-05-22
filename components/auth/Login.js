import React, { Component } from "react";
import { TextInput, View, Button } from "react-native";
import firebase from "firebase";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };

    this.onSignIn = this.onSignIn.bind(this);
  }

  onSignIn() {
    const { email, password } = this.state;
    firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    console.log(userCredential)
    console.log("LOgin Success")
  })
  .catch((error) => {
    console.log(error)
  });
    console.log("Button Login is clicked !!!");
  }
  render() {
    return (
      <View>
        <TextInput
          placeholder="email"
          onChangeText={(email) => this.setState({ email })}
        />
        <TextInput
          placeholder="password"
          secureTextEntry={true}
          onChangeText={(password) => this.setState({ password })}
        />
        <Button onPress={() => this.onSignIn()} title="Sign In" />
      </View>
    );
  }
}
