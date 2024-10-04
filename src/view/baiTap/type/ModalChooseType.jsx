import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

const ModalChooseType = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const optionsType = [
    "Nghe và điền từ",
    "Nghe và hoàn thành cụm từ",
    "Nghe và đọc",
    "Nghe chép chính tả",
    "Nói nhại",
    "Hủy",
  ];

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        style={{
          width: "90%",
          height: 60,
          borderRadius: 13,
          borderWidth: 1,
          borderColor: "#757575",
          flexDirection: "row",
          marginTop: 15,
        }}
        onPress={() => setModalVisible(true)}
      >
        <View style={{ flex: 8.5, justifyContent: "center" }}>
          <Text style={{ paddingLeft: 15, fontSize: 18, color: "gray" }}>
            Nghe và đọc
          </Text>
        </View>
        <View
          style={{ flex: 1.5, justifyContent: "center", alignItems: "center" }}
        >
          <Ionicons name="chevron-down-outline" color="gray" size={30} />
        </View>
      </TouchableOpacity>
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
                    // if (option === "Dễ") {
                    //   navigation.navigate("ListenAndRead", { data: data });
                    // } else {
                    //   navigation.navigate("ListenAndRead", { data: data });
                    // }
                    console.log("Cancel");
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
  );
};

export default ModalChooseType;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Làm tối nền phía sau modal
  },
  modalContent: {
    width: "75%",
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
