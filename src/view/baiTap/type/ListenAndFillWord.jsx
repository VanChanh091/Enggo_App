import { StyleSheet, Text, View } from "react-native";
import React from "react";
import HeaderScreen from "../../../components/header/HeaderScreen";
import { PaperProvider } from "react-native-paper";
import PlayVoice from "../../../components/playVoice/PlayVoice";

const ListenAndFillWord = () => {
  return (
    <PaperProvider>
      <HeaderScreen title={"Nghe và điền từ"} />

      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            borderBottomWidth: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* <ModalChooseType /> */}
        </View>
        <View style={{ flex: 7.2 }}></View>
        <View
          style={{
            flex: 1.8,
            borderTopWidth: 1,
            borderColor: "#d0d0d0",
          }}
        >
          <PlayVoice />
        </View>
      </View>
    </PaperProvider>
  );
};

export default ListenAndFillWord;

const styles = StyleSheet.create({});
