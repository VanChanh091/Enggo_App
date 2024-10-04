import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { PaperProvider } from "react-native-paper";
import HeaderScreen from "../../components/header/HeaderScreen";
import ListTopic from "../../components/topic/ListTopic";
import { TopicListen } from "../../api/apiListen";

const TopicExercise = () => {
  return (
    <PaperProvider>
      <HeaderScreen title={"Bài Tập"} />

      <ListTopic data={TopicListen} navigationScreen={"ListExercise"} />
    </PaperProvider>
  );
};

export default TopicExercise;

const styles = StyleSheet.create({});
