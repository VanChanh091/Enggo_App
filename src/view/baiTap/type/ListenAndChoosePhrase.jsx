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
import { Feather, Ionicons } from "@expo/vector-icons";
import { CheckBox } from "@rneui/themed";

const ListenAndChoosePhrase = ({ route }) => {
  const { data } = route.params;

  const [checked, setChecked] = useState(0);

  return (
    <PaperProvider>
      <HeaderScreen title={"Nghe và hoàn thành cụm từ"} />

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

            {data.choosePhrase.map((item, index) => (
              <View
                key={index}
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <View
                  key={index}
                  style={{
                    width: "90%",
                    height: 220,
                    marginVertical: 7,
                  }}
                >
                  <View
                    style={{
                      flex: 3,
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ fontWeight: 600, fontSize: 17 }}>
                      {item.id}. {item.question}
                    </Text>
                  </View>
                  <View style={{ flex: 7 }}>
                    {item.answer.map((answer, index) => (
                      <View
                        key={index}
                        style={{
                          flex: 1,
                          flexDirection: "row",
                          // backgroundColor:
                          //   answer.correct === true ? "#D1E4F3" : "#E9E9E9",
                        }}
                        // onPress={() =>
                        //   console.log("Choose phrase: ", answer.content)
                        // }
                      >
                        <View
                          style={{
                            flex: 1.5,
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <CheckBox
                            checked={checked}
                            onPress={() => setChecked(!checked)}
                            checkedIcon="dot-circle-o"
                            uncheckedIcon="circle-o"
                          />
                        </View>
                        <View style={{ flex: 8.5, justifyContent: "center" }}>
                          <Text style={{ fontSize: 16 }}>{answer.text}</Text>
                        </View>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            ))}

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
                  height: 60,
                  borderRadius: 10,
                  backgroundColor: "#D1E4F3",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    flex: 2,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Feather name="check-square" size={30} color="#2A7BD3" />
                </View>
                <View style={{ flex: 8 }}>
                  <Text
                    style={{
                      fontSize: 18,
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
                  height: 60,
                  borderRadius: 10,
                  backgroundColor: "#2A7BD3",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  marginTop: 12,
                }}
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
                    size={30}
                  ></Ionicons>
                </View>
                <View style={{ flex: 8 }}>
                  <Text
                    style={{ fontSize: 18, color: "#fff", fontWeight: "bold" }}
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
          <PlayVoice />
        </View>
      </View>
    </PaperProvider>
  );
};

export default ListenAndChoosePhrase;

const styles = StyleSheet.create({});
