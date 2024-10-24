import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { TopicListen } from "../../api/apiListen";
import { PaperProvider } from "react-native-paper";
import ListTopic from "../../components/topic/ListTopic";
import HeaderScreen from "../../components/header/HeaderScreen";
import { appInfo } from "../../constants/appInfos";

const TopicListening = () => {
  const [listTopicListen, setListTopicListen] = useState([]);

  useEffect(() => {
    fetchTopicListen();
  }, []);

  const fetchTopicListen = async () => {
    try {
      const response = await fetch(`${appInfo.Host_URL}/api/topicListen`);
      const data = await response.json();
      setListTopicListen(data.data);
      console.log("topic listen :", data.data);
    } catch (error) {
      console.error(error);
    }
  };

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
