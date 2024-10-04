import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";

export const ModalChooseType = () => {
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
    <View style={styles.container}>
      {/* Nút mở modal */}
      <TouchableOpacity
        style={styles.openButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>Chọn kiểu bài tập</Text>
      </TouchableOpacity>

      {/* Modal hiển thị bảng chọn */}
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
                    console.log(`Selected: ${option}`);
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

export const ModalChooseLevel = () => {
  const optionLevel = ["Dễ", "Khó", "Hủy"];
  return <View></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  openButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Làm tối nền phía sau modal
  },
  modalContent: {
    width: "80%",
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
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  optionText: {
    fontSize: 16,
    textAlign: "center",
    color: "#007AFF",
  },
});
