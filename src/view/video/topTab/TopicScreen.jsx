import { View } from "react-native";
import React from "react";
import { topicVideo } from "../../../api/ApiVideo";
import ListTopic from "../../../components/topic/ListTopic";

const TopicScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {/* render list topic */}
      <ListTopic data={topicVideo} navigationScreen={"ListVideoOfTopic"} />
    </View>
  );
};

export default TopicScreen;
