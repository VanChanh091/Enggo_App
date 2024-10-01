import { StyleSheet, Text, View } from "react-native";
import React from "react";

const ListListeningOfTopic = ({ navigation, route }) => {
  const { data } = route.params;
  console.log(data);

  return (
    <View>
      <Text>ListListeningOfTopic</Text>
    </View>
  );
};

export default ListListeningOfTopic;

const styles = StyleSheet.create({});
