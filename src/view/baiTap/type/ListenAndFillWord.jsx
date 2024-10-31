import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import HeaderScreen from "../../../components/header/HeaderScreen";
import { PaperProvider } from "react-native-paper";
import PlayVoice from "../../../components/playVoice/PlayVoice";
import { Image } from "react-native";
import FillInTheBlankExercise from "./FillInTheBlankExercise";

const ListenAndFillWord = ({ route }) => {
  const { data } = route.params;

  const allText = data.content.map((item) => item.text).join(" ");

  return (
    <PaperProvider>
      <HeaderScreen title={"Nghe và điền từ"} />

      <View style={{ flex: 1 }}>
        <View style={{ flex: 8.2 }}>
          <ScrollView>
            <View style={{ width: "100%", height: 100 }}>
              <Text
                style={{
                  fontWeight: 500,
                  fontSize: 19,
                  paddingHorizontal: 12,
                  paddingTop: 10,
                }}
              >
                {data.title}
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                height: 200,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={{ uri: data.image }}
                style={{ width: "93%", height: "93%", borderRadius: 10 }}
              />
            </View>

            <FillInTheBlankExercise data={data} />
          </ScrollView>
        </View>

        <View
          style={{
            flex: 1.8,
            borderTopWidth: 1,
            borderColor: "#d0d0d0",
          }}
        >
          <PlayVoice text={allText} />
        </View>
      </View>
    </PaperProvider>
  );
};

export default ListenAndFillWord;

const styles = StyleSheet.create({
  inputBox: {
    width: 60,
    maxWidth: 100,
    height: 35,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
  },
  paragraph: {
    padding: 10,
    fontSize: 16,
    paddingHorizontal: 12,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    marginHorizontal: 5,
    minWidth: 50,
    textAlign: "center",
    fontSize: 17,
  },
  checkButtonContainer: {
    flex: 1.8,
    borderTopWidth: 1,
    borderColor: "#d0d0d0",
    justifyContent: "center",
    alignItems: "center",
  },
  checkButton: {
    backgroundColor: "#008CBA",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  checkButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
