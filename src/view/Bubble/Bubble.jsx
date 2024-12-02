import React, { useRef } from "react";
import {
  Text,
  StyleSheet,
  PanResponder,
  Animated,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const Bubble = () => {
  const navigation = useNavigation();
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
        pan.setValue({ x: 0, y: 0 }); // Đặt lại giá trị di chuyển
      },
      onPanResponderMove: Animated.event(
        [null, { dx: pan.x, dy: pan.y }],
        { useNativeDriver: false } // Quan trọng: Native Driver không hỗ trợ PanResponder
      ),
      onPanResponderRelease: () => {
        pan.flattenOffset(); // Lưu vị trí cuối cùng
      },
    })
  ).current;

  const handlePress = () => {
    navigation.navigate("ChatBot"); // Điều hướng tới màn hình ChatBot
  };
  return (
    <Animated.View
      style={[
        styles.bubbleContainer,
        { transform: pan.getTranslateTransform() },
      ]}
      {...panResponder.panHandlers}
    >
      {/* <TouchableOpacity style={styles.bubble} onPress={handlePress}>
        <Text style={styles.bubbleText}>Aa</Text>
      </TouchableOpacity> */}
    </Animated.View>
  );
};

export default Bubble;

const styles = StyleSheet.create({
  bubbleContainer: {
    position: "absolute",
    top: "38%",
    right: 20,
    zIndex: 999, // Đảm bảo bong bóng hiển thị trên cùng
  },
  bubble: {
    width: 45,
    height: 45,
    backgroundColor: "#4285F4",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5, // Shadow cho Android
    shadowColor: "#000", // Shadow cho iOS
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  bubbleText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
