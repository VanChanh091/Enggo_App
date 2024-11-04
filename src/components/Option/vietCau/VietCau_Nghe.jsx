import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Appbar, PaperProvider } from "react-native-paper";
import { playVoiceText } from "../../translate/PLayTranslateVoice";

const VietCau_Nghe = ({ navigation, route }) => {
  const { settings } = route.params;
  const { data } = route.params;
  const { screenNavigation } = route.params;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedWords, setSelectedWords] = useState([]);
  const [lives, setLives] = useState(3);
  const [wordOptions, setWordOptions] = useState([]); // Danh sách từ để chọn
  const [correctAnswer, setCorrectAnswer] = useState([]);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  const currentVocab = data[currentQuestion];

  useEffect(() => {
    if (currentVocab) {
      playVoiceText(currentVocab.en, "en");
    }
  }, [currentVocab]);

  // Khởi tạo danh sách từ khi từ vựng thay đổi
  useEffect(() => {
    let allOptions = [];

    //cau
    // en - vn
    if (settings.mode === "tu-nghia") {
      const correctWords = currentVocab.vn.split(" ").map((word, index) => ({
        id: index,
        word: word,
      }));

      const randomWords = data
        .filter((item) => item._id !== currentVocab._id) // Loại trừ câu hiện tại
        .map((item) => item.vn.split(" "))
        .flat()
        .filter(
          (word) => !correctWords.some((correct) => correct.word === word)
        ) // Loại bỏ các từ trùng lặp với câu trả lời đúng
        .map((word, index) => ({
          id: correctWords.length + index, // Gán id duy nhất cho từ ngẫu nhiên
          word: word,
        }));

      // Chọn ngẫu nhiên từ 2 đến 3 từ từ danh sách từ ngẫu nhiên
      const selectedRandomWords = shuffleArray(randomWords).slice(
        0,
        Math.floor(Math.random() * 2) + 5
      );

      // Trộn các từ đúng với từ ngẫu nhiên
      allOptions = shuffleArray([...correctWords, ...selectedRandomWords]);

      setCorrectAnswer(correctWords);
    } else {
      // nghia
      // vn - en

      // Tách từng chữ cái của từ tiếng Anh và loại bỏ khoảng trắng
      const correctLetters = splitWordIntoLetters(currentVocab.en)
        .filter((letter) => letter !== " ") // Loại bỏ khoảng trắng
        .map((letter, index) => ({
          id: index, // Gán id duy nhất cho từng chữ cái
          letter: letter,
        }));

      // Tạo các chữ cái ngẫu nhiên từ các từ khác trong dữ liệu
      const randomLetters = data
        .filter((item) => item.id !== currentVocab.id)
        .map((item) =>
          splitWordIntoLetters(item.en).filter((letter) => letter !== " ")
        )
        .flat()
        .map((letter, index) => ({
          id: correctLetters.length + index, // Đảm bảo id duy nhất cho từ ngẫu nhiên
          letter: letter,
        }));

      // Chọn một số lượng chữ cái ngẫu nhiên để không vượt quá tổng số tùy chọn cần thiết
      const selectedRandomLetter = shuffleArray(randomLetters).slice(
        0,
        Math.max(8 - correctLetters.length, 0) // Đảm bảo không chọn quá nhiều chữ cái
      );

      allOptions = shuffleArray([...correctLetters, ...selectedRandomLetter]);
      setCorrectAnswer(correctLetters);
    }

    setWordOptions(allOptions); // Cập nhật danh sách các tùy chọn (từ hoặc chữ cái)
    setSelectedWords([]); // Reset từ đã chọn
  }, [currentQuestion, settings.mode]);

  const splitWordIntoLetters = (word) => {
    return word.split(""); // Tách từng chữ cái của từ tiếng Anh
  };

  // Hàm trộn ngẫu nhiên các phần tử trong mảng
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const handleSelectWord = (wordObj) => {
    setSelectedWords((prevSelectedWords) => [...prevSelectedWords, wordObj]); // Thêm từ/chữ vào danh sách đã chọn
    setWordOptions(
      (prevWordOptions) =>
        prevWordOptions.filter((item) => item.id !== wordObj.id) // Chỉ xóa phần tử có id tương ứng
    );
  };

  const handleRemoveWord = (wordObj) => {
    setSelectedWords(
      (prevSelectedWords) =>
        prevSelectedWords.filter((item) => item.id !== wordObj.id) // Xóa phần tử khỏi danh sách đã chọn dựa trên id
    );
    setWordOptions((prevWordOptions) => [...prevWordOptions, wordObj]); // Thêm từ/chữ trở lại danh sách tùy chọn
  };

  // Tự động chuyển câu hỏi sau 1 giây
  const moveToNextWord = () => {
    setTimeout(() => {
      if (currentQuestion === data.length - 1) {
        setIsQuizCompleted(true);
      } else {
        setCurrentQuestion((prev) => prev + 1);
      }
    }, 1000);
  };

  const skipWord = () => {
    setTimeout(() => {
      if (currentQuestion === data.length - 1) {
        setIsQuizCompleted(true);
      } else {
        setCurrentQuestion((prev) => prev + 1);
      }
    }, 2000);
  };

  const checkAnswer = async () => {
    if (selectedWords.length === 0) {
      Alert.alert(
        "Thông báo",
        "Bạn chưa chọn từ nào, vui lòng chọn ít nhất một từ!"
      );
    } else if (
      selectedWords.join(" ").toLowerCase() ===
      correctAnswer.join(" ").toLowerCase()
    ) {
      Alert.alert("Chính xác", "Bạn đã ghép đúng câu!");
      await playVoiceText(currentVocab.en, "en");
      moveToNextWord();
    } else {
      Alert.alert("Sai", "Câu ghép chưa đúng, hãy thử lại.");
      if (lives === 1) {
        Alert.alert("Kết thúc", "Bạn đã hết trái tim!");
        setLives(0);
        setIsQuizCompleted(true); // Kết thúc bài kiểm tra khi hết trái tim
        // return;
      } else {
        setLives((prev) => prev - 1);
      }
      setSelectedWords([]);
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
                <TouchableOpacity
                  onPress={() => playVoiceText(currentVocab.en, "en")}
                >
                  <Image
                    source={require("../../../img/imgBoTuVung/voice.png")}
                    style={{ width: 75, height: 75, resizeMode: "contain" }}
                  />
                </TouchableOpacity>
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
                {selectedWords.map((wordObj, index) => (
                  <TouchableOpacity
                    key={wordObj.id} // Sử dụng id duy nhất
                    onPress={() => handleRemoveWord(wordObj)}
                    style={styles.selectedWord}
                  >
                    <Text style={styles.wordText}>
                      {wordObj.word || wordObj.letter}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          {/* item */}
          <View style={{ flex: 6.5 }}>
            {/* skip */}
            <View
              style={{
                flex: 1,
                alignItems: "flex-end",
              }}
            >
              <TouchableOpacity onPress={skipWord}>
                <Text style={{ fontSize: 18, color: "gray", marginRight: 20 }}>
                  Bỏ qua
                </Text>
              </TouchableOpacity>
            </View>

            {/* choose word */}
            <View style={{ flex: 6.5 }}>
              {/* Hiển thị các từ bên dưới */}
              <View style={styles.wordOptionsContainer}>
                {wordOptions.map((wordObj) => (
                  <TouchableOpacity
                    key={wordObj.id} // Sử dụng id duy nhất
                    onPress={() => handleSelectWord(wordObj)}
                    style={styles.wordOption}
                  >
                    <Text style={styles.wordText}>
                      {wordObj.word || wordObj.letter}
                    </Text>
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
            onPress={() => navigation.navigate(screenNavigation)}
          >
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>OK</Text>
          </TouchableOpacity>
        </View>
      )}
    </PaperProvider>
  );
};

export default VietCau_Nghe;

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
