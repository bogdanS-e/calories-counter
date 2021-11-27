import React, { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const GlobalContext = React.createContext({
  user: {
    name: '',
    height: '',
    weight: '',
    birthDate: '',
  },
  baseUrl: '',
  setUser: (user) => { },
  editUser: (newData) => { },
  checkUser: () => { },
})

export const useContext = () => React.useContext(GlobalContext);

export const GlobalContextProvider = ({ children }) => {
  const baseUrl = 'http://e40c-91-237-27-112.ngrok.io/api';

  const [user, setUser] = useState({
    name: '',
    height: '',
    weight: '',
    birthDate: '',
  });

  const handleUser = (newUser) => {
    setUser(newUser);
  }

  const handleEditUser = (newUserData) => {
    setUser((currentUser) => {
      return Object.assign(currentUser, newUserData);
    });
  }

  const checkUser = async (navigation) => {
    const token = await AsyncStorage.getItem('access_token');
    console.log("CHECCK");
    console.log(token);

    try {
      if (token) {
        const resp = await fetch(`${baseUrl}/user-info/`, {
          method: 'get',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const json = await resp.json();
        console.log(json);
  
        if (json.code === 'token_not_valid') return;

        if(json.username) {
          const {username, is_ready, access_token} = json;

          await AsyncStorage.setItem('access_token', access_token);
 
          if (!is_ready) {
            return navigation.navigate("postRegistration");
          }

          setUser({
            name: username,
            height: '',
            weight: '',
            birthDate: '',
          });

          navigation.navigate("statistic", { page: "statistic" });
        }
      }
    } catch (error) {
      console.log(error);
    }
    
    //navigation.navigate("statistic", { page: "statistic" })
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
  )
}