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

const ListenAndRewrite = ({ route }) => {
  const { data } = route.params;

  const [isShowText, setIsShowText] = useState(false);

  return (
    <PaperProvider>
      <HeaderScreen title={"Nghe chép chính tả"} />

      <View style={{ flex: 1 }}>
        <View style={{ flex: 8.2 }}>
          <View style={{ width: "100%", height: "93%" }}>
            <View
              style={{
                flex: 4,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: "92%",
                  height: "90%",
                  borderWidth: 1,
                  borderColor: "#2A7BD3",
                  borderRadius: 10,
                }}
              >
                <TextInput
                  placeholder="Nghe và ghi những từ nghe được vào đây..."
                  style={{
                    fontWeight: 400,
                    fontSize: 17,
                    width: "100%",
                    height: "100%",
                    paddingHorizontal: 22,
                    borderRadius: 10,
                    borderWidth: 1,
                  }}
                />
              </View>
            </View>

            <View
              style={{
                flex: 1.5,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  width: "65%",
                  height: 65,
                  borderRadius: 10,
                  backgroundColor: "#D1E4F3",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => setIsShowText(!isShowText)}
              >
                <Text
                  style={{ fontSize: 20, color: "#2A7BD3", fontWeight: 500 }}
                >
                  Hiện Transcript
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flex: 4,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: "92%",
                  height: "90%",
                  borderWidth: 1,
                  borderColor: "#2A7BD3",
                  borderRadius: 10,
                }}
              >
                {isShowText ? (
                  <ScrollView>
                    {data.content.map((item, index) => (
                      <View key={index} style={{ paddingVertical: 8 }}>
                        <Text style={{ fontSize: 16, paddingHorizontal: 12 }}>
                          {item.text}
                        </Text>
                      </View>
                    ))}
                  </ScrollView>
                ) : (
                  <View></View>
                )}
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            flex: 1.8,
            borderTopWidth: 1,
            borderColor: "#d0d0d0",
          }}
        >
          <PlayVoice />
        </View>
      </View>
    </PaperProvider>
  );
};

export default ListenAndRewrite;

const styles = StyleSheet.create({});
