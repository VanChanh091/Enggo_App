import { StyleSheet, Text, View } from "react-native";
import React from "react";

const SettingTest = ({ navigation, route }) => {
  const { dataVocab } = route.params;
  console.log(dataVocab);
  return (
    <View>
      <Text>SettingTest</Text>
    </View>
  );
};

export default SettingTest;

const styles = StyleSheet.create({});
