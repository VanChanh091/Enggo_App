import { View } from "react-native";
import React from "react";
import { TopicListen } from "../../api/apiListen";
import { PaperProvider } from "react-native-paper";
import ListTopic from "../../components/topic/ListTopic";
import HeaderScreen from "../../components/header/HeaderScreen";

const TopicListening = () => {
  return (
    <PaperProvider>
      <HeaderScreen title={"Bài nghe"} />
      <View style={{ flex: 1, backgroundColor: "white", marginTop: 7 }}>
        <View style={{ flex: 9.5 }}>
          {/* render list topic */}
          <ListTopic
            data={TopicListen}
            navigationScreen={"ListListeningOfTopic"}
          />
        </View>
        <View style={{ flex: 0.5 }}></View>
      </View>
    </PaperProvider>
  );
};

export default TopicListening;
