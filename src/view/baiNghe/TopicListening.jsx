import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { PaperProvider } from "react-native-paper";
import HeaderScreen from "../../components/header/HeaderScreen";
import ListTopic from "../../components/topic/ListTopic";
import { appInfo } from "../../constants/appInfos";

const TopicListening = () => {
  const [groupedTopics, setGroupedTopics] = useState([]);
  const [listen, setListen] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(`${appInfo.Host_URL}/api/exercises`);
      const data = await res.json();
      setListen(data.data);
      console.log(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  // const fetchData = async () => {
  //   try {
  //     // Fetch category topics
  //     const categoryResponse = await fetch(
  //       `${appInfo.Host_URL}/api/categoryTopicListen`
  //     );
  //     const categories = await categoryResponse.json();

  //     // Fetch topics
  //     const topicResponse = await fetch(`${appInfo.Host_URL}/api/topicListen`);
  //     const topics = await topicResponse.json();

  //     // Group topics by category ID
  //     const groupedData = categories.data.map((category) => ({
  //       ...category,
  //       topics: topics.data.filter((topic) => topic.category === category._id),
  //     }));

  //     setGroupedTopics(groupedData);
  //     // console.log(groupedData);
  //   } catch (error) {
  //     console.error("Error fetching data: ", error);
  //   }
  // };

  return (
    <PaperProvider>
      <HeaderScreen title="Bài nghe" />
      <View style={{ flex: 1, backgroundColor: "white", marginTop: 7 }}>
        <ListTopic data={listen} navigationScreen="ListListeningOfTopic" />
      </View>
    </PaperProvider>
  );
};

export default TopicListening;
