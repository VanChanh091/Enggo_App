import {
  ScrollView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import { PaperProvider } from "react-native-paper";
import HeaderScreen from "../../../components/header/HeaderScreen";
import { Ionicons } from "@expo/vector-icons";
import {
  playVoiceText,
  stopVoiceText,
} from "../../../components/translate/PLayTranslateVoice";
import { Audio } from "expo-av";
import themeContext from "../../../context/themeContext";

const Parody = ({ route }) => {
  const { data } = route.params;

  const theme = useContext(themeContext);

  const [isPlaying, setIsPlaying] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [recording, setRecording] = useState(null);
  const [recordingURI, setRecordingURI] = useState(null);
  const [sound, setSound] = useState(null);

  const togglePlay = (text, index) => {
    setIsPlaying(!isPlaying);
    if (isPlaying && activeIndex === index) {
      stopVoiceText();
      setActiveIndex(null);
    } else {
      playVoiceText(text, "en");
      setActiveIndex(index);
    }
  };

  // Bắt đầu ghi âm
  const startRecording = async () => {
    try {
      console.log("Đang chuẩn bị ghi âm...");
      await Audio.requestPermissionsAsync(); // Yêu cầu quyền truy cập microphone
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
      console.log("Bắt đầu ghi âm...");
    } catch (err) {
      console.error("Không thể ghi âm:", err);
    }
  };

  // Dừng ghi âm
  const stopRecording = async () => {
    try {
      console.log("Dừng ghi âm...");
      setRecording(null);
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI(); // Lấy URI của file ghi âm
      console.log("Ghi âm được lưu tại:", uri);
      setRecordingURI(uri);
    } catch (error) {
      console.error("Không thể dừng ghi âm:", error);
    }
  };

  // Phát lại âm thanh đã ghi
  const playRecording = async () => {
    if (recordingURI) {
      try {
        if (sound) {
          await sound.unloadAsync(); // Hủy âm thanh trước khi phát lại
          setSound(null);
        }
        console.log("Đang phát âm thanh...");
        const { sound } = await Audio.Sound.createAsync({ uri: recordingURI });
        setSound(sound);
        await sound.playAsync();
      } catch (error) {
        console.error("Lỗi khi phát lại âm thanh: ", error);
      }
    }
  };

  return (
    <PaperProvider>
      <HeaderScreen title={"Nói nhại"} />

      <View style={{ flex: 1, backgroundColor: theme.background }}>
        <ScrollView>
          {data.content.map((item, index) => (
            <View
              key={index}
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: "90%",
                  height: 170,
                  borderWidth: 1,
                  borderColor: theme.color,
                  borderRadius: 10,
                  marginVertical: 10,
                }}
                key={index}
              >
                <View
                  style={{
                    flex: 7,
                    borderBottomWidth: 1,
                    borderColor: theme.color,
                  }}
                >
                  <ScrollView>
                    <Text
                      style={{
                        fontWeight: 400,
                        fontSize: 16,
                        paddingHorizontal: 10,
                        paddingVertical: 10,
                        color: theme.color,
                      }}
                    >
                      {item.text}
                    </Text>
                  </ScrollView>
                </View>
                <View
                  style={{
                    flex: 3,
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  {/* play text */}
                  {isPlaying && activeIndex === index ? (
                    <TouchableOpacity
                      key={index}
                      onPress={() => togglePlay(item.text, index)}
                    >
                      <Ionicons
                        name="pause-circle-outline"
                        color={theme.color}
                        size={32}
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => togglePlay(item.text, index)}
                    >
                      <Ionicons
                        name="play-circle-outline"
                        color={theme.color}
                        size={32}
                      />
                    </TouchableOpacity>
                  )}

                  {/* recording text */}
                  <TouchableOpacity
                    style={{ paddingHorizontal: 12 }}
                    onPress={recording ? stopRecording : startRecording}
                  >
                    <Ionicons name="mic-sharp" color={theme.color} size={32} />
                  </TouchableOpacity>

                  {/* play recording */}
                  <TouchableOpacity onPress={playRecording}>
                    <Ionicons
                      name="volume-medium-sharp"
                      color={theme.color}
                      size={32}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <Text
                style={{
                  fontSize: 16,
                  color: "gray",
                  marginVertical: 5,
                  color: theme.color,
                }}
              >
                {recording
                  ? "Đang ghi âm... Nhấn để dừng"
                  : "Chạm vào micro để ghi âm"}
              </Text>
            </View>
          ))}
          <View style={{ width: "100%", height: 45 }}></View>
        </ScrollView>
      </View>
    </PaperProvider>
  );
};

export default Parody;

const styles = StyleSheet.create({});
