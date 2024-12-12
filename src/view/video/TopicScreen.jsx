import { View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { appInfo } from "../../constants/appInfos";
import themeContext from "../../context/themeContext";
import ListTopic from "../../components/topic/ListTopic";
import {
  ActivityIndicator,
  MD2Colors,
  PaperProvider,
} from "react-native-paper";
import HeaderScreen from "../../components/header/HeaderScreen";

const TopicScreen = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  const theme = useContext(themeContext);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${appInfo.Host_URL}/api/topicVideos`);
      const data = await res.json();
      setVideos(data.data);
      // console.log(data);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PaperProvider>
      <HeaderScreen title="Video" />
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.background,
          }}
        >
          <ActivityIndicator animating={true} color={MD2Colors.blue800} />
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: theme.background,
            paddingVertical: 7,
          }}
        >
          <ListTopic data={videos} navigationScreen={"ListVideoOfTopic"} />
        </View>
      )}
    </PaperProvider>
  );
};

export default TopicScreen;
