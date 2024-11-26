import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import { Appbar, PaperProvider, Searchbar } from "react-native-paper";
import themeContext from "../../context/themeContext";
import Subject from "./components/Subject";
import Suggested from "./components/Suggested";
import Bubble from "../Bubble/Bubble";

const Home = () => {
  const [searchText, setSearchText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [loading, setLoading] = useState(false);

  const theme = useContext(themeContext);

  const fetchTranslationFromGlosbe = async (word) => {
    const url = `https://glosbe.com/gapi/translate?from=eng&dest=vie&format=json&phrase=${word}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data && data.tuc && data.tuc.length > 0) {
        return data.tuc[0].meanings[0].text; // Lấy nghĩa đầu tiên
      }
      return "Không tìm thấy kết quả.";
    } catch (error) {
      console.error("Lỗi gọi Glosbe API:", error);
      return "Có lỗi xảy ra.";
    }
  };

  const handleSearch = async (text) => {
    setSearchText(text);
    if (text.trim() === "") {
      setTranslatedText(""); // Nếu không nhập gì, xóa kết quả
      return;
    }

    setLoading(true); // Hiển thị trạng thái loading
    const translation = await fetchTranslationFromGlosbe(text); // Gọi API
    setTranslatedText(translation); // Cập nhật kết quả dịch
    setLoading(false); // Tắt loading
  };

  return (
    <PaperProvider style={{ flex: 1 }}>
      <Appbar.Header
        elevated="true"
        style={{ backgroundColor: theme.background }}
      >
        <View
          style={{
            width: "85%",
            height: "100%",
            justifyContent: "center",
            paddingLeft: 15,
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 30, color: "#3B7DED" }}>
            Enggo
          </Text>
        </View>

        <TouchableOpacity>
          <Appbar.Action icon="bell" size={30} color={theme.color} />
        </TouchableOpacity>
      </Appbar.Header>

      <ScrollView style={{ flex: 1, backgroundColor: theme.background }}>
        {/* search bar */}
        <View
          style={{
            width: "100%",
            height: 85,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Searchbar
            placeholder="Search"
            value={searchText}
            onChangeText={handleSearch}
            style={{
              width: "90%",
              height: "65%",
              backgroundColor: "#E9E3E3",
              borderWidth: 1,
              borderColor: "gray",
            }}
          />
          {loading ? (
            <ActivityIndicator size="small" color="#0000ff" /> // Hiển thị loading
          ) : (
            translatedText && (
              <Text style={styles.translation}>{translatedText}</Text>
            )
          )}
        </View>

        {/* Subject */}
        <Subject />

        {/* suggested */}
        <Suggested />

        {/* bubble */}
        <Bubble />
      </ScrollView>
    </PaperProvider>
  );
};

export default Home;

const styles = StyleSheet.create({});
