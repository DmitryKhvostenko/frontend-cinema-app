import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUserState] = useState(() => {
    const storedUser = localStorage.getItem('currentUser');
    return storedUser ? JSON.parse(storedUser) : '';
  });

  const setCurrentUser = (user) => {
    setCurrentUserState(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  };

  return <UserContext.Provider value={{ currentUser, setCurrentUser }}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
