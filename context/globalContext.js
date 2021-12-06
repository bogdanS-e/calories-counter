import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const GlobalContext = React.createContext({
  user: {
    name: "",
    height: "",
    weight: "",
    birthDate: "",
    caloriesNorm: "",
    carbohydrateNorm: "",
    fatsNorm: "",
    waterNorm: "",
    proteinNorm: "",
    sex: "",
    profile: "",
  },
  baseUrl: "",
  setUser: (user) => {},
  editUser: (newData) => {},
  checkUser: () => {},
});

export const useContext = () => React.useContext(GlobalContext);

export const GlobalContextProvider = ({ children }) => {
  const baseUrl = "http://b201-92-111-145-202.ngrok.io/api";

  const [user, setUser] = useState({
    name: "",
    height: "",
    weight: "",
    birthDate: "",
    caloriesNorm: "",
    carbohydrateNorm: "",
    fatsNorm: "",
    waterNorm: "",
    proteinNorm: "",
    sex: "",
    profile: "",
    todayWaterEvent: [],
    eatingCategory: [],
  });

  const handleUser = (newUser) => {
    setUser(newUser);
  };

  const handleEditUser = (newUserData) => {
    setUser((currentUser) => {
      return Object.assign(currentUser, newUserData);
    });
  };

  const checkUser = async (navigation) => {
    const token = await AsyncStorage.getItem("access_token");

    try {
      if (token) {
        const resp = await fetch(`${baseUrl}/user-info/`, {
          method: "get",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const json = await resp.json();

        if (json.code === "token_not_valid") {
          return navigation.navigate("firstPage");
        }

        if (json.username) {
          const { username, is_ready, access_token } = json;

          await AsyncStorage.setItem("access_token", access_token);

          if (!is_ready) {
            return navigation.navigate("postRegistration");
          }

          const getUserResp = await fetch(`${baseUrl}/profile/`, {
            method: "get",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const jsonUser = await getUserResp.json();

          if (jsonUser.code === "token_not_valid") {
            return navigation.navigate("firstPage");
          }

          const getUserWater = await fetch(`${baseUrl}/water-event/`, {
            method: "get",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const jsonUserWater = await getUserWater.json();

          const getEatingCategory = await fetch(`${baseUrl}/eating-category/`, {
            method: "get",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const eatingCategoryJson = await getEatingCategory.json();

          setUser({
            name: jsonUser.user.username,
            height: jsonUser.height,
            weight: jsonUser.weight,
            birthDate: jsonUser.birth_date,
            caloriesNorm: jsonUser.calories_norm,
            carbohydrateNorm: jsonUser.carbohydrate_norm,
            fatsNorm: jsonUser.fats_norm,
            proteinNorm: jsonUser.protein_norm,
            waterNorm: jsonUser.water_norm,
            sex: jsonUser.sex,
            profile: jsonUser.id,
            todayWaterEvent: jsonUserWater.results,
            eatingCategory: eatingCategoryJson.results,
          });

          navigation.navigate("nutrition", { page: "nutrition" });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser: handleUser,
        editUser: handleEditUser,
        baseUrl,
        checkUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
