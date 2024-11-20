import { createContext, useState } from "react";

export const favoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  return (
    <favoriteContext.Provider value={{ favorites, setFavorites }}>
      {children}
    </favoriteContext.Provider>
  );
};
