import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { PaperProvider } from "react-native-paper";
import HeaderScreen from "../../components/header/HeaderScreen";
import ListItems from "../../components/topic/ListItems";

const ListVideoOfTopic = ({ route }) => {
  const { data } = route.params;
  console.log(data);

  return (
    <PaperProvider>
      <HeaderScreen title={data.title} />
      <View style={{ flex: 1 }}>
        <ListItems data={data} navigationScreen={"VideoSetting"} />
      </View>
    </PaperProvider>
  );
};

export default ListVideoOfTopic;

const styles = StyleSheet.create({});
