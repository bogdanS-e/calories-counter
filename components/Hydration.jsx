import React, { useState } from "react";
import { StyleSheet, View, Text, Pressable, ScrollView } from "react-native";
import { Slider } from "@miblanchard/react-native-slider";
import { LinearGradient } from "expo-linear-gradient";
import NavBar from "./NavBar";

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

const getProgress = (full, percent) => {
  const width = percent > 100 ? full : Math.round((full * percent) / 100);
  return {
    backgroundColor: "#4065A9",
    borderRadius: 5,
    height: 10,
    top: 0,
    left: 0,
    width: width,
    position: "absolute",
  };
};

const Hydration = ({ navigation, route }) => {
  const goal = 2450;
  const [fullWidthProgress, setFullWidthProgress] = useState(0);
  const [newValue, setNewValue] = useState(250);
  const [alreadyDone, setAlreadyDone] = useState([
    {
      time: "05:45 PM",
      value: 250,
    },
    {
      time: "02:45 PM",
      value: 250,
    },
    {
      time: "12:45 PM",
      value: 250,
    },
    {
      time: "10:45 AM",
      value: 250,
    },
    {
      time: "08:45 AM",
      value: 250,
    },
  ]);
  const completed = alreadyDone.reduce((prev, curr) => ({
    value: prev.value + curr.value,
  })).value;
  const left = goal - completed;
  const completedPercent = Math.round((completed * 100) / goal);
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>Hydration</Text>
        <View style={styles.mainInfo}>
          <View>
            <View style={styles.horizontal}>
              <Text style={styles.text2}>Current hydration</Text>
              <Text style={styles.text1}>{left}</Text>
            </View>
            <View style={styles.horizontal}>
              <Text style={styles.text3}>Did you drink your water today?</Text>
              <Text style={styles.text3}>ml left</Text>
            </View>
            <View
              style={styles.progressBar}
              onLayout={(event) => {
                const { width } = event.nativeEvent.layout;
                setFullWidthProgress(width);
              }}
            >
              <View
                style={getProgress(fullWidthProgress, completedPercent)}
              ></View>
            </View>
            <View style={styles.horizontal}>
              <Text style={styles.text2}>Goal: {goal} ml</Text>
              <Text style={styles.text3}>{completedPercent}% completed</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.sliderContainer}>
        <View style={styles.sliderController}>
          <Pressable
            style={styles.sliderControllerButton}
            onPress={() => setNewValue(newValue - 10)}
          >
            <Text style={styles.sliderControllerButtonText}>-</Text>
          </Pressable>
          <Text style={styles.newValueText}>{newValue} ml</Text>
          <Pressable
            style={styles.sliderControllerButton}
            onPress={() => setNewValue(newValue + 10)}
          >
            <Text style={styles.sliderControllerButtonText}>+</Text>
          </Pressable>
        </View>
        <Slider
          animateTransitions
          thumbStyle={styles.thumbColor}
          minimumTrackTintColor="#4065A9"
          minimumValue={0}
          step={10}
          maximumValue={500}
          value={newValue}
          onValueChange={(value) => setNewValue(Math.round(value))}
        />
        <Pressable
          style={styles.sliderControllerAdd}
          onPress={() => {
            setAlreadyDone((prev) => {
              return [
                { value: newValue, time: formatAMPM(new Date()) },
                ...prev,
              ];
            });
            setNewValue(250);
          }}
        >
          <Text style={styles.sliderControllerAddText}>Add portion</Text>
        </Pressable>
      </View>
      <View style={styles.scrollWrapper}>
        <ScrollView>
          {alreadyDone.map((el, index) => {
            return (
              <View key={index} style={styles.drinkedBlock}>
                <LinearGradient
                  colors={["#3C9EE9", "#3A63A1"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.drinkedGradientBlock}
                >
                  <Text style={styles.drinkedBlockVolume}>{el.value} ml</Text>
                  <Text style={styles.drinkedBlockDate}>{el.time}</Text>
                </LinearGradient>
              </View>
            );
          })}
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
  sliderContainer: {
    marginHorizontal: 30,
    marginVertical: 10,
  },
  sliderController: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sliderControllerButton: {
    width: 40,
    backgroundColor: "#4065A9",
    height: 30,
    borderRadius: 100,
    maxHeight: 30,
    fontSize: 24,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
  },
  sliderControllerButtonText: {
    color: "#F4F4F4",
    fontSize: 20,
  },
  thumbColor: {
    backgroundColor: "#4065A9",
  },
  newValueText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  sliderControllerAdd: {
    backgroundColor: "#4065A9",
    height: 30,
    borderRadius: 5,
    maxHeight: 30,
    fontSize: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  sliderControllerAddText: {
    color: "#F4F4F4",
    fontSize: 16,
  },
  scrollWrapper: {
    flex: 1,
    marginBottom: 10,
  },
  drinkedBlock: {
    marginVertical: 0,
    height: 50,
    marginHorizontal: 40,
  },
  drinkedGradientBlock: {
    flexDirection: "row",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "space-between",
  },
  drinkedBlockVolume: {
    color: "#EBE9E9",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 20,
  },
  drinkedBlockDate: {
    color: "#EBE9E9",
    fontSize: 16,
    marginRight: 20,
  },
});

export default Hydration;
