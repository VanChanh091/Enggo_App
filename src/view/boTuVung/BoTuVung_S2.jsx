import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext } from "react";
import { PaperProvider } from "react-native-paper";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import HeaderScreen from "../../components/header/HeaderScreen";
import { playVoiceText } from "../../components/translate/PLayTranslateVoice";
import themeContext from "../../context/themeContext";
import { favoriteContext } from "../../context/favoriteContext";

const BoTuVung_S2 = ({ navigation, route }) => {
  const { data } = route.params;

  const theme = useContext(themeContext);
  const { favorites, setFavorites } = useContext(favoriteContext);

  const toggleFavorite = (word) => {
    if (favorites.some((fav) => fav._id === word._id)) {
      setFavorites(favorites.filter((fav) => fav._id !== word._id));
    } else {
      setFavorites([...favorites, word]);
    }
  };

  return (
    <PaperProvider>
      <HeaderScreen title={data.titleEn} />

      <View style={{ flex: 1, backgroundColor: theme.background }}>
        {/* option */}
        <View
          style={{
            width: "100%",
            height: 175,
            borderBottomWidth: 1,
            flexDirection: "row",
            borderColor: theme.border,
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
                borderColor: theme.border,
                justifyContent: "center",
                alignItems: "center",
                marginRight: -12,
              }}
              onPress={() =>
                navigation.navigate("SettingTest_VietCau", {
                  dataVocab: data.vocab,
                  screenNavigation: "BoTuVung_S1",
                })
              }
            >
              <Image
                source={require("../../img/imgBoTuVung/writting.png")}
                style={{
                  width: 35,
                  height: 35,
                  resizeMode: "contain",
                  tintColor: theme.color,
                }}
              />
              <Text style={{ fontSize: 18, color: theme.color }}>
                Luyện viết
              </Text>
            </TouchableOpacity>

            {/* Luyen doc */}
            <TouchableOpacity
              style={{
                width: "85%",
                height: "40%",
                borderWidth: 1,
                borderRadius: 12,
                borderColor: theme.border,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10,
                marginRight: -12,
              }}
              onPress={() =>
                navigation.navigate("LuyenDoc", { dataVocab: data.vocab })
              }
            >
              <Ionicons name="mic-outline" size={35} color={theme.color} />
              <Text style={{ fontSize: 18, color: theme.color }}>
                Luyện đọc
              </Text>
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
                borderColor: theme.border,
                justifyContent: "center",
                alignItems: "center",
                marginLeft: -10,
              }}
              onPress={() =>
                navigation.navigate("SettingTest_TracNghiem", {
                  dataVocab: data.vocab,
                  screenNavigation: "BoTuVung_S1",
                })
              }
            >
              <Ionicons name="checkbox-outline" size={35} color={theme.color} />
              <Text style={{ fontSize: 18, color: theme.color }}>
                Trắc nghiệm
              </Text>
            </TouchableOpacity>

            {/* ghep cap */}
            <TouchableOpacity
              style={{
                width: "85%",
                height: "40%",
                borderWidth: 1,
                borderRadius: 12,
                borderColor: theme.border,
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
                style={{
                  width: 35,
                  height: 35,
                  resizeMode: "contain",
                  tintColor: theme.color,
                }}
              />
              <Text style={{ fontSize: 18, color: theme.color }}>Ghép cặp</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* vocabularies */}
        <ScrollView>
          <View
            style={{
              flex: 1,
              backgroundColor: theme.background,
              alignItems: "center",
            }}
          >
            {data.vocab.map((vocabulary, index) => (
              <View
                key={index}
                style={{
                  width: "92%",
                  height: 60,
                  borderWidth: 1,
                  borderRadius: 12,
                  borderColor: theme.border,
                  marginTop: 12,
                  flexDirection: "row",
                }}
              >
                {/* vocab */}
                <View
                  style={{
                    flex: 7,
                    borderRightWidth: 1,
                    borderColor: theme.border,
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
                      color: theme.text,
                    }}
                  >
                    {vocabulary.vn}
                  </Text>
                </View>

                {/* favorite */}
                <View
                  style={{
                    flex: 1.5,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRightWidth: 1,
                    borderColor: theme.border,
                  }}
                >
                  <TouchableOpacity onPress={() => toggleFavorite(vocabulary)}>
                    <Text style={{ fontSize: 22 }}>
                      {favorites.some((fav) => fav._id === vocabulary._id)
                        ? "❤️"
                        : "🤍"}
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* play voice */}
                <View
                  style={{
                    flex: 1.5,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => playVoiceText(vocabulary.en, "en")}
                  >
                    <FontAwesome
                      name="volume-up"
                      size={28}
                      color={theme.color}
                    />
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
