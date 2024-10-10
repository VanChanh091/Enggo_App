import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
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
      .map((word, index) => (blankIndices.includes(index) ? `_____` : word))
      .join(" ");

    // Sắp xếp chỉ số của các từ bị ẩn để đảm bảo đúng thứ tự
    const sortedBlankIndices = [...blankIndices].sort((a, b) => a - b);

    // Tạo mảng chứa từ đúng mà người dùng cần nhập
    const correctWords = sortedBlankIndices
      .map((index) => words[index])
      .map((word) => word.replace(/[.,]/g, "").replace(/[^a-zA-Z]/g, ""));

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
  const [translatedText, setTranslatedText] = useState(""); // Trạng thái lưu kết quả dịch
  const [isTranslating, setIsTranslating] = useState(false); // Trạng thái loading khi dịch
  const [translations, setTranslations] = useState({}); // Lưu trữ kết quả dịch cho mỗi item
  const [loading, setLoading] = useState(true);

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
      setLoading((prevLoading) => ({
        ...prevLoading,
        [index]: !loading, // Tắt trạng thái loading sau khi dịch xong
      }));
    } catch (error) {
      console.error("Error translating text:", error);
    }
  };

  const handleInputChange = (text, index, blankIndex) => {
    userInputsRef.current[blankIndex][index] = text; // Cập nhật giá trị mà không gây re-render
  };

  const checkAnswers = () => {
    const results = allBlanks.map((item, blankIndex) => {
      console.log("User inputs:", userInputsRef.current[blankIndex]);
      console.log("Correct words:", item.correctWords);
      return userInputsRef.current[blankIndex].map((word, index) => {
        // Trả về true nếu đáp án đúng, ngược lại false
        return (
          word.trim().toLowerCase() === item.correctWords[index].toLowerCase()
        );
      });
    });

    // Cập nhật kết quả vào state (gán trực tiếp vào state để kích hoạt re-render)
    setCheckResults(results);

    // Kiểm tra xem tất cả các đáp án có đúng không
    const allCorrect = results.every((result) =>
      result.every((isCorrect) => isCorrect)
    );

    // Thông báo cho người dùng
    if (allCorrect) {
      Alert.alert("Tất cả các đáp án đều đúng!");
    } else {
      Alert.alert("Có đáp án sai. Hãy thử lại.");
    }
  };

  const showCorrectAnswers = () => {
    userInputsRef.current.forEach((_, blankIndex) => {
      userInputsRef.current[blankIndex] = [
        ...allBlanks[blankIndex].correctWords,
      ];
    });

    // Cập nhật trạng thái để hiển thị đáp án đúng
    setCheckResults(
      allBlanks.map(() => Array(allBlanks[0].correctWords.length).fill(null))
    );
  };

  return (
    <View style={{ padding: 20 }}>
      {allBlanks.map((item, blankIndex) => (
        <View key={blankIndex} style={{ marginVertical: 7 }}>
          {/* Hiển thị văn bản gốc tiếng Anh */}
          <Text style={{ fontSize: 16, lineHeight: 28 }}>
            {item.blankedText}
          </Text>

          {/* Hiển thị văn bản tiếng Việt nếu đã dịch, hoặc ActivityIndicator nếu đang loading */}
          {loading[blankIndex] ? (
            <Text></Text>
          ) : (
            translations[blankIndex] && (
              <Text
                style={{
                  fontSize: 16,
                  color: "#2A7BD3",
                  marginTop: 5,
                  lineHeight: 28,
                }}
              >
                {translations[blankIndex]}
              </Text>
            )
          )}

          {/* input */}
          {item.correctWords.map((_, index) => (
            <View
              key={index}
              style={{
                width: "100%",
                height: 40,
                borderBottomWidth: 1,
                marginVertical: 10,
                // borderColor: "gray",
                borderColor:
                  checkResults[blankIndex] &&
                  checkResults[blankIndex][index] === true
                    ? "green" // Đúng thì viền màu xanh
                    : checkResults[blankIndex] &&
                      checkResults[blankIndex][index] === false
                    ? "red" // Sai thì viền màu đỏ
                    : "#ccc", // Chưa trả lời thì giữ màu xám
              }}
            >
              <TextInput
                placeholder={`Fill in word ${index + 1}`}
                defaultValue={userInputsRef.current[blankIndex][index]} // Không sử dụng value để tránh re-render
                onChangeText={(text) =>
                  handleInputChange(text, index, blankIndex)
                } // Gọi hàm cập nhật
                style={{
                  width: "100%",
                  height: "100%",
                  paddingLeft: 12,
                  fontSize: 16,
                }}
              />
            </View>
          ))}

          {/* button translate & speaker */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 15,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                handleTranslate(item.blankedText, blankIndex);
              }} // Thực hiện dịch khi nhấn vào icon
              disabled={isTranslating}
            >
              <MaterialIcons name="g-translate" size={30} color="black" />
            </TouchableOpacity>

            {/* Hiển thị kết quả dịch */}
            {translatedText && blankIndex === 0 && (
              <Text style={{ paddingLeft: 10 }}>{translatedText}</Text>
            )}

            <TouchableOpacity style={{ paddingLeft: 20 }}>
              <Ionicons name="volume-medium-sharp" color="black" size={35} />
            </TouchableOpacity>
          </View>
        </View>
      ))}

      {/* button show check answer and correct answers */}
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
          onPress={showCorrectAnswers}
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
