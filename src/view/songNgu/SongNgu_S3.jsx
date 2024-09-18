import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Appbar, PaperProvider } from "react-native-paper";

const SongNgu_S3 = ({ navigation, route }) => {
  const { dataTruyen } = route.params;

  //   Chuyen doi ngon ngu giua anh va viet
  const [isTextEnglish, setIsTextEnglish] = useState(true);

  const toggleLanguageVietNam = () => {
    setIsTextEnglish(false);
  };

  const toggleLanguageEnglish = () => {
    setIsTextEnglish(true);
  };

  return (
    <PaperProvider>
      <Appbar.Header style={{ backgroundColor: "#2A7BD3" }}>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content
          title={isTextEnglish ? dataTruyen.titleEn : dataTruyen.titleVn}
          color="white"
        />
      </Appbar.Header>

      <View style={{ flex: 9, borderBottomWidth: 1 }}>
        <Text
          style={{
            fontSize: 16,
            marginHorizontal: 12,
            textAlign: "justify",
            marginTop: 10,
          }}
        >
          {isTextEnglish ? dataTruyen.textEn : dataTruyen.textVn}
        </Text>
      </View>
      <View
        style={{ flex: 1, backgroundColor: "#D9D9D9", flexDirection: "row" }}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            borderRightWidth: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={toggleLanguageEnglish}
        >
          <Image
            source={require("../../img/imgSongNgu/uk.png")}
            style={{
              width: 40,
              height: 40,
              resizeMode: "contain",
            }}
          />
          <Text style={{ marginLeft: 10, fontSize: 16 }}>Tiếng Anh</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            borderRightWidth: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={toggleLanguageVietNam}
        >
          <Image
            source={require("../../img/imgSongNgu/vn.png")}
            style={{
              width: 40,
              height: 40,
              resizeMode: "contain",
            }}
          />
          <Text style={{ marginLeft: 10, fontSize: 16 }}>Tiếng Việt</Text>
        </TouchableOpacity>
      </View>
    </PaperProvider>
  );
};

export default SongNgu_S3;

const styles = StyleSheet.create({});
