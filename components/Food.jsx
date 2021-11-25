import React from "react";
import { StyleSheet, View, Text } from "react-native";
import NavBar from "./NavBar";

const Food = ({ navigation, route }) => {
  return (
    <View style={styles.container}>
      <Text>Food</Text>
      <NavBar navigation={navigation} route={route} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    justifyContent: "space-between",
    position: "relative",
    backgroundColor: "#F4F4F4",
  },
});

export default Food;
