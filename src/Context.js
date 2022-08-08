import React, { useState } from 'react';

export const Context = React.createContext();
export const ContextProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(undefined);

  return <Context.Provider value={{ userProfile, setUserProfile }}>{children}</Context.Provider>;
};
