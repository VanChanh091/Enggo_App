import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { Appbar, PaperProvider } from "react-native-paper";
import { playVoiceText } from "../../translate/PLayTranslateVoice";
import themeContext from "../../../theme/themeContext";
import { theme } from "../../../theme/theme";

const TracNghiem_Doc = ({ navigation, route }) => {
  const { settings } = route.params;
  const { data } = route.params;
  const { screenNavigation } = route.params;
  const theme = useContext(themeContext);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null); // Đáp án đã chọn
  const [correctAnswer, setCorrectAnswer] = useState(null); // Đáp án đúng/sai
  const [isQuizCompleted, setIsQuizCompleted] = useState(false); // Kiểm tra đã hoàn thành chưa
  const [answers, setAnswers] = useState([]); // Danh sách câu trả lời được trộn
  const [lives, setLives] = useState(3); // Số lượng trái tim

  const currentVocab = data[currentQuestion]; // Lấy ra từ vựng hiện tại

  useEffect(() => {
    // Hàm trộn mảng ngẫu nhiên (Fisher-Yates Shuffle)
    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    // Tạo mảng gồm đáp án đúng và các đáp án sai
    const incorrectAnswers = data
      .filter((item) => item !== currentVocab) // Loại bỏ từ vựng hiện tại
      .map((item) => (settings.mode === "tu-nghia" ? item.vn : item.en)); // Lấy nghĩa tiếng Việt hoặc Anh

    // Trộn mảng đáp án sai
    const shuffledIncorrectAnswers = shuffleArray(incorrectAnswers);

    const answers = [
      settings.mode === "tu-nghia" ? currentVocab.vn : currentVocab.en,
      ...shuffledIncorrectAnswers.slice(0, 3), // Lấy 3 đáp án sai
    ].sort(() => Math.random() - 0.5); // Trộn ngẫu nhiên các câu trả lời
    setAnswers(answers); // Đặt câu trả lời đã trộn vào state
  }, [currentQuestion]);

  // Xử lý khi chọn đáp án
  const handleAnswer = async (answer) => {
    const isCorrect =
      (settings.mode === "tu-nghia" && answer === currentVocab.vn) ||
      (settings.mode === "nghia-tu" && answer === currentVocab.en);

    setSelectedAnswer(answer); // Lưu lại câu trả lời đã chọn
    setCorrectAnswer(isCorrect ? "correct" : "wrong"); // Đặt trạng thái đúng/sai

    if (!isCorrect) {
      setLives((prev) => prev - 1); // Trừ 1 trái tim nếu sai
    }

    // Kiểm tra nếu hết trái tim
    if (lives === 1 && !isCorrect) {
      Alert.alert("Kết thúc", "Bạn đã hết trái tim!");
      setLives(0);
      setIsQuizCompleted(true); // Kết thúc bài kiểm tra khi hết trái tim
      return;
    }

    if (isCorrect) {
      await playVoiceText(currentVocab.en, "en");
    }

    // Tự động chuyển câu hỏi sau 1 giây
    setTimeout(() => {
      if (currentQuestion === data.length - 1) {
        setIsQuizCompleted(true);
      } else {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedAnswer(null); // Reset trạng thái đã chọn
        setCorrectAnswer(null); // Reset trạng thái đúng/sai
      }
    }, 1000);
  };

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
            {lives}
          </Text>
        </View>
      </Appbar.Header>

      {!isQuizCompleted ? (
        <View style={{ flex: 1, backgroundColor: theme.background }}>
          {/* Câu hỏi */}
          <View style={{ flex: 2.5 }}>
            <View
              style={{
                flex: 0.5,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontWeight: "500",
                  fontSize: 17,
                  color: theme.color,
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
              <Text
                style={{ fontWeight: "bold", fontSize: 28, color: theme.color }}
              >
                {settings.mode === "tu-nghia"
                  ? currentVocab.en
                  : currentVocab.vn}
              </Text>
            </View>
          </View>

          {/* Hiển thị đáp án */}
          <View style={{ flex: 8, alignItems: "center" }}>
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
                disabled={!!selectedAnswer} // Disable sau khi chọn đáp án
              >
                <Text style={{ fontSize: 20, paddingLeft: 25 }}>{answer}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ) : (
        // Hiển thị khi hoàn thành bài trắc nghiệm
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.backgroundGhepCap,
          }}
        >
          {lives === 0 ? (
            <Text style={{ fontSize: 18, marginTop: 10, color: theme.color }}>
              Cố gắng lên bạn nhé!
            </Text>
          ) : (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text
                style={{ fontWeight: "bold", fontSize: 22, color: theme.color }}
              >
                Congratulation!
              </Text>
              <Text style={{ fontSize: 18, marginTop: 7, color: theme.color }}>
                Bạn đã hoàn thành tất cả câu hỏi!
              </Text>
            </View>
          )}

          <TouchableOpacity
            style={{
              width: 120,
              height: 45,
              borderRadius: 12,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
              backgroundColor: "#F4C33A",
            }}
            onPress={() => navigation.navigate(screenNavigation)}
          >
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>OK</Text>
          </TouchableOpacity>
        </View>
      )}
    </PaperProvider>
  );
};

export default TracNghiem_Doc;

const styles = StyleSheet.create({
  answerButton: {
    width: "85%",
    height: 60,
    borderWidth: 1,
    borderColor: "#d0d0d0",
    marginTop: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  correctAnswer: {
    backgroundColor: "green",
  },
  wrongAnswer: { backgroundColor: "red" },
});
