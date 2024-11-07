import { View } from "react-native";
import React, { useEffect, useState } from "react";
import ListTopic from "../../../components/topic/ListTopic";
import { appInfo } from "../../../constants/appInfos";

const TopicScreen = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(`${appInfo.Host_URL}/api/topicVideos`);
      const data = await res.json();
      setVideos(data.data);
      // console.log(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {/* render list topic */}
      <ListTopic data={videos} navigationScreen={"ListVideoOfTopic"} />
    </View>
  );
};

export default TopicScreen;
