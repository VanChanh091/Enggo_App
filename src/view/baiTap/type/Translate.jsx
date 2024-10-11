import React, { useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const Translate = ({ text }) => {
  const [translatedText, setTranslatedText] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    try {
      setLoading(true); // Bật trạng thái loading
      const response = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=${encodeURIComponent(
          text
        )}`
      );
      const result = await response.json();
      if (result && result[0]) {
        setTranslatedText(result[0][0][0]); // Lưu kết quả dịch
      }
      setLoading(false); // Tắt trạng thái loading
    } catch (error) {
      console.error("Error translating text:", error);
      setLoading(false); // Tắt trạng thái loading nếu có lỗi
    }
  };
  return (
    <View style={{ marginTop: 10 }}>
      {/* Nút dịch */}
      <TouchableOpacity
        onPress={handleTranslate}
        style={{ alignSelf: "flex-end" }}
      >
        <MaterialIcons name="g-translate" size={30} color="black" />
      </TouchableOpacity>

      {/* Hiển thị văn bản dịch hoặc ActivityIndicator */}
      {loading ? (
        <ActivityIndicator size="small" color="#0000ff" />
      ) : (
        translatedText && (
          <Text style={{ fontSize: 16, color: "#2A7BD3", marginTop: 5 }}>
            {translatedText}
          </Text>
        )
      )}
    </View>
  );
};

export default Translate;
