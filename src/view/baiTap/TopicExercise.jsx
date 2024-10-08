import { StyleSheet } from "react-native";
import React from "react";
import { PaperProvider } from "react-native-paper";
import HeaderScreen from "../../components/header/HeaderScreen";
import ListTopic from "../../components/topic/ListTopic";
import { TopicBaiTap } from "../../api/ApiBaiTap";

const TopicExercise = () => {
  return (
    <PaperProvider>
      <HeaderScreen title={"Bài Tập"} />
      <ListTopic data={TopicBaiTap} navigationScreen={"ListExercise"} />
    </PaperProvider>
  );
};

export default TopicExercise;

const styles = StyleSheet.create({});
