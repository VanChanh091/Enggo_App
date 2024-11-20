import { View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import ListTopic from "../../../components/topic/ListTopic";
import { appInfo } from "../../../constants/appInfos";
import themeContext from "../../../context/themeContext";

const TopicScreen = () => {
  const [videos, setVideos] = useState([]);

  const theme = useContext(themeContext);

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
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      {/* render list topic */}
      <ListTopic data={videos} navigationScreen={"ListVideoOfTopic"} />
    </View>
  );
};

export default TopicScreen;
