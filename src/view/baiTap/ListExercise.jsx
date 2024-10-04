import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
} from "react-native";
import { PaperProvider } from "react-native-paper";
import HeaderScreen from "../../components/header/HeaderScreen";

const ListExercise = ({ navigation, route }) => {
  const { data } = route.params;

  const [modalVisible, setModalVisible] = useState(false);

  const optionsType = ["Dễ", "Khó", "Hủy"];

  return (
    <PaperProvider>
      <HeaderScreen title={data.title} />

      <View style={{ flex: 1 }}>
        {/* background */}
        <View
          style={{
            flex: 3,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={data.background}
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
            {data.list.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  width: "100%",
                  height: 95,
                  borderRadius: 10,
                  marginVertical: 6,
                  flexDirection: "row",
                  backgroundColor: "#E6E6E6",
                  borderWidth: 1,
                  borderColor: "#B3B7B7",
                }}
                onPress={() => setModalVisible(true)}
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
                    source={item.image}
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
        </View>

        {/* modal */}
        <Modal
          transparent={true}
          visible={modalVisible}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)} // Đóng modal khi nhấn nút "Hủy" hoặc nhấn ra ngoài
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.title}>Chọn kiểu bài tập</Text>

              {optionsType.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.optionButton}
                  onPress={() => {
                    if (option !== "Hủy") {
                      if (option === "Dễ") {
                        navigation.navigate("ListenAndRead", { data: data });
                      } else {
                        navigation.navigate("ListenAndRead", { data: data });
                      }
                    }
                    setModalVisible(false); // Đóng modal sau khi chọn
                  }}
                >
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Modal>
      </View>
    </PaperProvider>
  );
};

export default ListExercise;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Làm tối nền phía sau modal
  },
  modalContent: {
    width: "60%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  optionButton: {
    padding: 15,
    width: "100%",
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  optionText: {
    fontSize: 17,
    textAlign: "center",
    color: "#007AFF",
  },
});
