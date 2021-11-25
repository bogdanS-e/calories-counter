import React, { useState } from "react";

export const GlobalContext = React.createContext({
  user: {
    height: '',
    weight: '',
    birthDate: '',
  },
  setUser: (user) => { },
  editUser: (newData) => { },
})

export const useContext = () => React.useContext(GlobalContext);

export const GlobalContextProvider = ({ children }) => {
  const [user, setUser] = useState({
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

  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser: handleUser,
        editUser: handleEditUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}