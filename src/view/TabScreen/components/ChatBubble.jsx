import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "react-native";

const ChatBubble = ({ role, text, onSpeech }) => {
  
  return (
    <View style={{ flex: 1 }}>
      {role === "model" && (
        <Image
          source={require("../../../../assets/chatbot.png")}
          style={styles.imageModel}
        />
      )}
      <View
        style={[styles.chatItem, role === "user" ? styles.user : styles.model]}
      >
        <Text style={styles.chatText}>{text}</Text>
        {/* {role === "model" && (
        <TouchableOpacity style={styles.speakerIcon} onPress={onSpeech}>
          <Ionicons
            name="volume-high-outline"
            size={24}
            color="#ffffff"
            style={{ marginLeft: 10 }}
          />
        </TouchableOpacity>
      )} */}
      </View>
    </View>
  );
};

export default ChatBubble;

const styles = StyleSheet.create({
  chatItem: {
    padding: 10,
    marginBottom: 5,
    maxWidth: "80%",
    borderRadius: 10,
  },
  user: {
    alignSelf: "flex-end",
    backgroundColor: "#375",
    // backgroundColor: '#0077cc',
  },
  model: {
    alignSelf: "flex-start",
    backgroundColor: "#0077cc",
  },
  chatText: {
    color: "#fff",
    size: 10,
    // marginRight: 20,
  },
  speakerIcon: {
    position: "absolute",
    bottom: 5,
    right: 5,
  },
  imageModel: {
    width: 50,
    height: 50,
    
    // borderRadius: 50,
    // position: "absolute",
    // bottom: 0,
    left: 0,
  },
});
