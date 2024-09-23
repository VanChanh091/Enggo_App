import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { Appbar, PaperProvider } from "react-native-paper";

const VietCau_Nghe = ({ navigation, route }) => {
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
    let allOptions = [];

    if (settings.mode === "tu-nghia") {
      // Tách từ tiếng Việt (theo từ)
      const correctWords = currentVocab.vn.split(" ").map((word, index) => ({
        id: index, // Gán id duy nhất cho từng từ
        word: word, // Giá trị từ
      }));

      const randomWords = data
        .filter((item) => item.id !== currentVocab.id)
        .map((item) => item.vn.split(" "))
        .flat()
        .map((word, index) => ({
          id: correctWords.length + index, // Đảm bảo id duy nhất cho từ ngẫu nhiên
          word: word,
        }));

      const selectedRandomWords = shuffleArray(randomWords).slice(
        0,
        8 - correctWords.length
      );

      allOptions = shuffleArray([...correctWords, ...selectedRandomWords]); // Trộn các tùy chọn từ tiếng Việt
      setCorrectAnswer(correctWords); // Đặt câu trả lời đúng là các từ tiếng Việt
    } else {
      // Tách từng chữ cái của từ tiếng Anh
      const correctLetters = splitWordIntoLetters(currentVocab.en).map(
        (letter, index) => ({
          id: index, // Gán id duy nhất cho từng chữ cái
          letter: letter,
        })
      );

      const randomLetters = data
        .filter((item) => item.id !== currentVocab.id)
        .map((item) => item.en.split(" "))
        .flat()
        .map((word, index) => ({
          id: correctLetters.length + index, // Đảm bảo id duy nhất cho từ ngẫu nhiên
          letter: word,
        }));

      const selectedRandomLetter = shuffleArray(randomLetters).slice(
        0,
        8 - correctLetters.length
      );

      allOptions = shuffleArray([...selectedRandomLetter, ...correctLetters]); // Trộn các tùy chọn chữ cái
      setCorrectAnswer(correctLetters); // Đặt câu trả lời đúng là các chữ cái
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

  const playWordSound = async () => {
    try {
      // Nếu đã có âm thanh đang phát, hủy âm thanh trước khi phát từ mới
      if (sound) {
        await sound.unloadAsync();
        setSound(null);
      }

      // Tạo âm thanh mới từ file require
      const { sound: newSound } = await Audio.Sound.createAsync({
        uri: currentVocab.audioEn,
      });

      setSound(newSound); // Lưu lại đối tượng âm thanh mới để quản lý

      // Phát âm thanh
      await newSound.playAsync();
    } catch (error) {
      console.error("Lỗi khi phát âm thanh: ", error);
    }
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
      await playWordSound();
      moveToNextWord();
    } else {
      Alert.alert("Sai", "Câu ghép chưa đúng, hãy thử lại.");
      if (lives === 1) {
        // Alert.alert("Kết thúc", "Bạn đã hết trái tim!");
        setIsQuizCompleted(true); // Kết thúc bài kiểm tra khi hết trái tim
        // return;
      } else {
        setLives((prev) => prev - 1); // Trừ 1 trái tim nếu sai
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
              <TouchableOpacity onPress={moveToNextWord}>
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
            onPress={() => navigation.navigate("BoTuVung_S1")}
          >
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>OK</Text>
          </TouchableOpacity>
        </View>
      )}
    </PaperProvider>
  );
};

export default VietCau_Nghe;

const styles = StyleSheet.create({});
