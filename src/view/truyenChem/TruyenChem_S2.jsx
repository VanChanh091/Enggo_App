import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { PaperProvider } from "react-native-paper";
import HeaderScreen from "../../components/header/HeaderScreen";
import { playVoiceText } from "../../components/translate/PLayTranslateVoice";

const TruyenChem_S2 = ({ route }) => {
  const { data } = route.params;

  const highlightWordsInContent = (content, words) => {
    const wordsInContent = content.split(/(\s+)/); // Tách theo khoảng trắng

    // Duyệt qua từng từ và so sánh
    return wordsInContent.map((word, index) => {
      const cleanedWord = word.replace(/[.,]/g, "");
      const matchedWord = words.find(
        (w) =>
          w.word.toLowerCase() === word.toLowerCase().replace(/[^a-zA-Z]/g, "") // loại bỏ ký tự đặc biệt trước khi so sánh
      );

      // Nếu có từ khớp thì in hoa
      if (matchedWord) {
        return (
          <TouchableOpacity
            key={index}
            onPress={() => playVoiceText(cleanedWord)}
            style={{ marginTop: -2 }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 17,
                textAlign: "justify",
              }}
            >
              {word}
            </Text>
          </TouchableOpacity>
        );
      }

      // Nếu không khớp thì giữ nguyên
      return <Text key={index}>{word}</Text>;
    });
  };

  return (
    <PaperProvider>
      <HeaderScreen title={""} />

      <View style={{ flex: 1 }}>
        <ScrollView>
          <View style={{ flex: 1 }}>
            {/* content */}
            <View
              style={{
                width: "100%",
                height: 1350,
                maxHeight: 2500,
              }}
            >
              {/* name vn */}
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 20,
                  marginLeft: 12,
                  marginTop: 15,
                }}
              >
                {data.nameVn}
              </Text>

              {/* name en */}
              <Text
                style={{
                  fontStyle: "italic",
                  fontSize: 18,
                  marginLeft: 12,
                  marginTop: 15,
                }}
              >
                {data.nameEN}
              </Text>

              {/* image */}
              <View
                style={{
                  width: "100%",
                  height: 220,
                  marginTop: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={data.image}
                  style={{
                    width: 350,
                    height: 250,
                    resizeMode: "contain",
                    borderRadius: 40,
                  }}
                />
              </View>

              {/* content */}
              <View
                style={{
                  width: "93%",
                  height: "100%",
                  marginLeft: 14,
                }}
              >
                <Text
                  style={{
                    fontSize: 17,
                    textAlign: "justify",
                  }}
                >
                  {highlightWordsInContent(data.content, data.words)}
                </Text>
              </View>
            </View>
          </View>
          {/* words */}
          <View
            style={{
              flex: 1,
            }}
          >
            <View style={{ marginTop: 10, marginLeft: 15 }}>
              <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                Từ vựng trong bài
              </Text>
            </View>
            <View style={{ marginVertical: 10, marginLeft: 25 }}>
              {data.words.map((words, index) => (
                <View key={index}>
                  <TouchableOpacity onPress={() => playVoiceText(words.word)}>
                    <Text style={{ fontSize: 18, paddingVertical: 6 }}>
                      {words.id}.
                      <Text style={{ fontWeight: "bold" }}> {words.word}</Text>
                      <Text> {words.meaning}</Text>
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
          <View style={{ width: "100%", height: 35 }}></View>
        </ScrollView>
      </View>
    </PaperProvider>
  );
};

export default TruyenChem_S2;
