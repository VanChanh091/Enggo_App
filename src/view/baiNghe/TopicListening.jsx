import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { MD2Colors, PaperProvider } from "react-native-paper";
import HeaderScreen from "../../components/header/HeaderScreen";
import ListTopic from "../../components/topic/ListTopic";
import { appInfo } from "../../constants/appInfos";
import themeContext from "../../theme/themeContext";

const TopicListening = () => {
  // const [groupedTopics, setGroupedTopics] = useState([]);

  const theme = useContext(themeContext);

  const [listen, setListen] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${appInfo.Host_URL}/api/exercises`);
      const data = await res.json();
      setListen(data.data);
      // console.log(data);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
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
          <ListTopic data={listen} navigationScreen="ListListeningOfTopic" />
        </View>
      )}
    </PaperProvider>
  );
};

export default TopicListening;
