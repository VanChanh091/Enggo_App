import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Appbar, PaperProvider } from "react-native-paper";
import ChannelScreen from "./ChannelScreen";
import TopicScreen from "./TopicScreen";
import HistoryScreen from "./HistoryScreen";

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
      <Appbar.Header style={{ backgroundColor: "#2A7BD3" }}>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content title="Truyện Chêm" color="white" />
      </Appbar.Header>
      <View style={{ flex: 1 }}>
        <TopTabNavigator />
      </View>
    </PaperProvider>
  );
};

export default TopTabVideo;

const styles = StyleSheet.create({});
