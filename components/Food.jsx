import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, View, Text, TextInput, Pressable, ScrollView, Image, Dimensions } from "react-native";
import NavBar from "./NavBar";
import { useContext } from "../context/globalContext";

const ScreenWidth = Dimensions.get("window").width;

const Food = ({ navigation, route }) => {
  const { baseUrl } = useContext();

  const [categories, setCategories] = useState(null);

  useEffect(() => {
    const getFood = async () => {
      const resp = await fetch(`${baseUrl}/food-category/`);
      const json = await resp.json();

      console.log('Category');
      console.log(json);
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

    return categories.filter((category) => category.name.includes(searchText.trim().toLocaleLowerCase()));
  }, [searchText, categories]);

  const goToChooseFood = (categoryId) => {
    navigation.navigate("chooseFood", {
      page: "chooseFood", state: {
        type: route.params.page,
        categoryId: categoryId,
      }
    });
  }

  if (!filtredCategories) return null;

  return (
    <View style={styles.container} >
      <Text style={styles.header}>Food</Text>
      <View style={styles.mainInfo}>
        <TextInput style={styles.search} placeholder='Search' onChangeText={(newText) => setSearchText(newText)} />
      </View>
      <View style={styles.scrollWrapper}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          {filtredCategories.length ? (
            filtredCategories.map(({ id, name, calories }) => (
              <Pressable
                style={styles.card}
                key={id}
                onPress={() => goToChooseFood(id)}
              >
                <Image style={styles.image} source={{ uri: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/marrot-1561576540.jpg?crop=0.443xw:0.786xh;0.277xw,0.0960xh&resize=480:*' }} />
                <View style={styles.cardText} key={id}>
                  <Text style={styles.cardName}>{name}</Text>
                  <Text style={styles.cardCalories}>{calories}</Text>
                </View>
              </Pressable>
            ))
          ) : (<>
            <Text style={styles.noResult}>There are no categories that contain "{searchText}"</Text>
            <Image style={styles.image2} source={require("../assets/avocado2.png")} />
          </>)
          }
        </ScrollView>
      </View>
      {/* <NavBar navigation={navigation} route={route} /> */}
    </View >
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

export default Food;
