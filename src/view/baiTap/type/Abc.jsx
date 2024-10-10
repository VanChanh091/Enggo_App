import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";

const Abc = ({ route }) => {
  const { data } = route.params;
  //   console.log(JSON.stringify(data, null, 2)); // 2 là số lượng khoảng trắng để indent

  console.log(data);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ScrollView>
        <Text>{data.title}</Text>
      </ScrollView>
    </View>
  );
};

export default Abc;

const styles = StyleSheet.create({});
