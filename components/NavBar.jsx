import React from "react";
import { StyleSheet, Pressable, View, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Dimensions } from "react-native";

const ScreenWidth = Dimensions.get("window").width;

const pages = ["nutrition", "hydration", "profile"];

const NavBar = ({ navigation, route }) => {
  const page = route.params.page;
  return (
    <View style={styles.container}>
      <View
        style={createSign((pages.indexOf(page) * ScreenWidth) / 3, ScreenWidth)}
      ></View>
      <View style={styles.bottomNavigation}>
        <Pressable
          style={page === "nutrition" ? styles.buttonActive : styles.button}
          onPress={() =>
            navigation.navigate("nutrition", { page: "nutrition" })
          }
        >
          <Text style={styles.iconStyle}>
            <Icon
              name="home"
              size={page === "nutrition" ? 32 : 24}
              color="#FFFFF4"
            />
          </Text>
        </Pressable>
        <Pressable
          style={page === "hydration" ? styles.buttonActive : styles.button}
          onPress={() =>
            navigation.navigate("hydration", { page: "hydration" })
          }
        >
          <Text style={styles.iconStyle}>
            <Icon
              name="user"
              size={page === "hydration" ? 32 : 24}
              color="#FFFFF4"
            />
          </Text>
        </Pressable>
        <Pressable
          style={page === "profile" ? styles.buttonActive : styles.button}
          onPress={() => navigation.navigate("profile", { page: "profile" })}
        >
          <Text style={styles.iconStyle}>
            <Icon
              name="user"
              size={page === "profile" ? 32 : 24}
              color="#FFFFF4"
            />
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

let createSign = function(margin, screen) {
  return {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flex: 1,
    width: screen / 3,
    maxHeight: 9,
    backgroundColor: "#B1D430",
    marginLeft: margin,
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    maxHeight: 70,
    justifyContent: "flex-end",
  },
  sign: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flex: 1,
    width: ScreenWidth / 4,
    maxHeight: 8,
    backgroundColor: "#B1D430",
  },
  bottomNavigation: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    maxHeight: 60,
    justifyContent: "space-between",
    position: "relative",
    backgroundColor: "#B1D430",
  },
  iconStyle: {
    textAlign: "center",
    paddingTop: 10,
  },
  button: {
    paddingTop: 8,
    textAlign: "center",
    width: ScreenWidth / 4,
  },
  buttonActive: {
    paddingTop: 4,
    textAlign: "center",
    width: ScreenWidth / 4,
  },
});

export default NavBar;
