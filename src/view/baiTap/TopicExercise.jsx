import { ActivityIndicator, StyleSheet, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { MD2Colors, PaperProvider } from "react-native-paper";
import HeaderScreen from "../../components/header/HeaderScreen";
import ListTopic from "../../components/topic/ListTopic";
import { appInfo } from "../../constants/appInfos";
import themeContext from "../../context/themeContext";

const TopicExercise = () => {
  const theme = useContext(themeContext);

  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${appInfo.Host_URL}/api/exercises`);
      const data = await res.json();
      setExercises(data.data);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PaperProvider>
      <HeaderScreen title={"Bài Tập"} />

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
          <ListTopic data={exercises} navigationScreen={"ListExercise"} />
        </View>
      )}
    </PaperProvider>
  );
};

export default TopicExercise;

const styles = StyleSheet.create({});
