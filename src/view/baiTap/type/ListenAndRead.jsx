import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { PaperProvider } from "react-native-paper";
import HeaderScreen from "../../../components/header/HeaderScreen";
import PlayVoice from "../../../components/playVoice/PlayVoice";

const ListenAndRead = ({ route }) => {
  const { data } = route.params;
  console.log(data);

  return (
    <PaperProvider>
      <HeaderScreen title={"Nghe và đọc"} />

      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1.2,
            borderBottomWidth: 1,
            alignItems: "center",
          }}
        >
          <Text></Text>
        </View>

        <View style={{ flex: 7 }}>
          <ScrollView>
            {/* {data.content.map((item) => (
              <View>
                <Text>{item.text}</Text>
              </View>
            ))} */}
          </ScrollView>
        </View>

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

export default ListenAndRead;

const styles = StyleSheet.create({});
