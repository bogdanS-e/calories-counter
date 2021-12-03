import React, { useState, useEffect, useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";
import moment from "moment";
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker'; import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Vibration,
  Pressable,
  BackHandler,
} from "react-native";
import { Dimensions } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { useContext } from "../context/globalContext";

const ScreenWidth = Dimensions.get("window").width;

const radioProps = [
  { label: 'male', value: 'male' },
  { label: 'female', value: 'female' },
];

const PostRegistration = ({ navigation }) => {
  const { setUser, baseUrl, checkUser } = useContext();

  const step1 = useRef(null);
  const step2 = useRef(null);

  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [date, setDate] = useState("");
  const [sex, setSex] = useState(radioProps[0].label);
  const [step, setStep] = useState(0);
  const [activity, setActivity] = useState();
  const [activityList, setActivityList] = useState();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDate(date);
    hideDatePicker();
  };

  const decrementStep = () => {
    setStep((prev) => {
      if (prev === 0) {
        return 0;
      }

      return prev - 1;
    });

    return true;
  };

  const sendData = async () => {
    const token = await AsyncStorage.getItem('access_token');

    try {
      const resp = await fetch(`${baseUrl}/profile/`, {
        method: 'post',
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          sex,
          weight: +weight,
          height: +height,
          birth_date: moment(date).format("YYYY-MM-DD"),
          physical_activity: activity,
        }),
      });

      if (resp.status === 201 || resp.status === 200) {
        const json = await resp.json();

        if (json.message) return;

        setUser({
          name: json.user.username,
          height: json.height,
          weight: json.weight,
          birthDate: json.birth_date,
          caloriesNorm: json.calories_norm,
          carbohydrateNorm: json.carbohydrate_norm,
          fatsNorm: json.fats_norm,
          waterNorm: json.water_norm,
          proteinNorm: json.protein_norm,
          sex: json.sex,
          profile: json.id,
          todayWaterEvent: [],
        });

        navigation.navigate("nutrition", { page: "nutrition" });
      }

    } catch (error) {
      console.log(error);
    }

  }

  const incrementStep = () => {
    if (step === 4) {
      sendData();
      return;
    }

    setStep((prev) => {
      if (prev === 0) {
        const validWeight = parseInt(weight);

        if (!validWeight || validWeight < 10 || validWeight > 300) {
          step1.current.focus();
          Vibration.vibrate(400, false);
          return prev;
        }
      } else if (prev === 1) {
        const validHeight = parseInt(height);

        if (!validHeight || validHeight < 50 || validHeight > 300) {
          step2.current.focus();
          Vibration.vibrate(400, false);
          return prev;
        }
      } else if (prev === 2) {
        if (!date) {
          Vibration.vibrate(400, false);

          showMessage({
            message: "Validation error",
            description: "Enter a valid weight",
            type: "danger",
            style: {
              paddingTop: 30,
            }
          });
          return prev;
        }
      }

      return prev + 1;
    });
  };

  const getActivity = async () => {
    const token = await AsyncStorage.getItem('access_token');

    try {
      const resp = await fetch(`${baseUrl}/physical-activity/`, {
        method: 'get',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const json = await resp.json();

      console.log('Activity');
      console.log(json.results);
      setActivityList(json.results);
      setActivity(json.results[0].id);
    } catch (error) {
      checkUser(navigation);
    }

  }

  console.log(activity);
  useEffect(() => {
    getActivity();
    BackHandler.addEventListener("hardwareBackPress", decrementStep);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", decrementStep);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.step}>Step {step + 1}</Text>
      {step === 0 && (
        <View>
          <Text style={styles.text1}>Your current weight</Text>
          <LinearGradient
            colors={["#9acf02", "#6e9762"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.linearGradient}
          >
            <Text style={styles.text2}>Enter Weight</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.numberInput}
                keyboardType="numeric"
                placeholder="68"
                ref={step1}
                onChangeText={(weight) => setWeight(weight)}
                value={weight}
                onSubmitEditing={incrementStep}
              />
              <TextInput
                style={styles.disableInput}
                placeholder="Kg"
                value="Kg"
                underlineColorAndroid="transparent"
                editable={false}
                selectTextOnFocus={false}
              />
            </View>
          </LinearGradient>
        </View>
      )}

      {step === 1 && (
        <View>
          <Text style={styles.text1}>Your current height</Text>
          <LinearGradient
            colors={["#9acf02", "#6e9762"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.linearGradient}
          >
            <Text style={styles.text2}>Enter height</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.numberInput}
                keyboardType="numeric"
                placeholder="160"
                ref={step2}
                onChangeText={(height) => setHeight(height)}
                value={height}
                onSubmitEditing={incrementStep}
              />
              <TextInput
                style={styles.disableInput}
                placeholder="Cm"
                value="Cm"
                underlineColorAndroid="transparent"
                editable={false}
                selectTextOnFocus={false}
              />
            </View>
          </LinearGradient>
        </View>
      )}

      {step === 2 && (
        <View>
          <Text style={styles.text1}>How old are you?</Text>
          <LinearGradient
            colors={["#9acf02", "#6e9762"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.linearGradient}
          >
            <Text style={styles.text2}>Your birthday date:</Text>
            <Pressable onPress={showDatePicker}>
              <TextInput
                style={styles.disableDate}
                value={date && moment(date).format("YYYY-MM-DD")}
                placeholder="Press here"
                editable={false}
                selectTextOnFocus={false}
              />
            </Pressable>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </LinearGradient>
        </View>
      )}

      {step === 3 && (
        <View>
          <Text style={styles.text1}>Choose your sex:</Text>
          <LinearGradient
            colors={["#9acf02", "#6e9762"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.sexlinearGradient}
          >
            <RadioForm
              formHorizontal={true}
              animation={true}
            >
              {
                radioProps.map((obj, i) => (
                  <RadioButton labelHorizontal={true} key={i} >
                    <RadioButtonInput
                      obj={obj}
                      index={i}
                      isSelected={sex === obj.label}
                      onPress={(sex) => setSex(sex)}
                      borderWidth={1}
                      buttonInnerColor='#fff'
                      buttonOuterColor='#fff'
                      buttonStyle={{ marginLeft: 0 }}
                    />
                    <RadioButtonLabel
                      obj={obj}
                      index={i}
                      labelHorizontal={true}
                      onPress={(sex) => setSex(sex)}
                      labelStyle={{
                        fontSize: 21,
                        color: '#fff'
                      }}
                      labelWrapStyle={{
                        marginRight: 60,
                      }}
                    />
                  </RadioButton>
                ))
              }
            </RadioForm>
          </LinearGradient>
        </View>
      )}

      {step === 4 && (
        <View>
          <Text style={styles.text1}>Select your activity:</Text>
          <Picker
            style={{
              width: 300,
              backgroundColor: '#9acf02',
              borderRadius: 40,
              fontSize: 20,
              overflow: 'hidden',
            }}
            selectedValue={activity}
            onValueChange={(itemValue) =>
              setActivity(itemValue)
            }>
            {Array.isArray(activityList) && activityList.map((activity) => (
              <Picker.Item
                label={activity.name}
                value={activity.id}
                key={activity.id}
              />
            ))}
          </Picker>
        </View>
      )}
      <View style={styles.controllerContainer}>
        <Text style={styles.text3}>
          All your information is confidencial and will be only visible for you
        </Text>
        <Pressable style={styles.button} onPress={incrementStep}>
          <Text style={styles.textButton}>Proceed</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    position: "relative",
    backgroundColor: "#F4F4F4",
  },
  controllerContainer: {
    marginBottom: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  textButton: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#3A4320",
  },
  button: {
    marginBottom: 20,
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
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  step: {
    fontWeight: "bold",
    color: "#393939",
    textAlign: "center",
    fontSize: 32,
    marginTop: 40,
  },
  text1: {
    fontWeight: "bold",
    color: "#393939",
    textAlign: "center",
    fontSize: 24,
    marginBottom: 30,
  },
  text2: {
    fontWeight: "bold",
    color: "#393939",
    fontSize: 18,
    marginBottom: 10,
  },
  text3: {
    color: "#9b9b9b",
    textAlign: "center",
    fontSize: 20,
    marginBottom: 20,
    padding: 10,
  },
  linearGradient: {
    width: 300,
    height: 100,
    borderRadius: 12,
    overflow: "hidden",
    paddingVertical: 10,
    paddingHorizontal: 25,
  },
  sexlinearGradient: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: 300,
    height: 100,
    borderRadius: 12,
    overflow: "hidden",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  numberInput: {
    backgroundColor: "#fff",
    width: 170,
    height: 40,
    borderRadius: 14,
    paddingHorizontal: 10,
    fontSize: 20,
  },
  numberInputAge: {
    backgroundColor: "#fff",
    width: 240,
    height: 40,
    borderRadius: 14,
    paddingHorizontal: 10,
    fontSize: 20,
  },
  disableInput: {
    backgroundColor: "#fff",
    textAlign: "center",
    width: 50,
    height: 40,
    borderRadius: 14,
    paddingHorizontal: 10,
    fontSize: 20,
  },
  disableDate: {
    backgroundColor: "#fff",
    color: "#000",
    textAlign: "center",
    width: 240,
    height: 40,
    borderRadius: 14,
    paddingHorizontal: 10,
    fontSize: 20,
  },
});

export default PostRegistration;
