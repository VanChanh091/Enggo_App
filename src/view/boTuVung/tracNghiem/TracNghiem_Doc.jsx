import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Appbar, PaperProvider } from "react-native-paper";
import { CheckBox } from "@rneui/themed";

const TracNghiem_Doc = ({ navigation, route }) => {
  const { settings } = route.params;
  const { data } = route.params;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null); // Đáp án đã chọn
  const [correctAnswer, setCorrectAnswer] = useState(null); // Đáp án đúng/sai

  const currentVocab = data[currentQuestion]; //lấy ra vị trí của vocabulary đang chọn

  const handleAnswer = (answer) => {
    const isCorrect =
      (settings.mode === "tu-nghia" && answer === currentVocab.en) ||
      (settings.mode === "nghia-tu" && answer === currentVocab.vn);

    setSelectedAnswer(answer); // Lưu lại câu trả lời đã chọn
    setCorrectAnswer(isCorrect ? "correct" : "wrong"); // Đặt trạng thái đúng/sai

    // Tự động chuyển câu hỏi sau 1 giây
    setTimeout(() => {
      if (isCorrect) {
        // Nếu đúng và là câu hỏi cuối cùng, điều hướng về màn hình BoTuVung_S2
        if (currentQuestion === data.length - 1) {
          navigation.navigate("BoTuVung_S2");
        } else {
          // Nếu chưa hết câu hỏi, chuyển sang từ vựng tiếp theo
          setCurrentQuestion((prev) => prev + 1);
          setSelectedAnswer(null); // Reset trạng thái đã chọn
          setCorrectAnswer(null); // Reset trạng thái đúng/sai
        }
      }
    }, 1000);
  };

  const answers = [
    settings.mode === "tu-nghia" ? currentVocab.vn : currentVocab.en,
    ...data
      .filter((item) => item !== currentVocab)
      .map((item) => (settings.mode === "tu-nghia" ? item.vn : item.en))
      .slice(0, 3), // Lấy 3 đáp án khác để tạo 4 câu trả lời
  ];

  return (
    <PaperProvider>
      <Appbar.Header style={{ backgroundColor: "#2A7BD3" }}>
        <View style={{ flex: 8 }}>
          <Appbar.BackAction
            color="white"
            onPress={() => navigation.goBack()}
          />
        </View>
        <View
          style={{
            flex: 2,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../../img/imgBoTuVung/heartPink.png")}
            style={{ width: 28, height: 28, resizeMode: "contain" }}
          />
          <Text style={{ fontSize: 22, marginLeft: 10, color: "white" }}>
            3
          </Text>
        </View>
      </Appbar.Header>

      <View style={{ flex: 1, backgroundColor: "white" }}>
        {/* question */}
        <View style={{ flex: 2 }}>
          <View
            style={{
              flex: 0.5,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontWeight: 500,
                fontSize: 17,
                color: "gray",
                marginLeft: 20,
                marginTop: 20,
              }}
            >
              Chọn đáp án đúng
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 25 }}>
              {settings.mode === "tu-nghia" ? currentVocab.en : currentVocab.vn}
            </Text>
          </View>
        </View>

        {/* answers */}
        <View style={{ flex: 8, alignItems: "center" }}>
          {/* show list answer */}
          {answers.map((answer, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.answerButton,
                selectedAnswer === answer
                  ? correctAnswer === "correct"
                    ? styles.correctAnswer
                    : styles.wrongAnswer
                  : null,
              ]}
              onPress={() => handleAnswer(answer)}
            >
              <CheckBox
                // checked={isDocNgheSelected === 0}
                // onPress={() => setIsDocNgheSelected(0)}
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
              />
              <Text style={{ fontSize: 16 }}>
                {settings.mode === "tu-nghia"
                  ? currentVocab.vn
                  : currentVocab.en}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </PaperProvider>
  );
};

export default TracNghiem_Doc;

const styles = StyleSheet.create({
  answerButton: {
    width: "85%",
    height: 60,
    borderWidth: 1,
    marginTop: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  correctAnswer: {
    backgroundColor: "green",
  },
  wrongAnswer: { backgroundColor: "red" },
});
