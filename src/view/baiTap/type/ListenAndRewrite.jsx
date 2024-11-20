import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import { PaperProvider } from "react-native-paper";
import HeaderScreen from "../../../components/header/HeaderScreen";
import PlayVoice from "../../../components/playVoice/PlayVoice";
import { TextInput } from "react-native";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { playVoiceText } from "../../../components/translate/PLayTranslateVoice";
import themeContext from "../../../context/themeContext";

const ListenAndRewrite = ({ route }) => {
  const { data } = route.params;
  const theme = useContext(themeContext);

  const [visibleTranscripts, setVisibleTranscripts] = useState({});
  const [userInput, setUserInput] = useState({});
  const [answerStatus, setAnswerStatus] = useState({});

  const allText = data.content.map((item) => item.text).join(" ");

  const toggleTranscript = (id) => {
    setVisibleTranscripts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleInputChange = (id, value) => {
    setUserInput((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const checkAnswer = (id, correctText) => {
    const inputValue = userInput[id] || ""; // Đảm bảo giá trị không bị undefined
    if (inputValue.trim().toLowerCase() === correctText.trim().toLowerCase()) {
      Alert.alert("Chính xác!", "Bạn đã nhập đúng.");
      setAnswerStatus((prev) => ({
        ...prev,
        [id]: "correct",
      }));
    } else {
      Alert.alert("Sai rồi", "Bạn đã nhập không chính xác.");
      setAnswerStatus((prev) => ({
        ...prev,
        [id]: "incorrect",
      }));
    }
  };

  const getBorderColor = (id) => {
    if (answerStatus[id] === "correct") return "green";
    if (answerStatus[id] === "incorrect") return "red";
    return theme.color; // Mặc định là màu đen
  };

  return (
    <PaperProvider>
      <HeaderScreen title={"Nghe chép chính tả"} />

      <View style={{ flex: 1, backgroundColor: theme.background }}>
        <View style={{ flex: 8.2 }}>
          <ScrollView>
            {data.content.map((item, index) => (
              <View
                key={item._id}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: "90%",
                    height: 120,
                    borderRadius: 10,
                    borderWidth: 1,
                    marginVertical: 12,
                    borderColor: getBorderColor(item._id),
                  }}
                >
                  <TextInput
                    placeholder="Nghe và ghi những từ nghe được vào đây..."
                    style={{
                      fontWeight: "400",
                      fontSize: 17,
                      width: "100%",
                      height: "100%",
                      paddingHorizontal: 10,
                      borderRadius: 10,
                      color: theme.color,
                    }}
                    multiline={true}
                    textAlignVertical="top"
                    value={userInput[item._id] || ""}
                    onChangeText={(text) => handleInputChange(item._id, text)}
                    autoCorrect={false}
                  />
                </View>

                <View
                  style={{
                    width: "90%",
                    height: 120,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: getBorderColor(item._id),
                  }}
                >
                  <View style={{ flex: 1, flexDirection: "row" }}>
                    <View
                      style={{
                        flex: 8.5,
                        borderRightWidth: 1,
                        borderColor: getBorderColor(item._id),
                      }}
                    >
                      {visibleTranscripts[item._id] ? (
                        <ScrollView
                          showsHorizontalScrollIndicator={false}
                          showsVerticalScrollIndicator={false}
                        >
                          <Text
                            style={{
                              fontSize: 16,
                              paddingHorizontal: 12,
                              paddingVertical: 10,
                              color: theme.color,
                            }}
                          >
                            {item.text}
                          </Text>
                        </ScrollView>
                      ) : (
                        <Text
                          style={{
                            fontSize: 16,
                            color: "gray",
                            paddingHorizontal: 12,
                            paddingVertical: 12,
                          }}
                        >
                          Văn bản đã bị ẩn
                        </Text>
                      )}
                    </View>

                    <View
                      style={{
                        flex: 1.5,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => playVoiceText(item.text, "en")}
                      >
                        <FontAwesome
                          name="volume-up"
                          size={28}
                          color="#2A7BD3"
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={{ paddingTop: 15 }}
                        onPress={() => toggleTranscript(item._id)}
                      >
                        {visibleTranscripts[item._id] ? (
                          <Feather name="eye" size={26} color="#2A7BD3" />
                        ) : (
                          <Feather name="eye-off" size={26} color="#2A7BD3" />
                        )}
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                <TouchableOpacity
                  style={{
                    width: "65%",
                    height: 60,
                    borderRadius: 10,
                    backgroundColor: "#D1E4F3",
                    justifyContent: "center",
                    alignItems: "center",
                    marginVertical: 12,
                  }}
                  onPress={() => checkAnswer(item._id, item.text)}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      color: "#2A7BD3",
                      fontWeight: "500",
                    }}
                  >
                    Kiểm tra đáp án
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
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

export default ListenAndRewrite;

const styles = StyleSheet.create({});
