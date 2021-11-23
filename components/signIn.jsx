import React from "react";
import { Button } from "react-native-elements";
import { StyleSheet, Text, View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';

const SingIn = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Sign In</Text>
      <View style={styles.inputContainer}>
        <Input
          style={styles.input}
          placeholder='User name'
          leftIcon={
            <Icon
              name='user'
              size={24}
              color='black'
            />
          }
        />
        <Input
          style={styles.input}
          placeholder="Password"
          leftIcon={
            <Icon
              name='key'
              size={24}
              color='black'
            />
          }
        />
      </View>
      <Button title="SingIn" onPress={() => navigation.navigate("signUp")} />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
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

export default SingIn;
