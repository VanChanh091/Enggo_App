import {
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
import { TextInput } from "react-native";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { playVoiceText } from "../../../components/translate/PLayTranslateVoice";

const ListenAndRewrite = ({ route }) => {
  const { data } = route.params;

  const [visibleTranscripts, setVisibleTranscripts] = useState({});
  const [useInput, setUserInput] = useState({});

  const allText = data.content.map((item) => item.text).join(" ");

  const toggleTranscript = (id) => {
    setVisibleTranscripts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <PaperProvider>
      <HeaderScreen title={"Nghe chép chính tả"} />

      <View style={{ flex: 1 }}>
        <View style={{ flex: 8.2 }}>
          <ScrollView>
            {data.content.map((item, index) => (
              <View
                key={index}
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
                  }}
                >
                  <TextInput
                    placeholder="Nghe và ghi những từ nghe được vào đây..."
                    style={{
                      fontWeight: 400,
                      fontSize: 17,
                      width: "100%",
                      height: "100%",
                      paddingHorizontal: 10,
                      borderRadius: 10,
                    }}
                  />
                </View>

                <View
                  style={{
                    width: "90%",
                    height: 120,
                    borderRadius: 10,
                    borderWidth: 1,
                  }}
                >
                  <View style={{ flex: 1, flexDirection: "row" }}>
                    <View style={{ flex: 8.5, borderRightWidth: 1 }}>
                      {visibleTranscripts[index] ? (
                        <ScrollView
                          showsHorizontalScrollIndicator={false}
                          showsVerticalScrollIndicator={false}
                        >
                          <Text
                            style={{
                              fontSize: 16,
                              paddingHorizontal: 12,
                              paddingVertical: 10,
                            }}
                          >
                            {item.text}
                          </Text>
                        </ScrollView>
                      ) : (
                        <Text></Text>
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

                      <TouchableOpacity style={{ paddingTop: 15 }}>
                        <Feather
                          name="check-square"
                          size={28}
                          color="#2A7BD3"
                        />
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
                  onPress={() => toggleTranscript(index)}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      color: "#2A7BD3",
                      fontWeight: 500,
                    }}
                  >
                    {visibleTranscripts[index]
                      ? "Ẩn Transcript"
                      : "Hiện Transcript"}
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
