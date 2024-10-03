import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { topicVideo } from "../../../api/ApiVideo";
import ListTopic from "../../../components/topic/ListTopic";

const TopicScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ListTopic data={topicVideo} />
    </View>
  );
};

export default TopicScreen;

const styles = StyleSheet.create({});
