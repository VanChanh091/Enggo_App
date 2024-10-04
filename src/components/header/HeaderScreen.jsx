import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Appbar, PaperProvider } from "react-native-paper";

const HeaderScreen = ({ title }) => {
  const navigation = useNavigation();
  return (
    <Appbar.Header style={{ backgroundColor: "#2A7BD3" }}>
      <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
      <Appbar.Content title={title} color="white" />
    </Appbar.Header>
  );
};

export default HeaderScreen;
