import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import { PaperProvider } from "react-native-paper";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import HeaderScreen from "../../../components/header/HeaderScreen";

const ListenAndFillWord = ({ route }) => {
  const { data } = route.params; // Lấy data từ route

  // State quản lý các từ bị thiếu và người dùng điền vào
  const [missingWords, setMissingWords] = useState([]);
  const [userInput, setUserInput] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Lấy từ ngẫu nhiên bị thiếu từ mỗi đoạn văn
    const wordsToFill = data.content.map((item) => {
      const indices = getRandomWords(
        item.content.map((word) => word.text.split(" ")),
        2,
        4
      );
      return indices;
    });
    setMissingWords(wordsToFill);
    setUserInput(wordsToFill.map((words) => words.map(() => ""))); // Tạo các ô trống cho mỗi từ
  }, []);

  // Hàm lấy các từ ngẫu nhiên từ đoạn văn
  const getRandomWords = (textArray, min, max) => {
    const numWords = Math.floor(Math.random() * (max - min + 1)) + min; // Random số lượng từ
    const selectedIndices = new Set();

    while (selectedIndices.size < numWords) {
      const randomIndex = Math.floor(Math.random() * textArray.length);
      selectedIndices.add(randomIndex);
    }

    return Array.from(selectedIndices);
  };

  // Hàm để người dùng điền từ
  const handleInputChange = (text, contentIndex, wordIndex) => {
    const updatedInput = [...userInput];
    updatedInput[contentIndex][wordIndex] = text;
    setUserInput(updatedInput);
  };

  // Hàm kiểm tra kết quả
  const checkAnswers = () => {
    setIsSubmitted(true);
    // Logic kiểm tra câu trả lời (so sánh với từ gốc)
  };

  return (
    <PaperProvider>
      <HeaderScreen title={"Nghe và điền từ"} /> {/* Tiêu đề màn hình */}
      <View style={{ flex: 1 }}>
        <View style={{ flex: 8.2 }}>
          <ScrollView>
            {/* Tiêu đề của bài nghe */}
            <View style={{ width: "100%", height: 100 }}>
              <Text
                style={{
                  fontWeight: "500",
                  fontSize: 19,
                  paddingHorizontal: 12,
                  paddingTop: 10,
                }}
              >
                {data.title}
              </Text>
            </View>

            {/* Hình ảnh đại diện cho bài nghe */}
            <View
              style={{
                width: "100%",
                height: 200,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={data.background} // Hiển thị ảnh từ API
                style={{ width: "93%", height: "93%", borderRadius: 10 }}
              />
            </View>

            {/* Nội dung text với các ô trống */}
            {data.list.map((item, contentIndex) => (
              <View key={contentIndex} style={{ paddingVertical: 10 }}>
                {item.content.map((content, textIndex) => (
                  <Text
                    key={textIndex}
                    style={{ paddingHorizontal: 12, fontSize: 17 }}
                  >
                    {content.text.split(" ").map((word, wordIndex) => {
                      // Kiểm tra xem từ này có bị xóa để thay bằng ô trống không
                      if (missingWords[contentIndex]?.includes(wordIndex)) {
                        const inputIndex =
                          missingWords[contentIndex].indexOf(wordIndex);
                        return (
                          <TextInput
                            key={wordIndex}
                            style={styles.input}
                            value={userInput[contentIndex]?.[inputIndex]}
                            onChangeText={(text) =>
                              handleInputChange(text, contentIndex, inputIndex)
                            }
                            editable={!isSubmitted} // Chỉ cho phép điền khi chưa submit
                          />
                        );
                      }
                      return <Text key={wordIndex}> {word} </Text>;
                    })}
                  </Text>
                ))}

                {/* Các nút nghe lại, dịch, âm lượng */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: 12,
                  }}
                >
                  <TouchableOpacity>
                    <MaterialIcons name="g-translate" size={30} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity style={{ paddingHorizontal: 15 }}>
                    <Ionicons name="repeat-outline" color="black" size={30} />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Ionicons
                      name="volume-medium-sharp"
                      color="black"
                      size={32}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Nút kiểm tra kết quả */}
        <View style={styles.checkButtonContainer}>
          <TouchableOpacity style={styles.checkButton} onPress={checkAnswers}>
            <Text style={styles.checkButtonText}>Kiểm tra kết quả</Text>
          </TouchableOpacity>
        </View>
      </View>
    </PaperProvider>
  );
};

export default ListenAndFillWord;

const styles = StyleSheet.create({
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
