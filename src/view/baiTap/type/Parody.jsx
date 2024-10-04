import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { PaperProvider } from "react-native-paper";
import HeaderScreen from "../../../components/header/HeaderScreen";
import ModalChooseType from "./ModalChooseType";

const Parody = () => {
  return (
    <PaperProvider>
      <HeaderScreen title={"Bài tập"} />

      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1.2,
            borderBottomWidth: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* <ModalChooseType /> */}
        </View>
        <View style={{ flex: 8.8 }}></View>
      </View>
    </PaperProvider>
  );
};

export default Parody;

const styles = StyleSheet.create({});
