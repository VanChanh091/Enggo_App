import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { API_KEY_CHATGPT } from "@env";
import axios from "axios";
import { GiftedChat } from "react-native-gifted-chat";

const ChatBot = () => {
  // console.log(API_KEY_CHATGPT);

  const [messages, setMessages] = useState([]);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleSend = async (newMessages = []) => {
    setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));
    const userMessage = newMessages[0].text;

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: userMessage },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY_CHATGPT}`,
          },
        }
      );

      const botMessage = {
        _id: Math.random().toString(),
        text: response.data.choices[0].message.content,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "ChatGPT",
          avatar: "https://i.pravatar.cc/150?img=3",
        },
      };

      setMessages((prevMessages) =>
        GiftedChat.append(prevMessages, [botMessage])
      );
    } catch (error) {
      if (error.response && error.response.status === 429) {
        const retryAfter = error.response.headers["x-ratelimit-reset"];
        const waitTime = retryAfter - Math.floor(Date.now() / 1000); // Tính thời gian đợi
        console.log(`Rate limit exceeded. Retrying after ${waitTime} seconds.`);
        setTimeout(() => handleSend(newMessages), waitTime * 1000); // Thử lại sau khi hết giới hạn
      } else {
        console.error("Error communicating with ChatGPT:", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.title}>ChatBot</Text>
      </View>

      <GiftedChat messages={messages} user={{ _id: 1 }} onSend={handleSend} />
    </View>
  );
};

export default ChatBot;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffcc9",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 70,
  },
});
