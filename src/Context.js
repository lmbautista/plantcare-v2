import React, { useState } from 'react';

export const Context = React.createContext();
export const ContextProvider = ({ user, children }) => {
  const [currentUser, setCurrentUser] = useState(user ?? undefined);

  return <Context.Provider value={{ currentUser, setCurrentUser }}>{children}</Context.Provider>;
};
