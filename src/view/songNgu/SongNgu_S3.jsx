import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useState } from "react";
import { PaperProvider } from "react-native-paper";
import HeaderScreen from "../../components/header/HeaderScreen";
import { FontAwesome } from "@expo/vector-icons";
import {
  playVoiceText,
  stopVoiceText,
} from "../../components/translate/PLayTranslateVoice";
import themeContext from "../../theme/themeContext";

const SongNgu_S3 = ({ route }) => {
  const { dataTruyen } = route.params;
  const theme = useContext(themeContext);

  //   Chuyen doi ngon ngu giua anh va viet
  const [isTextEnglish, setIsTextEnglish] = useState(true);

  const [translatedText, setTranslatedText] = useState(null);
  const [isEnglishToVietnamese, setIsEnglishToVietnamese] = useState(true);

  const toggleLanguageText = () => {
    setIsEnglishToVietnamese(!isEnglishToVietnamese);
  };

  // Use fetch to call Google Translate API
  const handleTranslate = async (text) => {
    try {
      const sourceLang = isEnglishToVietnamese ? "en" : "vi"; // Determine source language
      const targetLang = isEnglishToVietnamese ? "vi" : "en"; // Determine target language

      const response = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(
          text
        )}`
      );
      const result = await response.json();
      if (result && result[0]) {
        const translatedTextArray = result[0].map((item) => item[0]);
        setTranslatedText(translatedTextArray.join("")); // Join translated parts
      }
    } catch (error) {
      console.error("Error translating text:", error);
    }
  };

  const handleTranslateWithDelay = () => {
    setTimeout(() => {
      toggleLanguageText();
    }, 100);
    setTimeout(() => {
      setIsTextEnglish(!isTextEnglish);
    }, 250);
    handleTranslate(dataTruyen.text);
  };

  return (
    <PaperProvider>
      <HeaderScreen
        title={isTextEnglish ? dataTruyen.titleEn : dataTruyen.titleVn}
      />

      <View
        style={{
          flex: 9,
          borderBottomWidth: 1,
          backgroundColor: theme.background,
        }}
      >
        <Text
          style={{
            fontSize: 17,
            marginHorizontal: 12,
            textAlign: "justify",
            marginTop: 10,
            color: theme.color,
          }}
        >
          {translatedText || dataTruyen.text}
        </Text>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <TouchableOpacity
            style={{ marginLeft: 15 }}
            onPress={() => playVoiceText(dataTruyen.text, "en")}
          >
            <FontAwesome name="volume-up" size={35} color={theme.color} />
          </TouchableOpacity>
        </View>
      </View>

      {/* button translate */}
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
          onPress={handleTranslateWithDelay}
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
          onPress={handleTranslateWithDelay}
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
