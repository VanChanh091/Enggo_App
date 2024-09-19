import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Audio } from "expo-av";
import { Appbar, PaperProvider } from "react-native-paper";

const VietCau_Doc = ({ navigation, route }) => {
  const { settings } = route.params;
  const { data } = route.params;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [sound, setSound] = useState(null);
  const [selectedWords, setSelectedWords] = useState([]); // Lưu trữ các từ đã chọn
  const [lives, setLives] = useState(3); // Số lượng trái tim
  const [wordOptions, setWordOptions] = useState([]); // Danh sách từ để chọn
  const [correctAnswer, setCorrectAnswer] = useState([]); // Câu trả lời chính xác
  const [isQuizCompleted, setIsQuizCompleted] = useState(false); // Kiểm tra đã hoàn thành chưa

  const currentVocab = data[currentQuestion]; // Lấy ra từ vựng hiện tại

  // Khởi tạo danh sách từ khi từ vựng thay đổi
  useEffect(() => {
    const correctWords = currentVocab.vn.split(" "); // Từ đúng
    const randomWords = data
      .filter((item) => item.id !== currentVocab.id) // Loại bỏ từ hiện tại
      .map((item) => item.vn.split(" ")) // Lấy từ tiếng Việt
      .flat(); // Làm phẳng mảng từ
    const selectedRandomWords = shuffleArray(randomWords).slice(
      0,
      8 - correctWords.length
    ); // Lấy ngẫu nhiên từ không trùng với câu đúng

    const allWords = shuffleArray([...correctWords, ...selectedRandomWords]); // Trộn các từ đúng và từ ngẫu nhiên
    setWordOptions(allWords); // Cập nhật các tùy chọn từ
    setCorrectAnswer(correctWords); // Cập nhật câu trả lời đúng
    setSelectedWords([]); // Reset từ đã chọn
  }, [currentQuestion]);

  // Hàm trộn ngẫu nhiên các phần tử trong mảng
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const handleSelectWord = (word) => {
    setSelectedWords([...selectedWords, word]); // Thêm từ vào danh sách đã chọn
    setWordOptions(wordOptions.filter((item) => item !== word)); // Loại từ khỏi danh sách tùy chọn
  };

  const handleRemoveWord = (word) => {
    setSelectedWords(selectedWords.filter((item) => item !== word)); // Bỏ từ khỏi danh sách đã chọn
    setWordOptions([...wordOptions, word]); // Thêm từ trở lại danh sách tùy chọn
  };

  const playWordSound = async () => {
    try {
      // Nếu đã có âm thanh đang phát, hủy âm thanh trước khi phát từ mới
      if (sound) {
        await sound.unloadAsync();
        setSound(null);
      }

      // Tạo âm thanh mới từ file require
      const { sound: newSound } = await Audio.Sound.createAsync(
        currentVocab.audio
      );

      setSound(newSound); // Lưu lại đối tượng âm thanh mới để quản lý

      // Phát âm thanh
      await newSound.playAsync();
    } catch (error) {
      console.error("Lỗi khi phát âm thanh: ", error);
    }
  };

  const checkAnswer = async () => {
    if (
      selectedWords.join(" ").toLowerCase() ===
      correctAnswer.join(" ").toLowerCase()
    ) {
      Alert.alert("Chính xác", "Bạn đã ghép đúng câu!");
      await playWordSound();

      // Tự động chuyển câu hỏi sau 1 giây
      setTimeout(() => {
        if (currentQuestion === data.length - 1) {
          setIsQuizCompleted(true);
        } else {
          setCurrentQuestion((prev) => prev + 1);
        }
      }, 2000);
    } else {
      Alert.alert("Sai", "Câu ghép chưa đúng, hãy thử lại.");
      if (lives === 1) {
        Alert.alert("Kết thúc", "Bạn đã hết trái tim!");
        setIsQuizCompleted(true); // Kết thúc bài kiểm tra khi hết trái tim
        return;
      }
      setLives((prev) => prev - 1); // Trừ 1 trái tim nếu sai
    }
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
        <View style={{ flex: 1 }}>
          {/* box match word */}
          <View
            style={{
              flex: 3.5,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: "90%",
                height: "85%",
                borderRadius: 12,
                backgroundColor: "white",
              }}
            >
              <View
                style={{
                  flex: 1,
                  borderBottomWidth: 1,
                  borderColor: "#d0d0d0",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontWeight: 600, fontSize: 28 }}>
                  {settings.mode === "tu-nghia"
                    ? currentVocab.en
                    : currentVocab.vn}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "white",
                }}
              >
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
          </View>
          {/* item */}
          <View style={{ flex: 6.5 }}>
            {/* ignore */}
            <View
              style={{
                flex: 1,
                alignItems: "flex-end",
              }}
            >
              <TouchableOpacity>
                <Text style={{ fontSize: 18, color: "gray", marginRight: 20 }}>
                  Bỏ qua
                </Text>
              </TouchableOpacity>
            </View>

            {/* choose word */}
            <View style={{ flex: 6.5 }}>
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
            </View>

            {/* button */}
            <View style={{ flex: 2.5, alignItems: "center" }}>
              <TouchableOpacity
                style={{
                  width: "65%",
                  height: 50,
                  borderRadius: 12,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 20,
                  backgroundColor: "#F4C33A",
                }}
                onPress={checkAnswer}
              >
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                  Kiểm tra
                </Text>
              </TouchableOpacity>
            </View>
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
          {/* check lives === 0  */}
          {lives === 0 ? (
            <Text style={{ fontSize: 18, marginTop: 10, color: "gray" }}>
              Cố gắng lên bạn nhé!
            </Text>
          ) : (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={{ fontWeight: "bold", fontSize: 22 }}>
                Congratulation!
              </Text>
              <Text style={{ fontSize: 18, marginTop: 7, color: "gray" }}>
                Bạn đã hoàn thành tất cả câu hỏi!
              </Text>
            </View>
          )}

          {/* navigation to BoTuVung_S1 */}
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
            onPress={() => navigation.navigate("BoTuVung_S1")}
          >
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>OK</Text>
          </TouchableOpacity>
        </View>
      )}
    </PaperProvider>
  );
};

export default VietCau_Doc;

const styles = StyleSheet.create({
  selectedWord: {
    margin: 4,
  },
  wordOptionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    flex: 3,
  },
  wordOption: {
    backgroundColor: "white",
    padding: 10,
    margin: 5,
    borderRadius: 5,
    minWidth: 55,
    maxHeight: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  wordText: {
    fontSize: 18,
  },
});
