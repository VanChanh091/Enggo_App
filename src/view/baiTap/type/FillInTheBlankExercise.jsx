import React, { useState, useMemo, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";

// Hàm tạo các ô trống cho bài tập
const generateFillInTheBlank = (texts) => {
  return texts.map((text) => {
    const words = text.split(" ");
    const numberOfBlanks = Math.floor(Math.random() * 4) + 1; // Lấy ngẫu nhiên từ 1-4 từ
    const blankIndices = [];

    // Tạo mảng chứa các chỉ số của từ sẽ bị ẩn
    while (blankIndices.length < numberOfBlanks) {
      const randomIndex = Math.floor(Math.random() * words.length);
      if (!blankIndices.includes(randomIndex)) {
        blankIndices.push(randomIndex);
      }
    }

    // Tạo nội dung mới với các ô trống
    const blankedText = words
      .map((word, index) => (blankIndices.includes(index) ? "_____" : word))
      .join(" ");

    // Sắp xếp chỉ số của các từ bị ẩn để đảm bảo đúng thứ tự
    const sortedBlankIndices = [...blankIndices].sort((a, b) => a - b);

    // Tạo mảng chứa từ đúng mà người dùng cần nhập
    const correctWords = sortedBlankIndices.map((index) => words[index]);

    return { blankedText, correctWords }; // Giữ nguyên thứ tự từ trong correctWords
  });
};

const FillInTheBlankExercise = ({ data }) => {
  const allText = data.content.flatMap((item) => item.text); // Lấy toàn bộ nội dung text từ content

  // Sử dụng useRef để lưu các giá trị không bị thay đổi
  const allBlanksRef = useRef(generateFillInTheBlank(allText));

  // Đảm bảo allBlanksRef.current là một mảng
  const allBlanks = allBlanksRef.current;

  // Quản lý giá trị input bằng useRef thay vì useState để tránh re-render
  const userInputsRef = useRef(
    allBlanks.map((item) => Array(item.correctWords.length).fill(""))
  );

  const [checkResults, setCheckResults] = useState(allBlanks.map(() => null)); // null for unanswered, true/false for correctness

  const handleInputChange = (text, index, blankIndex) => {
    userInputsRef.current[blankIndex][index] = text; // Cập nhật giá trị mà không gây re-render
  };

  const checkAnswers = () => {
    const results = allBlanks.map((item, blankIndex) => {
      console.log("User inputs:", userInputsRef.current[blankIndex]);
      console.log("Correct words:", item.correctWords);
      return userInputsRef.current[blankIndex].map((word, index) => {
        return (
          word.trim().toLowerCase() === item.correctWords[index].toLowerCase()
        );
      });
    });

    // Cập nhật kết quả vào state
    const flattenedResults = results.map((res) =>
      res.map((isCorrect) => (isCorrect ? true : false))
    );
    setCheckResults(flattenedResults);

    // Kiểm tra xem có ô nào sai và hiển thị thông báo
    const allCorrect = flattenedResults.every((result) =>
      result.every((isCorrect) => isCorrect)
    );

    if (allCorrect) {
      Alert.alert("Correct!");
    } else {
      Alert.alert("Some answers are incorrect. Please try again.");
    }
  };

  const showCorrectAnswers = (blankIndex) => {
    userInputsRef.current[blankIndex] = [...allBlanks[blankIndex].correctWords]; // Đặt lại đáp án đúng vào ô nhập
  };

  return (
    <View style={{ padding: 20 }}>
      {allBlanks.map((item, blankIndex) => (
        <View key={blankIndex} style={{ marginBottom: 20 }}>
          <Text style={{ marginBottom: 10 }}>{item.blankedText}</Text>

          {item.correctWords.map((_, index) => (
            <TextInput
              key={index}
              placeholder={`Fill in word ${index + 1}`}
              defaultValue={userInputsRef.current[blankIndex][index]} // Không sử dụng value để tránh re-render
              onChangeText={(text) =>
                handleInputChange(text, index, blankIndex)
              } // Gọi hàm cập nhật
              style={{
                borderBottomWidth: 1,
                borderColor:
                  checkResults[blankIndex] &&
                  checkResults[blankIndex][index] === true
                    ? "green"
                    : checkResults[blankIndex] &&
                      checkResults[blankIndex][index] === false
                    ? "red"
                    : "#ccc", // Đặt màu sắc biên giới
                marginVertical: 10,
                padding: 5,
                width: 200,
              }}
            />
          ))}
        </View>
      ))}

      <View
        style={{
          width: "100%",
          height: 180,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Kiểm tra đáp án */}
        <TouchableOpacity
          style={{
            width: "80%",
            height: 50,
            borderRadius: 10,
            backgroundColor: "#D1E4F3",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
          onPress={checkAnswers}
        >
          <View
            style={{
              flex: 2,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Feather name="check-square" size={28} color="#2A7BD3" />
          </View>
          <View style={{ flex: 8 }}>
            <Text
              style={{
                fontSize: 16,
                color: "#2A7BD3",
                fontWeight: "bold",
              }}
            >
              KIỂM TRA ĐÁP ÁN ĐÃ LÀM
            </Text>
          </View>
        </TouchableOpacity>

        {/* Hiển thị đáp án */}
        <TouchableOpacity
          style={{
            width: "80%",
            height: 50,
            borderRadius: 10,
            backgroundColor: "#2A7BD3",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            marginTop: 12,
          }}
          onPress={() =>
            allBlanks.forEach((_, index) => showCorrectAnswers(index))
          } // Gọi hàm hiển thị đáp án cho tất cả
        >
          <View
            style={{
              flex: 2,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons name="checkmark-done-outline" color="white" size={28} />
          </View>
          <View style={{ flex: 8 }}>
            <Text style={{ fontSize: 16, color: "#fff", fontWeight: "bold" }}>
              HIỂN THỊ ĐÁP ÁN
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FillInTheBlankExercise;
