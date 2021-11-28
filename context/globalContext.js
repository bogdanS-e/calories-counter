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
  },
  baseUrl: "",
  setUser: (user) => {},
  editUser: (newData) => {},
  checkUser: () => {},
});

export const useContext = () => React.useContext(GlobalContext);

export const GlobalContextProvider = ({ children }) => {
  const baseUrl = "http://e9b1-91-237-27-112.ngrok.io/api";

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
    console.log("CHECCK");
    console.log(token);

    try {
      if (token) {
        const resp = await fetch(`${baseUrl}/user-info/`, {
          method: "get",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(resp.status);

        const json = await resp.json();
        console.log(json);

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

          console.log(jsonUser);
          console.log(jsonUserWater);

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
            todayWaterEvent: jsonUserWater,
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
