import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { PaperProvider } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import HeaderScreen from "../../components/header/HeaderScreen";

const BoTuVung_S2 = ({ navigation, route }) => {
  const { data } = route.params;

  const [sound, setSound] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentVocab = data[currentIndex];

  // Hàm phát âm thanh cho từ vựng hiện tại
  const playWordSound = async () => {
    try {
      // Nếu đã có âm thanh đang phát, hủy âm thanh trước khi phát từ mới
      if (sound) {
        await sound.unloadAsync();
        setSound(null);
      }
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        shouldDuckAndroid: false,
        staysActiveInBackground: false,
      });

      // Tạo âm thanh mới từ file require
      const { sound: newSound } = await Audio.Sound.createAsync(
        // currentVocab.audio
        currentVocab.audioEn
        // { uri: currentVocab.audioEn }
      );

      setSound(newSound); // Lưu lại đối tượng âm thanh mới để quản lý

      // Phát âm thanh
      await newSound.playAsync();
    } catch (error) {
      console.error("Lỗi khi phát âm thanh: ", error);
    }
  };

  return (
    <PaperProvider>
      <HeaderScreen title={data.titleEn} />

      <View style={{ flex: 1 }}>
        <View
          style={{
            width: "100%",
            height: 175,
            borderBottomWidth: 1,
            flexDirection: "row",
            borderColor: "#D0D0D0",
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Luyen viet */}
            <TouchableOpacity
              style={{
                width: "85%",
                height: "40%",
                borderWidth: 1,
                borderRadius: 12,
                borderColor: "gray",
                justifyContent: "center",
                alignItems: "center",
                marginRight: -12,
              }}
              onPress={() =>
                navigation.navigate("SettingTest_VietCau", {
                  dataVocab: data.vocab,
                })
              }
            >
              <Image
                source={require("../../img/imgBoTuVung/writting.png")}
                style={{ width: 35, height: 35, resizeMode: "contain" }}
              />
              <Text style={{ fontSize: 18 }}>Luyện viết</Text>
            </TouchableOpacity>

            {/* Luyen doc */}
            <TouchableOpacity
              style={{
                width: "85%",
                height: "40%",
                borderWidth: 1,
                borderRadius: 12,
                borderColor: "gray",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10,
                marginRight: -12,
              }}
              onPress={() =>
                navigation.navigate("LuyenDoc", { dataVocab: data.vocab })
              }
            >
              <Ionicons name="mic-outline" size={35} color="black" />
              <Text style={{ fontSize: 18 }}>Luyện đọc</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            {/* trac nghiem */}
            <TouchableOpacity
              style={{
                width: "85%",
                height: "40%",
                borderWidth: 1,
                borderRadius: 12,
                borderColor: "gray",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: -10,
              }}
              onPress={() =>
                navigation.navigate("SettingTest_TracNghiem", {
                  dataVocab: data.vocab,
                })
              }
            >
              <Ionicons name="checkbox-outline" size={35} color="black" />
              <Text style={{ fontSize: 18 }}>Trắc nghiệm</Text>
            </TouchableOpacity>

            {/* ghep cap */}
            <TouchableOpacity
              style={{
                width: "85%",
                height: "40%",
                borderWidth: 1,
                borderRadius: 12,
                borderColor: "gray",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10,
                marginLeft: -10,
              }}
              onPress={() =>
                navigation.navigate("GhepCap", { dataVocab: data.vocab })
              }
            >
              <Image
                source={require("../../img/imgBoTuVung/match.png")}
                style={{ width: 35, height: 35, resizeMode: "contain" }}
              />
              <Text style={{ fontSize: 18 }}>Ghép cặp</Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView>
          <View
            style={{
              flex: 1,
              backgroundColor: "#F1F1F1",
              alignItems: "center",
            }}
          >
            {data.vocab.map((vocabulary) => (
              <View
                key={vocabulary.id}
                style={{
                  width: "92%",
                  height: 60,
                  borderWidth: 1,
                  borderRadius: 12,
                  borderColor: "gray",
                  marginTop: 12,
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    flex: 8.5,
                    borderRightWidth: 1,
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontWeight: 600,
                      fontSize: 18,
                      marginLeft: 15,
                      color: "#2A7BD3",
                    }}
                  >
                    {vocabulary.en}
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      marginLeft: 15,
                      marginTop: 4,
                      color: "gray",
                    }}
                  >
                    {vocabulary.vn}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1.5,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity onPress={playWordSound}>
                    <Ionicons name="mic-outline" size={28} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </PaperProvider>
  );
};

export default BoTuVung_S2;

const styles = StyleSheet.create({});
