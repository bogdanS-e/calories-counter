import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import moment from "moment";

import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";
import { Dimensions } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { useContext } from '../context/globalContext';

import NavBar from "./NavBar";

const ScreenWidth = Dimensions.get("window").width;

const Profile = ({ navigation, route }) => {
  const { user } = useContext();

  const [weight, setWeight] = useState(user.weight || '');
  const [height, setHeight] = useState(user.height || '');
  const [date, setDate] = useState(user.birthDate || '');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = (date) => {
    setDate(date);
    hideDatePicker();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior='height'
      enabled={false}
    >
      <View style={styles.container}>
        <Text style={styles.text1}>Profile</Text>
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
              onChangeText={(weight) => setWeight(weight)}
              value={weight}
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
              onChangeText={(height) => setHeight(height)}
              value={height}
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
            onConfirm={handleConfirmDate}
            onCancel={hideDatePicker}
          />
        </LinearGradient>

        <View style={styles.controllerContainer}>
          <Pressable style={styles.button}>
            <Text style={styles.textButton} >Proceed</Text>
          </Pressable>
        </View>
      </View>
      <NavBar navigation={navigation} route={route} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    paddingTop: 20,
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
    marginBottom: 20,
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
    marginBottom: 20,
    height: 150,
    borderRadius: 12,
    overflow: 'hidden',
    paddingVertical: 10,
    paddingHorizontal: 25,
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
    width: 250,
    height: 50,
    borderRadius: 14,
    paddingHorizontal: 10,
    fontSize: 20,
  }
});

export default Profile;
