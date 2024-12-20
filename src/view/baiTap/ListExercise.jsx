import React, { useContext, useRef, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { PaperProvider } from "react-native-paper";
import HeaderScreen from "../../components/header/HeaderScreen";
import ActionSheet from "react-native-actions-sheet";
import themeContext from "../../context/themeContext";

const ListExercise = ({ navigation, route }) => {
  const { data } = route.params;

  const theme = useContext(themeContext);

  const [selectedItem, setSelectedItem] = useState(null); // Lưu trữ item được chọn
  const actionSheetRef = useRef(null); // Tham chiếu đến ActionSheet

  const optionsType = [
    "Nói nhại",
    "Nghe và đọc",
    "Nghe và điền từ",
    "Nghe chép chính tả",
    "Nghe và trả lời câu hỏi",
  ];

  const handleNavigation = (option, item) => {
    switch (option) {
      case "Nói nhại":
        return navigation.navigate("Parody", { data: item });
      case "Nghe và đọc":
        return navigation.navigate("ListenAndRead", { data: item });
      case "Nghe và điền từ":
        return navigation.navigate("ListenAndFillWord", { data: item });
      case "Nghe chép chính tả":
        return navigation.navigate("ListenAndRewrite", { data: item });
      case "Nghe và trả lời câu hỏi":
        return navigation.navigate("ListenAndChoosePhrase", { data: item });
    }
  };

  return (
    <PaperProvider>
      <HeaderScreen title={data.title} />

      <View style={{ flex: 1, backgroundColor: theme.background }}>
        {/* background */}
        <View
          style={{
            flex: 3,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={{ uri: data.background }}
            style={{ width: "92%", height: "100%", resizeMode: "contain" }}
          />
        </View>

        {/* list  */}
        <View
          style={{ flex: 7, justifyContent: "center", alignItems: "center" }}
        >
          <View
            style={{
              width: "92%",
              height: "100%",
              alignItems: "flex-end",
            }}
          >
            {data?.Items?.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.touchableMap}
                onPress={() => {
                  setSelectedItem(item);
                  actionSheetRef.current?.show();
                }}
              >
                <View
                  style={{
                    flex: 7,
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontSize: 15, paddingLeft: 10 }}>
                    {item.title}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 3,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={{ uri: item.image }}
                    style={{
                      width: "80%",
                      height: "80%",
                      borderRadius: 6,
                    }}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* ActionSheet để chọn kiểu bài tập */}
          <ActionSheet ref={actionSheetRef}>
            <View style={styles.actionSheetContainer}>
              <Text style={styles.sheetTitle}>Chọn kiểu bài tập</Text>
              {optionsType.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.sheetOption}
                  onPress={() => {
                    handleNavigation(option, selectedItem);
                    actionSheetRef.current?.hide(); // Ẩn ActionSheet
                  }}
                >
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity onPress={() => actionSheetRef.current?.hide()}>
                <Text style={styles.cancelText}>Hủy</Text>
              </TouchableOpacity>
            </View>
          </ActionSheet>
        </View>
      </View>
    </PaperProvider>
  );
};

export default ListExercise;

const styles = StyleSheet.create({
  touchableMap: {
    width: "100%",
    height: 95,
    borderRadius: 10,
    marginVertical: 6,
    flexDirection: "row",
    backgroundColor: "#E6E6E6",
    borderWidth: 1,
    borderColor: "#B3B7B7",
  },
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 25,
  },
  listItem: {
    padding: 15,
    backgroundColor: "#fff",
    marginVertical: 8,
    borderRadius: 8,
  },
  actionSheetContainer: {
    padding: 20,
  },
  sheetTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  sheetOption: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  optionText: {
    fontSize: 18,
    textAlign: "center",
    color: "#007AFF",
  },
  cancelText: {
    fontSize: 18,
    textAlign: "center",
    color: "#FF3B30",
    marginTop: 20,
  },
});
