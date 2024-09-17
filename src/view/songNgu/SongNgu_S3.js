import { StyleSheet, Text, View } from "react-native";
import React from "react";

const SongNgu_S3 = ({ navigation, route }) => {
  const { dataTruyen } = route.params;
  console.log(dataTruyen);

  return (
    <View>
      <Text>SongNgu_S3</Text>
    </View>
  );
};

export default SongNgu_S3;

const styles = StyleSheet.create({});
