import React, { useState } from "react";
import { StyleSheet, View, Text, Pressable, ScrollView } from "react-native";
import { Slider } from "@miblanchard/react-native-slider";
import { LinearGradient } from "expo-linear-gradient";
import NavBar from "./NavBar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { useContext } from "../context/globalContext";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function setDays() {
  let today = new Date().getDay();
  const days = [];
  for (let i = 0; i < 7; i++) {
    today = today === 6 ? 0 : today + 1;
    days.push(today);
  }
  return days;
}

const chartConfig = {
  backgroundGradientFrom: "#FFFFFF",
  backgroundGradientTo: "#FFFFFF",
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  //useShadowColorFromDataset: false, // optional
};

const Nutrition = ({ navigation, route }) => {
  const { baseUrl } = useContext();
  const isFocused = useIsFocused();

  const [water, setWater] = useState(
    setDays().map((el) => {
      return {
        day: el,
        water: 0,
      };
    })
  );
  const [food, setFood] = useState(
    setDays().map((el) => {
      return {
        day: el,
        cals: 0,
        fats: 0,
        carbs: 0,
        proteins: 0,
      };
    })
  );

  const getInfo = async () => {
    try {
      const token = await AsyncStorage.getItem("access_token");

      const getEating = await fetch(`${baseUrl}/statistics/?period=week`, {
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const eatingJson = await getEating.json();
      const waterFull = [];
      const eatingFull = [];
      eatingJson.forEach((el) => {
        if (el.quantity__sum) {
          waterFull.push({
            day: new Date(el.created__date).getDay(),
            water: el.quantity__sum,
          });
        } else {
          eatingFull.push({
            day: new Date(el.created__date).getDay(),
            cals: el.food_item__calorie__sum,
            fats: el.food_item__fats__sum,
            carbs: el.food_item__carbohydrate__sum,
            proteins: el.food_item__protein__sum,
          });
        }
      });
      setFood((prev) => {
        return prev.map((el) => {
          const find = eatingFull.find((full) => full.day === el.day);
          return find || el;
        });
      });
      setWater((prev) => {
        return prev.map((el) => {
          const find = waterFull.find((full) => full.day === el.day);
          return find || el;
        });
      });
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    if (isFocused) getInfo();
  }, [isFocused]);

  const dataWater = {
    labels: setDays().map((el) => days[el]),
    datasets: [
      {
        data: water.map((el) => el.water),
        color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
      {
        data: food.map((el) => el.cals),
        color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: ["Water", "Calories"], // optional
  };

  const dataFood = {
    labels: setDays().map((el) => days[el]),
    datasets: [
      {
        data: food.map((el) => el.proteins),
        color: (opacity = 1) => `rgba(100, 100, 255, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
      {
        data: food.map((el) => el.carbs),
        color: (opacity = 1) => `rgba(100, 255, 100, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
      {
        data: food.map((el) => el.fats),
        color: (opacity = 1) => `rgba(255, 100, 100, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: ["Proteins", "Carbohydrates", "Fats"], // optional
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>Week statistics</Text>
      </View>
      <View style={styles.scrollWrapper}>
        <ScrollView style={{ marginLeft: 15 }}>
          <LineChart
            data={dataWater}
            width={screenWidth - 30}
            height={220}
            chartConfig={chartConfig}
          />
          <LineChart
            style={{ marginTop: 20 }}
            data={dataFood}
            width={screenWidth - 30}
            height={220}
            chartConfig={chartConfig}
          />
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
  scrollWrapper: {
    flex: 1,
    marginTop: 20,
  },
});

export default Nutrition;
