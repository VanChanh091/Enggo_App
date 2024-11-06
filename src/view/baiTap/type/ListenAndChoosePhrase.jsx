import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { PaperProvider } from "react-native-paper";
import HeaderScreen from "../../../components/header/HeaderScreen";
import PlayVoice from "../../../components/playVoice/PlayVoice";
import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import { CheckBox } from "@rneui/themed";

const ListenAndChoosePhrase = ({ route }) => {
  const { data } = route.params;

  const allText = data.content.map((item) => item.text).join(" ");

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [results, setResults] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);

  const handleOptionSelect = (questionIndex, optionIndex) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: optionIndex, // Store the selected option index for each question index
    }));
  };

  // Check answers function
  const checkAnswers = () => {
    let score = 0;
    const newResults = data.choosePhrase.map((item, questionIndex) => {
      const selectedOptionIndex = selectedAnswers[questionIndex];
      const selectedOptionText = item.options[selectedOptionIndex];
      const correctAnswerText = item.correctAnswer;

      const isCorrect =
        selectedOptionText &&
        selectedOptionText.trim().toLowerCase() ===
          correctAnswerText.trim().toLowerCase();

      if (isCorrect) {
        score += 1;
      }

      return isCorrect; // Store true for correct, false for incorrect
    });

    setResults(newResults); // Update the results state
    setIsChecked(true); // Allow displaying icons
    Alert.alert(
      "Quiz Result",
      `You scored ${score} out of ${data.choosePhrase.length}!`
    );
  };

  const handleShowAllAnswers = () => {
    const updatedAnswers = { ...selectedAnswers };
    data.choosePhrase.forEach((item, questionIndex) => {
      if (updatedAnswers[questionIndex] === undefined) {
        const correctAnswerIndex = item.options.findIndex(
          (option) =>
            option.trim().toLowerCase() ===
            item.correctAnswer.trim().toLowerCase()
        );
        updatedAnswers[questionIndex] = correctAnswerIndex;
      }
    });

    setSelectedAnswers(updatedAnswers);
    setShowAnswers(true);
  };

  return (
    <PaperProvider>
      <HeaderScreen title={"Nghe và trả lời câu hỏi"} />

      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ flex: 8.2 }}>
          <ScrollView>
            <View style={{ width: "100%", height: 100 }}>
              <Text
                style={{
                  fontWeight: 500,
                  fontSize: 19,
                  paddingHorizontal: 12,
                  paddingTop: 10,
                }}
              >
                {data.title}
              </Text>
            </View>

            {data.choosePhrase.map((item, questionIndex) => {
              const isCorrect = isChecked && results[questionIndex];

              return (
                <View key={questionIndex}>
                  <View>
                    <Text
                      style={{
                        fontWeight: 600,
                        fontSize: 18,
                        paddingHorizontal: 15,
                      }}
                    >
                      {questionIndex + 1}. {item.question}{" "}
                      {isChecked && (
                        <FontAwesome
                          name={isCorrect ? "check-circle" : "times-circle"} // Show check or X based on correctness
                          size={28}
                          color={isCorrect ? "green" : "red"}
                        />
                      )}
                    </Text>
                  </View>

                  {item.options.map((option, optionIndex) => (
                    <View key={optionIndex} style={{ flexDirection: "row" }}>
                      <View
                        style={{
                          flex: 1.8,
                          justifyContent: "center",
                          alignItems: "flex-end",
                        }}
                      >
                        <CheckBox
                          checked={
                            selectedAnswers[questionIndex] === optionIndex
                          }
                          onPress={() =>
                            handleOptionSelect(questionIndex, optionIndex)
                          }
                          checkedIcon="dot-circle-o"
                          uncheckedIcon="circle-o"
                        />
                      </View>
                      <View style={{ flex: 8.2, justifyContent: "center" }}>
                        <Text style={{ fontSize: 16 }}>{option}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              );
            })}

            <View
              style={{
                width: "100%",
                height: 180,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* check answer */}
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

              {/* show answer */}
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
                onPress={handleShowAllAnswers}
              >
                <View
                  style={{
                    flex: 2,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Ionicons
                    name="checkmark-done-outline"
                    color="white"
                    size={28}
                  ></Ionicons>
                </View>
                <View style={{ flex: 8 }}>
                  <Text
                    style={{ fontSize: 16, color: "#fff", fontWeight: "bold" }}
                  >
                    HIỂN THỊ ĐÁP ÁN
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>

        <View
          style={{
            flex: 1.8,
            borderTopWidth: 1,
            borderColor: "#d0d0d0",
          }}
        >
          <PlayVoice text={allText} />
        </View>
      </View>
    </PaperProvider>
  );
};

export default ListenAndChoosePhrase;

const styles = StyleSheet.create({});
