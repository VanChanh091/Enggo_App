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
import HeaderScreen from "../../../components/header/HeaderScreen";
import PlayVoice from "../../../components/playVoice/PlayVoice";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useTranslate } from "../../../components/translate/TranslateLanguage";
import themeContext from "../../../context/themeContext";
import { playVoiceText } from "../../../components/translate/PLayTranslateVoice";

const ListenAndRead = ({ route }) => {
  const { data } = route.params;

  const theme = useContext(themeContext);

  const allText = data.content.map((item) => item.text).join(" ");

  const { translatedText, translateWithDelay } = useTranslate();

  return (
    <PaperProvider>
      <HeaderScreen title={"Nghe và đọc"} />

      <View style={{ flex: 1, backgroundColor: theme.background }}>
        <View style={{ flex: 8.2, marginTop: 10 }}>
          <ScrollView>
            <View style={{ width: "100%", height: 135 }}>
              <Text
                style={{
                  fontWeight: 500,
                  fontSize: 19,
                  paddingHorizontal: 12,
                  paddingTop: 10,
                  color: theme.color,
                }}
              >
                {translatedText[`title_${data.id}`] || data.title}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  translateWithDelay(`title_${data.id}`, data.title)
                }
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  paddingVertical: 12,
                }}
              >
                <MaterialIcons
                  name="g-translate"
                  size={30}
                  color={theme.color}
                />
              </TouchableOpacity>
            </View>

            <View
              style={{
                width: "100%",
                height: 200,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={{ uri: data.image }}
                style={{ width: "93%", height: "93%", borderRadius: 10 }}
              />
            </View>

            {data.content.map((item, index) => (
              <View key={index} style={{ paddingVertical: 10 }}>
                <Text
                  style={{
                    paddingHorizontal: 12,
                    fontSize: 17,
                    color: theme.color,
                  }}
                >
                  {translatedText[index] || item.text}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: 12,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => translateWithDelay(index, item.text)}
                  >
                    <MaterialIcons
                      name="g-translate"
                      size={30}
                      color={theme.color}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{ paddingHorizontal: 15 }}
                    onPress={() => playVoiceText(item.text, "en")}
                  >
                    <Ionicons
                      name="volume-medium-sharp"
                      color={theme.color}
                      size={32}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))}

            <View style={{ width: "100%", height: 20 }}></View>
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

export default ListenAndRead;

const styles = StyleSheet.create({});
