import { StyleSheet, Text, View } from "react-native";
import React from "react";

const ListenAndRead = ({ route }) => {
  const { data } = route.params;
  console.log(data);

  return (
    <View>
      <Text>ListenAndRead</Text>
    </View>
  );
};

export default ListenAndRead;

const styles = StyleSheet.create({});
