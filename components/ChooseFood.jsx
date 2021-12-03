import React, { useEffect, useMemo, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View, Text, TextInput, ScrollView, Image, Dimensions } from "react-native";
import NavBar from "./NavBar";
import { useContext } from "../context/globalContext";
import { Modal, Pressable } from "react-native";
import { showMessage } from "react-native-flash-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ScreenWidth = Dimensions.get("window").width;

const ChooseFood = ({ navigation, route }) => {
  const { baseUrl, user: { profile }, checkUser } = useContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [categories, setCategories] = useState(null);
  const [activeFood, setActiveFood] = useState();
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    const getFood = async () => {
      const resp = await fetch(`${baseUrl}/food-item?category_id=${route.params.state.categoryId}`);
      const json = await resp.json();

      setCategories(json.results);
    }

    getFood();
  }, []);

  const [searchText, setSearchText] = useState('');

  const filtredCategories = useMemo(() => {
    if (searchText.trim() === '') {
      return categories;
    }

    if (!Array.isArray(categories)) {
      return null;
    }

    return categories.filter((category) => category.name.toLowerCase().includes(searchText.trim().toLowerCase()));
  }, [searchText, categories]);

  const submit = async () => {
    console.log("SEND FOOD EVENT");
    console.log(JSON.stringify({
      quantity: quantity,
      eating_category: 1,
      food_item: activeFood,
      profile: profile
    }));

    const token = await AsyncStorage.getItem("access_token");

    const resp = await fetch(`${baseUrl}/food-event/`, {
      method: 'post',
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        quantity: quantity,
        eating_category: route.params.state.type,
        food_item: activeFood,
        profile: profile
      }),
    });

    if (resp.status !== 201 && resp.status !== 200) {
      checkUser(navigation);
    }

    const json = await resp.json();

    console.log(json);
    if (json.created) {
      showMessage({
        message: "Food added",
        type: "success",
        style: {
          paddingTop: 30,
        }
      });
    }
  };

  if (!filtredCategories) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Choose Food</Text>
      <View style={styles.mainInfo}>
        <TextInput style={styles.search} placeholder='Search' onChangeText={(newText) => setSearchText(newText)} />
      </View>
      <View style={styles.scrollWrapper}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          {filtredCategories.length ? (
            filtredCategories.map(({ id, name, calorie, carbohydrate, fats }) => (
              <Pressable
                style={styles.card}
                key={id}
                onPress={() => {
                  setModalVisible(true);
                  setActiveFood(id);
                }}
              >
                <View style={styles.cardText} key={id}>
                  <Text style={styles.cardName}>{name}</Text>
                </View>
                <Text style={styles.cardCalories}>{calorie}ccal / 100g</Text>
                <Text style={styles.cardCalories}>{carbohydrate}carbohydrate / 100g</Text>
                <Text style={styles.cardCalories}>{fats}fats / 100g</Text>
              </Pressable>
            ))
          ) : (<>
            <Text style={styles.noResult}>There are no food that contain "{searchText}"</Text>
            <Image style={styles.image2} source={require("../assets/avocado2.png")} />
          </>)
          }
          <Modal
            animationType="slide"
            visible={modalVisible}
            transparent={true}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <LinearGradient
                  colors={["#9acf02", "#6e9762"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.linearGradient}
                >
                  <Text style={styles.text2}>Enter food gramms</Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.numberInput}
                      keyboardType="numeric"
                      placeholder="160"
                      onChangeText={(quantity) => setQuantity(quantity)}
                      value={quantity}
                    />
                    <TextInput
                      style={styles.disableInput}
                      placeholder="g"
                      value="g"
                      underlineColorAndroid="transparent"
                      editable={false}
                      selectTextOnFocus={false}
                    />
                  </View>
                </LinearGradient>
                <View style={styles.control}>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={styles.textStyle}>Cancel</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.button, styles.buttonClose2]}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                      submit();
                    }}
                  >
                    <Text style={styles.textStyle}>Add</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        </ScrollView>
      </View>
      <NavBar navigation={navigation} route={route} />
    </View>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    width: 300,
    height: 150,
    marginBottom: 40,
    borderRadius: 12,
    overflow: "hidden",
    paddingVertical: 10,
    paddingHorizontal: 25,
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
  numberInput: {
    backgroundColor: "#fff",
    width: 170,
    height: 40,
    borderRadius: 14,
    paddingHorizontal: 10,
    fontSize: 20,
  },
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  control: {
    width: 300,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    marginHorizontal: 10,
    width: 100,
    fontSize: 20,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  buttonClose2: {
    backgroundColor: "#81B23B",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    width: 350,
    height: 300,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  container: {
    display: "flex",
    flex: 1,
    justifyContent: "space-between",
    position: "relative",
    backgroundColor: "#F4F4F4",
  },
  card: {
    width: ScreenWidth - 80,
    marginBottom: 15,
    backgroundColor: '#ffffff',
    borderRadius: 14,
    paddingBottom: 7,
  },
  noResult: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 40,

  },
  cardText: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardName: {
    fontSize: 22,
    color: 'rgba(0,0,0,0.6)',
    marginVertical: 10,
    paddingLeft: 8,
    textTransform: 'capitalize',
  },
  cardCalories: {
    fontSize: 18,
    paddingLeft: 9,
    color: 'rgba(0,0,0,0.4)',
    marginVertical: 10,
    paddingRight: 8,
  },
  scrollView: {
    paddingHorizontal: 40,
    display: "flex",
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  header: {
    marginTop: 40,
    marginLeft: 30,
    fontWeight: "bold",
    fontSize: 24,
  },
  image: {
    height: 200,
    borderTopRightRadius: 14,
    borderTopLeftRadius: 14,
  },
  image2: {
    marginTop: 50,
    width: 150,
    height: 250,
  },
  mainInfo: {
    marginTop: 15,
    marginHorizontal: 30,
    backgroundColor: "white",
    height: 40,
    borderRadius: 15,
    overflow: 'hidden',
  },
  search: {
    height: 40,
    padding: 10,
    paddingHorizontal: 15,
    fontSize: 18,
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
    fontSize: 22,
    fontWeight: "bold",
    color: "#3B3B3B",
    marginBottom: 20,
    marginTop: 10,
  },
  text3: {
    fontSize: 12,
    color: "#BCBCBC",
  },
  scrollWrapper: {
    flex: 1,
    height: 200,
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

export default ChooseFood;
