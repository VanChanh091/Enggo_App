import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { PaperProvider } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import HeaderScreen from "../../header/HeaderScreen";
import { playVoiceText } from "../../translate/PLayTranslateVoice";
import themeContext from "../../../context/themeContext";

const LuyenDoc = ({ route }) => {
  const { dataVocab } = route.params;

  const theme = useContext(themeContext);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [recording, setRecording] = useState(null);
  const [sound, setSound] = useState(null);
  const [recordingURI, setRecordingURI] = useState(null);

  const currentVocab = dataVocab[currentIndex];

  useEffect(() => {
    if (currentVocab) {
      playVoiceText(currentVocab.en, "en");
    }
  }, [currentVocab]);

  // Chuyển đến từ tiếp theo
  const handleNext = async () => {
    if (currentIndex < dataVocab.length - 1) {
      if (sound) {
        await sound.unloadAsync(); // Hủy âm thanh trước khi chuyển sang từ mới
        setSound(null);
      }
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Quay về từ trước đó
  const handlePrevious = async () => {
    if (currentIndex > 0) {
      if (sound) {
        await sound.unloadAsync(); // Hủy âm thanh trước khi chuyển sang từ mới
        setSound(null);
      }
      setCurrentIndex(currentIndex - 1);
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
  const playSound = async () => {
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

  useEffect(() => {
    return () => {
      if (sound) {
        console.log("Hủy âm thanh...");
        sound.unloadAsync(); // Hủy âm thanh sau khi dùng xong
      }
    };
  }, [sound]);

  return (
    <PaperProvider>
      <HeaderScreen title="" />

      <View style={{ flex: 1, backgroundColor: theme.background }}>
        {/* vocab */}
        <View
          style={{
            flex: 1.3,
            flexDirection: "row",
          }}
        >
          <View
            style={{
              flex: 2.5,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => playVoiceText(currentVocab.en, "en")}
            >
              <Image
                source={require("../../../img/imgBoTuVung/voice.png")}
                style={{ width: 70, height: 70, resizeMode: "contain" }}
              />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 7.5, justifyContent: "center" }}>
            <Text style={{ fontSize: 18, color: "#2A7BD3", fontWeight: 500 }}>
              {currentVocab.en}
            </Text>
            <Text
              style={{
                fontSize: 16,
                marginTop: 4,
                color: "gray",
                color: theme.color,
              }}
            >
              {currentVocab.vn}
            </Text>
          </View>
        </View>

        {/* mic */}
        <View
          style={{
            flex: 7.5,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={recording ? stopRecording : startRecording}
          >
            <Image
              source={require("../../../img/imgBoTuVung/mic.png")}
              style={{ width: 150, height: 150, resizeMode: "contain" }}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 16,
              color: "gray",
              marginTop: 5,
              color: theme.color,
            }}
          >
            {recording
              ? "Đang ghi âm... Nhấn để dừng"
              : "Chạm vào micro để ghi âm"}
          </Text>
        </View>

        {/* button */}
        <View style={{ flex: 2.2 }}>
          {/* previous and next vocab */}
          <View
            style={{
              flex: 0.6,
              borderBottomWidth: 1,
              borderColor: "#D0D0D0",
              flexDirection: "row",
            }}
          >
            <View
              style={{
                flex: 2.5,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity onPress={handlePrevious}>
                <Ionicons
                  name="play-back-outline"
                  size={35}
                  color={theme.color}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 5,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{ fontWeight: 500, fontSize: 20, color: theme.color }}
              >{`${currentIndex + 1}/${dataVocab.length}`}</Text>
            </View>
            <View
              style={{
                flex: 2.5,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity onPress={handleNext}>
                <Ionicons
                  name="play-forward-outline"
                  size={35}
                  color={theme.color}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* record and listen back */}
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              backgroundColor: theme.background,
            }}
          >
            <View
              style={{
                flex: 1,
                borderRightWidth: 1,
                borderColor: "#D0D0D0",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={recording ? stopRecording : startRecording}
              >
                <Ionicons
                  name="mic-circle-outline"
                  size={40}
                  color={theme.color}
                />
                <Text
                  style={{ fontSize: 18, marginLeft: 6, color: theme.color }}
                >
                  Ghi âm
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 1,
                borderColor: theme.border,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={playSound}
              >
                <Ionicons
                  name="volume-medium-outline"
                  size={40}
                  color={theme.color}
                />
                <Text
                  style={{ fontSize: 18, marginLeft: 6, color: theme.color }}
                >
                  Nghe lại
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </PaperProvider>
  );
};

export default LuyenDoc;

const styles = StyleSheet.create({});
