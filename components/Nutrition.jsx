import React, { useState } from "react";
import { StyleSheet, View, Text, Pressable, ScrollView } from "react-native";
import { Slider } from "@miblanchard/react-native-slider";
import { LinearGradient } from "expo-linear-gradient";
import NavBar from "./NavBar";

import { useContext } from "../context/globalContext";

const formatAMPM = (date) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes.toString().padStart(2, "0");
  hours = hours < 10 ? "0" + hours : hours;
  let strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
};

const getProgress = () => {
  return {
    backgroundColor: "#EBE9E9",
    borderRadius: 5,
    height: 10,
    top: 0,
    left: 0,
    width: 20,
    position: "absolute",
  };
};

const Nutrition = ({ navigation, route }) => {
  const { user } = useContext();

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>Nutrition</Text>
        <View style={styles.mainInfo}>
          <View>
            <View style={styles.horizontal}>
              <Text style={styles.text2}>Hey, {user.name}!</Text>
              <Text style={styles.text1}>Let's check your calories today!</Text>
            </View>
            <View style={styles.horizontal}>
              <Text style={styles.text3}>1500</Text>
              <Text style={styles.text3}>Cal left</Text>
            </View>
            <View
              style={styles.progressBar}
              onLayout={(event) => {
                const { width } = event.nativeEvent.layout;
              }}
            >
              <View style={getProgress()}></View>
            </View>
            <View style={styles.horizontal}>
              <Text style={styles.text2}>Goal: 65 ml</Text>
              <Text style={styles.text3}>65% completed</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.scrollWrapper}>
        <ScrollView>
          <Pressable
            style={styles.foodBlock}
            onPress={() => navigation.navigate("food", { page: "breakfast" })}
          >
            <LinearGradient
              colors={["#9ACF01", "#74A637"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.foodGradientBlock}
            >
              <View style={styles.foodIcon}>
                <Text style={styles.foodIconText}>+</Text>
              </View>
              <View>
                <Text style={styles.foodBlockTitle}>Breakfast</Text>
                <Text style={styles.foodBlockRec}>Recommended: 300 cal</Text>
              </View>
              <View style={styles.foodBlockNow}>
                <Text style={styles.foodBlockNowText}>287 cal</Text>
              </View>
            </LinearGradient>
          </Pressable>
          <Pressable
            style={styles.foodBlock}
            onPress={() => navigation.navigate("food", { page: "lunch" })}
          >
            <LinearGradient
              colors={["#9ACF01", "#74A637"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.foodGradientBlock}
            >
              <View style={styles.foodIcon}>
                <Text style={styles.foodIconText}>+</Text>
              </View>
              <View>
                <Text style={styles.foodBlockTitle}>Lunch</Text>
                <Text style={styles.foodBlockRec}>Recommended: 300 cal</Text>
              </View>
              <View style={styles.foodBlockNow}>
                <Text style={styles.foodBlockNowText}>287 cal</Text>
              </View>
            </LinearGradient>
          </Pressable>
          <Pressable
            style={styles.foodBlock}
            onPress={() => navigation.navigate("food", { page: "snacks" })}
          >
            <LinearGradient
              colors={["#9ACF01", "#74A637"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.foodGradientBlock}
            >
              <View style={styles.foodIcon}>
                <Text style={styles.foodIconText}>+</Text>
              </View>
              <View>
                <Text style={styles.foodBlockTitle}>Snacks</Text>
                <Text style={styles.foodBlockRec}>Recommended: 300 cal</Text>
              </View>
              <View style={styles.foodBlockNow}>
                <Text style={styles.foodBlockNowText}>287 cal</Text>
              </View>
            </LinearGradient>
          </Pressable>
          <Pressable
            style={styles.foodBlock}
            onPress={() => navigation.navigate("food", { page: "dinner" })}
          >
            <LinearGradient
              colors={["#9ACF01", "#74A637"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.foodGradientBlock}
            >
              <View style={styles.foodIcon}>
                <Text style={styles.foodIconText}>+</Text>
              </View>
              <View>
                <Text style={styles.foodBlockTitle}>Dinner</Text>
                <Text style={styles.foodBlockRec}>Recommended: 300 cal</Text>
              </View>
              <View style={styles.foodBlockNow}>
                <Text style={styles.foodBlockNowText}>287 cal</Text>
              </View>
            </LinearGradient>
          </Pressable>
        </ScrollView>
      </View>
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
  header: {
    marginTop: 40,
    marginLeft: 30,
    fontWeight: "bold",
    fontSize: 24,
  },
  mainInfo: {
    marginTop: 30,
    padding: 15,
    marginHorizontal: 30,
    backgroundColor: "white",
    height: 150,
    borderRadius: 15,
  },
  horizontal: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressBar: {
    backgroundColor: "#DCDFE6",
    height: 10,
    borderRadius: 5,
    marginVertical: 20,
    position: "relative",
  },
  progressBarCenter: {
    backgroundColor: "#4065A9",
    borderRadius: 5,
    height: 10,
    top: 0,
    left: 0,
    width: 100,
    position: "absolute",
  },
  text1: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3B3B3B",
  },
  text2: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3B3B3B",
  },
  text3: {
    fontSize: 12,
    color: "#BCBCBC",
  },
  scrollWrapper: {
    flex: 1,
    marginTop: 20,
  },
  foodBlock: {
    marginVertical: 5,
    marginHorizontal: 40,
  },
  foodIcon: {
    minHeight: 30,
    minWidth: 30,
    backgroundColor: "#FDFEF8",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  foodIconText: {
    fontSize: 20,
    color: "#ABD638",
  },
  foodGradientBlock: {
    flexDirection: "row",
    padding: 10,
    padding: 15,
    height: 80,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "space-between",
  },
  foodBlockTitle: {
    color: "#EBE9E9",
    fontSize: 20,
    fontWeight: "bold",
  },
  foodBlockRec: {
    color: "#EBE9E9",
    fontSize: 16,
  },
  foodBlockNow: {
    backgroundColor: "#7DAA59",
    minWidth: 70,
    minHeight: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  foodBlockNowText: {
    color: "#EBE9E9",
  },
});

export default Nutrition;
