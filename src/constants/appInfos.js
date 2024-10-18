import { Dimensions } from "react-native";

export const appInfo = {
  size: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },

  BASE_URL: "http://localhost:3000",

  Host_URL: "https://enggo-server.onrender.com",
};
