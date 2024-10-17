import { Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";


const TranslateLanguage = ({ data, styleText }) => {
  console.log("data", data);
  
  const [translatedText, setTranslatedText] = useState(null);
  const [isEnglishToVietnamese, setIsEnglishToVietnamese] = useState(true);

  const toggleLanguage = () => {
    setIsEnglishToVietnamese(!isEnglishToVietnamese);
  };

  // Use fetch to call Google Translate API
  const handleTranslate = async () => {
    try {
      const sourceLang = isEnglishToVietnamese ? "en" : "vi"; // Determine source language
      const targetLang = isEnglishToVietnamese ? "vi" : "en"; // Determine target language

      const response = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(
          data
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
      toggleLanguage();
    }, 100);
    handleTranslate();
  };

  return (
    <View>
      <Text style={styleText}>{translatedText || data}</Text>

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 12,
        }}
      >
        <TouchableOpacity onPress={handleTranslateWithDelay}>
          <MaterialIcons name="g-translate" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TranslateLanguage;
