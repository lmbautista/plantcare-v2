import React, { useState } from 'react';

export const UserContext = React.createContext();
export const UserContextProvider = ({ children, user }) => {
  const [currentUser, setCurrentUser] = useState(user ?? undefined);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>{children}</UserContext.Provider>
  );
};
