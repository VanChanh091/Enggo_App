import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Appbar, PaperProvider } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

const VideoSetting = ({ navigation, route }) => {
  const { data } = route.params;

  const [isChooseMode, setIsChooseMode] = useState(false);
  const [isChooseWordOrWriteWord, setIsChooseWordOrWriteWord] = useState(false);

  const handleChooseOrWriteWord = () => {
    const chooseMode = {
      mode: isChooseWordOrWriteWord ? "choose" : "write",
    };
    if (chooseMode.mode === "choose") {
      navigation.navigate("WatchVideoChooseWord", { data: data });
    } else {
      navigation.navigate("WatchVideoWriteWord", { data: data });
    }
  };

  const handleWord = () => {
    setIsChooseMode(!isChooseMode); //open option level
    setIsChooseWordOrWriteWord(!isChooseWordOrWriteWord); //get type choose or write word
  };

  return (
    <PaperProvider>
      <Appbar.Header style={{ backgroundColor: "#2A7BD3" }}>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
      </Appbar.Header>

      <View style={{ flex: 1 }}>
        <View style={{ flex: 4, borderBottomWidth: 1, borderColor: "#d0d0d0" }}>
          <Image source={data.image} style={{ width: "100%", height: 235 }} />
          <View
            style={{
              width: "100%",
              height: 80,
              flexDirection: "row",
            }}
          >
            <View
              style={{
                flex: 8.5,
                justifyContent: "center",
              }}
            >
              <Text
                style={{ fontWeight: "bold", fontSize: 16, marginLeft: 10 }}
              >
                {data.text}
              </Text>
            </View>
            <TouchableOpacity
              style={{
                flex: 1.5,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons name="heart-outline" size={35} color="gray" />
            </TouchableOpacity>
          </View>
        </View>

        {!isChooseMode ? (
          <View style={{ flex: 6 }}>
            <View
              style={{
                width: "100%",
                height: 40,
                justifyContent: "center",
                marginTop: 20,
                marginLeft: 15,
              }}
            >
              <Text style={{ marginLeft: 5, fontSize: 18 }}>Chọn chế độ</Text>
            </View>
            <View
              style={{
                width: "100%",
                height: 300,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* Watch videos with captions */}
              <TouchableOpacity
                style={{
                  width: "80%",
                  height: 70,
                  borderRadius: 15,
                  backgroundColor: "#3671f3",
                  flexDirection: "row",
                }}
                onPress={() =>
                  navigation.navigate("WatchVideoWithCaptions", { data: data })
                }
              >
                <View
                  style={{
                    flex: 2,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Ionicons name="film-outline" size={35} color="white" />
                </View>
                <View style={{ flex: 8, justifyContent: "center" }}>
                  <Text
                    style={{ color: "white", fontWeight: "bold", fontSize: 18 }}
                  >
                    PHỤ ĐỀ
                  </Text>
                  <Text style={{ color: "white", fontSize: 15, marginTop: 2 }}>
                    Xem video với phụ đề
                  </Text>
                </View>
              </TouchableOpacity>

              {/* Choose word */}
              <TouchableOpacity
                style={{
                  width: "80%",
                  height: 70,
                  borderRadius: 15,
                  backgroundColor: "#3671f3",
                  flexDirection: "row",
                  marginVertical: 10,
                }}
                onPress={handleWord}
              >
                <View
                  style={{
                    flex: 2,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Ionicons
                    name="checkmark-done-circle-outline"
                    size={35}
                    color="white"
                  />
                </View>
                <View style={{ flex: 8, justifyContent: "center" }}>
                  <Text
                    style={{ color: "white", fontWeight: "bold", fontSize: 18 }}
                  >
                    CHỌN TỪ
                  </Text>
                  <Text style={{ color: "white", fontSize: 15, marginTop: 2 }}>
                    Chọn từ đúng vào chỗ trống
                  </Text>
                </View>
              </TouchableOpacity>

              {/* Write word */}
              <TouchableOpacity
                style={{
                  width: "80%",
                  height: 70,
                  borderRadius: 15,
                  backgroundColor: "#3671f3",
                  flexDirection: "row",
                }}
                onPress={handleWord}
              >
                <View
                  style={{
                    flex: 2,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Ionicons name="pencil-outline" size={32} color="white" />
                </View>
                <View style={{ flex: 8, justifyContent: "center" }}>
                  <Text
                    style={{ color: "white", fontWeight: "bold", fontSize: 18 }}
                  >
                    VIẾT TỪ
                  </Text>
                  <Text style={{ color: "white", fontSize: 15, marginTop: 2 }}>
                    Viết từ đúng vào chỗ trống
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={{ flex: 6 }}>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                height: 40,
                alignItems: "center",
                marginTop: 20,
                marginLeft: 15,
              }}
            >
              <TouchableOpacity onPress={() => setIsChooseMode(!isChooseMode)}>
                <Ionicons
                  name="arrow-back-outline"
                  size={28}
                  color="black"
                  // style={{ marginLeft: 10 }}
                />
              </TouchableOpacity>
              <Text style={{ marginLeft: 5, fontSize: 18 }}>Chọn chế độ</Text>
            </View>
            <View
              style={{
                width: "100%",
                height: 300,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* beginner */}
              <TouchableOpacity
                style={{
                  width: "80%",
                  height: 60,
                  borderRadius: 12,
                  backgroundColor: "#D1E4F3",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={handleChooseOrWriteWord}
              >
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                  Beginner
                </Text>
              </TouchableOpacity>

              {/* Intermediate */}
              <TouchableOpacity
                style={{
                  width: "80%",
                  height: 60,
                  borderRadius: 12,
                  backgroundColor: "#9CBAFA",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 12,
                }}
                onPress={handleChooseOrWriteWord}
              >
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                  Intermediate
                </Text>
              </TouchableOpacity>

              {/* Advance */}
              <TouchableOpacity
                style={{
                  width: "80%",
                  height: 60,
                  borderRadius: 12,
                  backgroundColor: "#5D89E2",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 12,
                }}
              >
                <Text
                  style={{ fontWeight: "bold", fontSize: 20, color: "white" }}
                >
                  Advance
                </Text>
              </TouchableOpacity>

              {/* Expert */}
              <TouchableOpacity
                style={{
                  width: "80%",
                  height: 60,
                  borderRadius: 12,
                  backgroundColor: "#1548B3",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 12,
                }}
              >
                <Text
                  style={{ fontWeight: "bold", fontSize: 20, color: "white" }}
                >
                  Expert
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </PaperProvider>
  );
};

export default VideoSetting;

const styles = StyleSheet.create({});
