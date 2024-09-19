import {
  Alert,
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Appbar, PaperProvider } from "react-native-paper";
import { Audio } from "expo-av";

const TracNghiem_Nghe = ({ navigation, route }) => {
  const { settings } = route.params;
  const { data } = route.params;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null); // Đáp án đã chọn
  const [correctAnswer, setCorrectAnswer] = useState(null); // Đáp án đúng/sai
  const [isQuizCompleted, setIsQuizCompleted] = useState(false); // Kiểm tra đã hoàn thành chưa
  const [answers, setAnswers] = useState([]); // Danh sách câu trả lời được trộn
  const [lives, setLives] = useState(3); // Số lượng trái tim
  const [sound, setSound] = useState(null);

  const currentVocab = data[currentQuestion]; // Lấy ra từ vựng hiện tại

  const playWordSound = async () => {
    try {
      if (sound) {
        await sound.unloadAsync(); // Hủy âm thanh trước khi phát từ mới
        setSound(null);
      }
      console.log("Đang phát âm thanh...");
      const { sound } = await Audio.Sound.createAsync({
        uri: currentVocab.audio,
      });
      setSound(sound);
      await sound.playAsync();
    } catch (error) {
      console.error("Lỗi khi phát âm thanh: ", error);
    }
  };

  // Xử lý khi chọn đáp án
  const handleAnswer = (answer) => {
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
      setIsQuizCompleted(true); // Kết thúc bài kiểm tra khi hết trái tim
      return;
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

  // Tạo danh sách đáp án, bao gồm đáp án đúng và các đáp án sai ngẫu nhiên
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
        <View style={{ flex: 1, backgroundColor: "white" }}>
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
              {/* <Text style={{ fontWeight: "bold", fontSize: 28 }}>
                {settings.mode === "tu-nghia"
                  ? currentVocab.en
                  : currentVocab.vn}
              </Text> */}
              <TouchableOpacity onPress={playWordSound}>
                <Image
                  source={require("../../../img/imgBoTuVung/voice.png")}
                  style={{ width: 70, height: 70, resizeMode: "contain" }}
                />
              </TouchableOpacity>
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
          }}
        >
          <Text style={{ fontSize: 25, fontWeight: "bold" }}>
            Congratulation!!
          </Text>
          <Text style={{ fontSize: 18, marginTop: 10, color: "gray" }}>
            Bạn đã hoàn thành tất cả câu hỏi!
          </Text>
        </View>
      )}
    </PaperProvider>
  );
};

export default TracNghiem_Nghe;

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
