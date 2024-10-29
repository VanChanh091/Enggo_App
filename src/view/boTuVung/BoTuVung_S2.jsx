import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { PaperProvider } from "react-native-paper";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import HeaderScreen from "../../components/header/HeaderScreen";
import { playVoiceText } from "../../components/translate/PLayTranslateVoice";

const BoTuVung_S2 = ({ navigation, route }) => {
  const { data } = route.params;

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
                  <TouchableOpacity
                    onPress={() => playVoiceText(vocabulary.en, 1)}
                  >
                    <FontAwesome name="volume-up" size={28} color="black" />
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
