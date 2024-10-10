import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const Abc = ({ route }) => {
  const { data } = route.params;

  const [translations, setTranslations] = useState({}); // Lưu trữ kết quả dịch cho mỗi item

  // Sử dụng fetch để gọi Google Translate API
  const handleTranslate = async (text, index) => {
    try {
      const response = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=${encodeURIComponent(
          text
        )}`
      );
      const result = await response.json();
      if (result && result[0]) {
        setTranslations((prevTranslations) => ({
          ...prevTranslations,
          [index]: result[0][0][0], // Lưu kết quả dịch vào translations với index tương ứng
        }));
      }
    } catch (error) {
      console.error("Error translating text:", error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {data.content.map((item, index) => (
        <View
          key={index}
          style={{
            width: "100%",
            borderBottomWidth: 1,
            marginVertical: 10,
            padding: 10,
          }}
        >
          {/* Hiển thị văn bản gốc tiếng Anh */}
          <Text style={{ fontSize: 16 }}>{item.text}</Text>

          {/* Hiển thị văn bản tiếng Việt nếu đã dịch */}
          {translations[index] && (
            <Text style={{ fontSize: 16, color: "#2A7BD3", marginTop: 5 }}>
              {translations[index]}
            </Text>
          )}

          {/* Nút dịch */}
          <TouchableOpacity
            onPress={() => handleTranslate(item.text, index)} // Dịch văn bản và lưu lại theo index
            style={{ marginTop: 10, alignSelf: "flex-end" }}
          >
            <MaterialIcons name="g-translate" size={30} color="black" />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default Abc;
