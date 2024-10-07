import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { PaperProvider } from "react-native-paper";
import HeaderScreen from "../../../components/header/HeaderScreen";
import PlayVoice from "../../../components/playVoice/PlayVoice";

const ListenAndChoosePhrase = () => {
  return (
    <PaperProvider>
      <HeaderScreen title={"Nghe và hoàn thành cụm từ"} />

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

export default ListenAndChoosePhrase;

const styles = StyleSheet.create({});
