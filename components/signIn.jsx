import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Pressable, TextInput } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Dimensions } from "react-native";
import { showMessage } from "react-native-flash-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useContext } from "../context/globalContext";

let ScreenWidth = Dimensions.get("window").width;

const NewSignIn = ({ navigation }) => {
  const { baseUrl, checkUser } = useContext();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  const handleSignIn = async () => {
    try {
      setIsFetching(true);

      const resp = await fetch(`${baseUrl}/token/`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          username: login,
          password,
        }),
      });

      const json = await resp.json();

      console.log(resp.status);
      console.log(json);
      if (resp.status !== 201 && resp.status !== 200) {
        return showMessage({
          message: json.detail,
          type: "danger",
          style: {
            paddingTop: 30,
          },
        });
      }

      await AsyncStorage.setItem("access_token", json.access);
      checkUser(navigation);
    } catch (_) {
      console.log(_);
      showMessage({
        message: "Something went wrong",
        type: "danger",
        style: {
          paddingTop: 30,
        },
      });
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text1}>Continue your challenge</Text>
      <View>
        <View style={styles.titles}>
          <Icon name="user" size={14} color="black" />
          <Text style={styles.textTitles}>Name</Text>
        </View>
        <TextInput style={styles.input} onChangeText={setLogin} value={login} />
        <View style={styles.titles}>
          <Icon name="lock" size={14} color="black" />
          <Text style={styles.textTitles}>Password</Text>
        </View>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          onChangeText={setPassword}
          value={password}
        />
      </View>
      <View>
        <Text style={styles.helper}>
          Thank you for using our app! Don't stop and continue reach new goals
        </Text>
        <Pressable
          style={isFetching ? styles.buttonDisabled : styles.button}
          onPress={handleSignIn}
          disabled={isFetching}
        >
          <Text style={styles.textButton}>
            {isFetching ? "Loading..." : "Sign in"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    position: "relative",
    backgroundColor: "#F4F4F4",
    justifyContent: "space-between",
  },
  top: {
    backgroundColor: "#97C059",
    borderBottomLeftRadius: ScreenWidth / 2,
    borderBottomRightRadius: ScreenWidth / 2,
  },
  text1: {
    fontWeight: "bold",
    color: "#393939",
    fontSize: 22,
    marginLeft: 30,
    marginTop: 100,
  },
  titles: {
    flexDirection: "row",
    maxHeight: 25,
    alignItems: "center",
    marginLeft: 30,
    marginVertical: 10,
  },
  textTitles: {
    fontWeight: "bold",
    color: "#393939",
    fontSize: 14,
    marginLeft: 10,
  },
  input: {
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    height: 50,
    marginHorizontal: 30,
    padding: 10,
  },
  icon: {
    padding: 10,
  },
  textButton: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#3A4320",
  },
  button: {
    marginLeft: (ScreenWidth - ScreenWidth / 1.5) / 2,
    width: ScreenWidth / 1.5,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#B1D430",
    marginBottom: 50,
  },
  buttonDisabled: {
    marginLeft: (ScreenWidth - ScreenWidth / 1.5) / 2,
    width: ScreenWidth / 1.5,
    height: 45,
    alignItems: "center",
    opacity: 0.5,
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#B1D430",
    marginBottom: 50,
  },
  helper: {
    textAlign: "center",
    color: "#3A4320",
    fontSize: 14,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 40,
    marginBottom: 40,
  },
});

export default NewSignIn;
