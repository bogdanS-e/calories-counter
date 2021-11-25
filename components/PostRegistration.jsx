import React, { useState, useEffect, useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";
import moment from "moment";
import { showMessage } from "react-native-flash-message";

import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  KeyboardAvoidingView,
  BackHandler,
} from "react-native";
import { Dimensions } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import {useContext} from '../context/globalContext';

const ScreenWidth = Dimensions.get("window").width;

const PostRegistration = ({ navigation }) => {
  const { setUser } = useContext();

  const step1 = useRef(null);
  const step2 = useRef(null);

  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [date, setDate] = useState('');
  const [step, setStep] = useState(0);
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

  const incrementStep = () => {
    if (step === 2) {
      if (!date) {
        return showMessage({
          message: "Validation error",
          description: "Enter a valid weight",
          type: "danger",
          style: {
            paddingTop: 30,
          }
        });
      }

      //request to back end here
      setUser({
        height,
        weight,
        birthDate: date,
      }) //fill context after responce and go ahead;
      return navigation.navigate("statistic", { page: "statistic" });
    };

    setStep((prev) => {
      if (prev === 0) {
        const validWeight = parseInt(weight);

        if (!validWeight || validWeight < 10 || validWeight > 300) {
          step1.current.focus();
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
      } else if (prev === 1) {
        const validHeight = parseInt(height);

        if (!validHeight || validHeight < 50 || validHeight > 300) {
          step2.current.focus();
          showMessage({
            message: "Validation error",
            description: "Enter a valid height",
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

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", decrementStep);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", decrementStep);
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior='height'
      enabled={false}
    >
      <View style={styles.container}>
        {step === 0 && (<>
          <Text style={styles.step}>Step 1</Text>
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
                keyboardType='numeric'
                placeholder='68'
                ref={step1}
                onChangeText={(weight) => setWeight(weight)}
                value={weight}
                onSubmitEditing={incrementStep}
              />
              <TextInput
                style={styles.disableInput}
                placeholder="Kg"
                value="Kg"
                underlineColorAndroid='transparent'
                editable={false}
                selectTextOnFocus={false}
              />
            </View>
          </LinearGradient>
        </>)}

        {step === 1 && (<>
          <Text style={styles.step}>Step 2</Text>
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
                keyboardType='numeric'
                placeholder='160'
                ref={step2}
                onChangeText={(height) => setHeight(height)}
                value={height}
                onSubmitEditing={incrementStep}
              />
              <TextInput
                style={styles.disableInput}
                placeholder="Cm"
                value="Cm"
                underlineColorAndroid='transparent'
                editable={false}
                selectTextOnFocus={false}
              />
            </View>
          </LinearGradient>
        </>)}

        {step === 2 && (<>
          <Text style={styles.step}>Step 3</Text>
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
                value={date && moment(date).format('YYYY-MM-DD')}
                placeholder='Press here'
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
        </>)}

        <View style={styles.controllerContainer}>
          <Text style={styles.text3}>All your information is confidencial and will be only visible to you</Text>
          <Pressable style={styles.button} onPress={incrementStep}>
            <Text style={styles.textButton} >Proceed</Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    position: "relative",
    backgroundColor: "#F4F4F4",
  },
  controllerContainer: {
    position: 'absolute',
    bottom: 12,
    marginTop: -10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  step: {
    fontWeight: "bold",
    color: "#393939",
    textAlign: 'center',
    fontSize: 32,
    marginTop: 100,
    marginBottom: 20,
  },
  text1: {
    fontWeight: "bold",
    color: "#393939",
    textAlign: 'center',
    fontSize: 32,
    marginTop: 70,
    marginBottom: 60,
  },
  text2: {
    fontWeight: "bold",
    color: "#393939",
    fontSize: 22,
    marginBottom: 30,
  },
  text3: {
    color: "#9b9b9b",
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 20,
    padding: 10,
  },
  linearGradient: {
    width: 300,
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    padding: 30,
  },
  numberInput: {
    backgroundColor: '#fff',
    width: 170,
    height: 50,
    borderRadius: 14,
    paddingHorizontal: 10,
    fontSize: 20,
  },
  numberInputAge: {
    backgroundColor: '#fff',
    width: 240,
    height: 50,
    borderRadius: 14,
    paddingHorizontal: 10,
    fontSize: 20,
  },
  disableInput: {
    backgroundColor: '#fff',
    textAlign: 'center',
    width: 50,
    height: 50,
    borderRadius: 14,
    paddingHorizontal: 10,
    fontSize: 20,
  },
  disableDate: {
    backgroundColor: '#fff',
    color: '#000',
    textAlign: 'center',
    width: 240,
    height: 50,
    borderRadius: 14,
    paddingHorizontal: 10,
    fontSize: 20,
  }
});

export default PostRegistration;
