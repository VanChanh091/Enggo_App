import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Video_S1 from "./Video_S1";
import Video_S2 from "./Video_S2";
import Video_S3 from "./Video_S3";
import { Appbar, PaperProvider } from "react-native-paper";

const TopTab = createMaterialTopTabNavigator();

const TopTabNavigator = () => (
  <TopTab.Navigator>
    <TopTab.Screen
      name="Kênh"
      component={Video_S1}
      options={{ headerShown: false }}
    />
    <TopTab.Screen
      name="Chủ đề"
      component={Video_S2}
      options={{ headerShown: false }}
    />
    <TopTab.Screen
      name="Lịch sử"
      component={Video_S3}
      options={{ headerShown: false }}
    />
  </TopTab.Navigator>
);

const TopTabVideo = () => {
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
