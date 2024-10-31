import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { PaperProvider } from "react-native-paper";
import HeaderScreen from "../../components/header/HeaderScreen";
import ListTopic from "../../components/topic/ListTopic";
import { appInfo } from "../../constants/appInfos";

const TopicExercise = () => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(`${appInfo.Host_URL}/api/exercises`);
      const data = await res.json();
      setExercises(data.data);
      console.log(data);
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <PaperProvider>
      <HeaderScreen title={"Bài Tập"} />
      <ListTopic data={exercises} navigationScreen={"ListExercise"} />
    </PaperProvider>
  );
};

export default TopicExercise;

const styles = StyleSheet.create({});
