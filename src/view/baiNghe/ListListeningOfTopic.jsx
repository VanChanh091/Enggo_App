import { StyleSheet } from "react-native";
import React, { useContext } from "react";
import { PaperProvider } from "react-native-paper";
import HeaderScreen from "../../components/header/HeaderScreen";
import ListItems from "../../components/topic/ListItems";
import themeContext from "../../context/themeContext";

const ListListeningOfTopic = ({ route }) => {
  const { data } = route.params;

  return (
    <PaperProvider>
      <HeaderScreen title={data.title} />
      <ListItems data={data} navigationScreen={"DetailOfListening"} />
    </PaperProvider>
  );
};

export default ListListeningOfTopic;

const styles = StyleSheet.create({});
