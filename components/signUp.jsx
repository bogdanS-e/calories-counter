import React from "react";
import { Button } from "react-native-elements";
import { StyleSheet, Text, View } from "react-native";
import { Input } from 'react-native-elements';

const SingUp = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Sign Up</Text>
      <View style={styles.inputContainer}>
        <Input
          style={styles.input}
          placeholder='User name'
        />
        <Input
          style={styles.input}
          placeholder="Password"
        />
        <Input
          style={styles.input}
          placeholder="Check password"
        />
      </View>
      <Button buttonStyle={styles.button} title="Sing in" onPress={() => navigation.navigate("signUp")} />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 200,
    fontSize: 20,
    marginTop: 20,
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    borderRadius: 16,
  },
  text: {
    textAlign: 'center',
    fontSize: 48,
    marginBottom: 20,
  },
  input: {
    fontSize: 18,
    maxWidth: 200,
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginTop: -150,
  }
});

export default SingUp;
