import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";

const VietCau_Doc = () => {
  const [selectedWords, setSelectedWords] = useState([]); // Lưu trữ các từ đã chọn
  const [wordOptions, setWordOptions] = useState([
    "Xin",
    "chúc",
    "mừng",
    "ơn",
    "chào",
    "tên",
    "ngạc",
    "gây",
    "tạm",
    "nhiên",
    "làm", // Dữ liệu mẫu
  ]); // Danh sách từ để chọn

  // Dữ liệu từ vựng ví dụ (có thể lấy từ API hoặc state khác)
  const sentence = "Congratulation!"; // Câu tiếng Anh để ghép câu tiếng Việt
  const correctAnswer = ["Xin", "chúc", "mừng"]; // Câu trả lời chính xác

  const handleSelectWord = (word) => {
    setSelectedWords([...selectedWords, word]);
    setWordOptions(wordOptions.filter((item) => item !== word));
  };

  const handleRemoveWord = (word) => {
    setSelectedWords(selectedWords.filter((item) => item !== word));
    setWordOptions([...wordOptions, word]);
  };

  const checkAnswer = () => {
    if (selectedWords.join(" ") === correctAnswer.join(" ")) {
      Alert.alert("Chính xác", "Bạn đã ghép đúng câu!");
    } else {
      Alert.alert("Sai", "Câu ghép chưa đúng, hãy thử lại.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Hiển thị câu cần ghép */}
      <View style={styles.sentenceContainer}>
        <Text style={styles.sentenceText}>{sentence}</Text>
        <View style={styles.answerContainer}>
          {selectedWords.map((word, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleRemoveWord(word)}
              style={styles.selectedWord}
            >
              <Text style={styles.wordText}>{word}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Hiển thị các từ bên dưới */}
      <View style={styles.wordOptionsContainer}>
        {wordOptions.map((word, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleSelectWord(word)}
            style={styles.wordOption}
          >
            <Text style={styles.wordText}>{word}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        style={{ width: 200, height: 50, borderWidth: 1 }}
        onPress={checkAnswer}
      >
        <Text>Kiểm tra</Text>
      </TouchableOpacity>
    </View>
  );
};

export default VietCau_Doc;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  sentenceContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  sentenceText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  answerContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    minHeight: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  selectedWord: {
    backgroundColor: "#E0E0E0",
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  wordOptionsContainer: {
    flex: 3,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  wordOption: {
    backgroundColor: "#F5F5F5",
    padding: 10,
    margin: 5,
    borderRadius: 5,
    minWidth: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  wordText: {
    fontSize: 18,
  },
});
