import { useState } from "react";

import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import { Provider } from "react-redux";
import NavigationStack from "./src/navigation/NavigationStack";
import store from "./src/redux/store";

export default function App() {
  const [accessToken, setAccessToken] = useState("");

  const { getItem, setItem } = useAsyncStorage("assetToken");

  return (
    <>
      <Provider store={store}>
        <StatusBar
          barStyle={"dark-content"}
          backgroundColor="transparent"
          translucent
        />
        {
          <NavigationContainer>
            <NavigationStack />
          </NavigationContainer>
        }
      </Provider>
    </>
  );
}
