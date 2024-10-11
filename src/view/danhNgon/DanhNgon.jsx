import {
  Animated,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import { PaperProvider } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { quote } from "../../api/ApiDanhNgon";
import HeaderScreen from "../../components/header/HeaderScreen";

const DanhNgon = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [istTranslate, setIstTranslate] = useState(true);
  const [translatedText, setTranslatedText] = useState(null);

  const fadeAnimation = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnimation, {
      toValue: 0,
      duration: 1200,
      useNativeDriver: true,
    }).start();
  };

  // Sử dụng fetch để gọi Google Translate API
  const handleTranslate = async (data) => {
    try {
      const response = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=${encodeURIComponent(
          data
        )}`
      );
      const result = await response.json();
      if (result && result[0]) {
        const translatedTextArray = result[0].map((item) => item[0]);
        setTranslatedText(translatedTextArray.join("")); // Nối các phần dịch
      }

      setIstTranslate(!istTranslate); // Toggle trạng thái dịch

      // Kiểm soát hiển thị dựa vào trạng thái dịch
      if (istTranslate) {
        fadeIn();
      } else {
        fadeOut();
      }
    } catch (error) {
      console.error("Error translating text:", error);
    }
  };

  // Chuyển đến từ tiếp theo
  const handleNext = () => {
    if (currentIndex < quote.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Quay về từ trước đó
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <PaperProvider>
      <HeaderScreen title="Danh Ngôn" />

      <View style={{ flex: 1 }}>
        <View style={{ flex: 8.5 }}>
          {/* vocab */}
          <View
            style={{
              flex: 4,
              borderBottomWidth: 1,
              borderColor: "#d0d0d0",
              justifyContent: "center",
            }}
          >
            {quote[currentIndex].words.map((item, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  paddingVertical: 3,
                  marginHorizontal: 15,
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 17,
                  }}
                >
                  {item.word}
                  <Text style={{ fontSize: 17, fontWeight: "regular" }}>
                    {" "}
                    -{" "}
                  </Text>
                  <Text
                    style={{
                      fontSize: 17,
                      color: "gray",
                      fontWeight: "regular",
                    }}
                  >
                    {item.pronunciation}
                  </Text>
                  <Text style={{ fontSize: 17, fontWeight: "regular" }}>
                    {" "}
                    {item.type}:{" "}
                  </Text>
                  <Text style={{ fontSize: 17, fontWeight: "regular" }}>
                    {item.meaning}
                  </Text>
                </Text>
              </View>
            ))}
          </View>

          {/* quote */}
          <View
            style={{ flex: 6, borderBottomWidth: 1, borderColor: "#d0d0d0" }}
          >
            <View style={{ width: "100%", height: 150 }}>
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    fontSize: 18,
                    paddingVertical: 12,
                    marginHorizontal: 12,
                    textAlign: "justify",
                    color: "#2A7BD3",
                  }}
                >
                  {quote[currentIndex].text}
                </Text>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <Text style={{ color: "gray", marginRight: 10, fontSize: 18 }}>
                  -- {quote[currentIndex].author} --
                </Text>
              </View>
            </View>

            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <TouchableOpacity
                style={{
                  width: 90,
                  height: 45,
                  borderRadius: 10,
                  backgroundColor: "red",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => {
                  handleTranslate(quote[currentIndex].text);
                }}
              >
                <Text style={{ fontWeight: 600, fontSize: 18, color: "white" }}>
                  Dịch
                </Text>
              </TouchableOpacity>
            </View>

            {/* Text with fade-in/fade-out effect */}
            <Animated.View style={{ opacity: fadeAnimation }}>
              <Text
                style={{
                  fontSize: 18,
                  marginTop: 30,
                  marginHorizontal: 12,
                  textAlign: "justify",
                  color: "#FFA500",
                }}
              >
                {translatedText}
              </Text>
            </Animated.View>
          </View>
        </View>

        {/* button next & previous */}
        <View style={{ flex: 1.5 }}>
          <View
            style={{
              flex: 0.6,
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
                <Ionicons name="play-back-outline" size={35} color="black" />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 5,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontWeight: 500, fontSize: 20 }}>{`${
                currentIndex + 1
              }/${quote.length}`}</Text>
            </View>
            <View
              style={{
                flex: 2.5,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity onPress={handleNext}>
                <Ionicons name="play-forward-outline" size={35} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </PaperProvider>
  );
};

export default DanhNgon;

const styles = StyleSheet.create({});
