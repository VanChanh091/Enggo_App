import { useEffect, useState } from "react";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { StatusBar } from "react-native";
import { Provider } from "react-redux";
import NavigationStack from "./src/navigation/NavigationStack";
import store from "./src/redux/store";
import { EventRegister } from "react-native-event-listeners";
import { theme } from "./src/theme/theme";
import themeContext from "./src/theme/themeContext";

export default function App() {
  const [accessToken, setAccessToken] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const { getItem, setItem } = useAsyncStorage("assetToken");

  useEffect(() => {
    const listener = EventRegister.addEventListener("ChangeTheme", (data) => {
      setIsDarkMode(data);
    });
    return () => {
      EventRegister.removeEventListener(listener);
    };
  }, [isDarkMode]);
  return (
    <>
      <Provider store={store}>
        <StatusBar
          barStyle={"dark-content"}
          backgroundColor="transparent"
          translucent
        />
        {
          <themeContext.Provider value={isDarkMode ? theme.dark : theme.light}>
            <NavigationContainer>
              <NavigationStack />
            </NavigationContainer>
          </themeContext.Provider>
        }
      </Provider>
    </>
  );
}
