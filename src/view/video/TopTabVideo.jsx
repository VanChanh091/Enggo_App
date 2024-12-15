import { StyleSheet, View } from "react-native";
import React, { useContext } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { PaperProvider } from "react-native-paper";
import ChannelScreen from "./topTab/ChannelScreen";
import TopicScreen from "./topTab/TopicScreen";
import HeaderScreen from "../../components/header/HeaderScreen";
import themeContext from "../../context/themeContext";

const TopTab = createMaterialTopTabNavigator();

const TopTabNavigator = () => (
  <TopTab.Navigator>
    {/* <TopTab.Screen
      name="Kênh"
      component={ChannelScreen}
      options={{ headerShown: false }}
    /> */}
    <TopTab.Screen
      name="Chủ đề"
      component={TopicScreen}
      options={{ headerShown: false }}
    />
  </TopTab.Navigator>
);

const TopTabVideo = () => {
  const theme = useContext(themeContext);

  return (
    <PaperProvider>
      <HeaderScreen title="Video" />
      <View style={{ flex: 1 }}>
        {/* <TopTabNavigator /> */}
        <TopicScreen />
      </View>
    </PaperProvider>
  );
};

export default TopTabVideo;

const styles = StyleSheet.create({});
