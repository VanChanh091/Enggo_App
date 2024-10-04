import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { PaperProvider } from "react-native-paper";
import ChannelScreen from "./topTab/ChannelScreen";
import TopicScreen from "./topTab/TopicScreen";
import HistoryScreen from "./topTab/HistoryScreen";
import HeaderScreen from "../../components/header/HeaderScreen";

const TopTab = createMaterialTopTabNavigator();

const TopTabNavigator = () => (
  <TopTab.Navigator>
    <TopTab.Screen
      name="Kênh"
      component={ChannelScreen}
      options={{ headerShown: false }}
    />
    <TopTab.Screen
      name="Chủ đề"
      component={TopicScreen}
      options={{ headerShown: false }}
    />
    <TopTab.Screen
      name="Lịch sử"
      component={HistoryScreen}
      options={{ headerShown: false }}
    />
  </TopTab.Navigator>
);

const TopTabVideo = ({ navigation }) => {
  return (
    <PaperProvider>
      <HeaderScreen title="Video" />
      <View style={{ flex: 1 }}>
        <TopTabNavigator />
      </View>
    </PaperProvider>
  );
};

export default TopTabVideo;

const styles = StyleSheet.create({});
