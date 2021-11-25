import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View, Image, Button, Pressable } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Dimensions } from "react-native";

const ScreenHeight = Dimensions.get("window").height;
const ScreenWidth = Dimensions.get("window").width;

const FirstPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#81B23B", "#709E60"]}
        style={styles.linearGradient}
      >
        <View style={styles.topMargin}></View>
        <View style={styles.top}>
          <Text style={styles.text1}>Challange accepted</Text>
          <Text style={styles.text2}>
            Chalange yourself and bring healthy back into your life
          </Text>
        </View>
        <Image style={styles.image} source={require("../assets/avocado.png")} />
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("signIn")}
        >
          <Text style={styles.textButton}>Get In</Text>
        </Pressable>
        <Pressable
          style={styles.buttonNew}
          onPress={() => navigation.navigate("signUp")}
        >
          <Text style={styles.textButtonNew}>Create an Account</Text>
        </Pressable>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    position: "relative",
  },
  background: {
    height: ScreenHeight,
    position: "absolute",
  },
  topMargin: {
    backgroundColor: "#97C059",
    height: 60,
  },
  top: {
    backgroundColor: "#97C059",
    borderBottomLeftRadius: ScreenWidth / 2,
    borderBottomRightRadius: ScreenWidth / 2,
  },
  text1: {
    fontWeight: "bold",
    color: "#E6E7DE",
    textAlign: "center",
    fontSize: 20,
    marginTop: 30,
  },
  text2: {
    textAlign: "center",
    color: "#E6E7DE",
    fontSize: 14,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 20,
    marginBottom: 80,
  },
  image: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: (ScreenWidth - ScreenWidth / 1.5) / 2,
    marginTop: 60,
    marginBottom: 60,
    width: ScreenWidth / 1.5,
    height: ScreenWidth / 1.5,
  },
  textButton: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#3A4320",
  },
  button: {
    marginTop: 20,
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
  },
  textButtonNew: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#3A4320",
  },
  buttonNew: {
    marginTop: 20,
    marginLeft: (ScreenWidth - ScreenWidth / 1.7) / 2,
    width: ScreenWidth / 1.7,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginBottom: 50,
  },
});

export default FirstPage;
