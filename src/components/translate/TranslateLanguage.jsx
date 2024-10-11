import { Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";

const TranslateLanguage = ({ data, styleText }) => {
  const [translatedText, setTranslatedText] = useState(null);

  // Sử dụng fetch để gọi Google Translate API
  const handleTranslate = async () => {
    try {
      const response = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=${encodeURIComponent(
          data
        )}`
      );
      const result = await response.json();
      if (result && result[0]) {
        const translatedTextArray = result[0].map((item) => item[0]);
        setTranslatedText(translatedTextArray.join("")); // Nối các phần dịch
      }
    } catch (error) {
      console.error("Error translating text:", error);
    }
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
        <TouchableOpacity onPress={handleTranslate}>
          <MaterialIcons name="g-translate" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TranslateLanguage;
