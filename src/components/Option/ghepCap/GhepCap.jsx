import {
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Appbar, PaperProvider } from "react-native-paper";
import themeContext from "../../../context/themeContext";

const GhepCap = ({ navigation, route }) => {
  const { dataVocab } = route.params;

  const theme = useContext(themeContext);

  const [shuffledData, setShuffledData] = useState([]);
  const [selectedWord, setSelectedWord] = useState(null);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [lives, setLives] = useState(3);
  const [tempColors, setTempColors] = useState({});

  useEffect(() => {
    let combinedData = [];

    dataVocab.forEach((item) => {
      combinedData.push({ _id: item._id, value: item.en, type: "en" });
      combinedData.push({ _id: item._id, value: item.vn, type: "vn" });
    });

    // Shuffle the array to create randomness
    const shuffled = shuffleArray(combinedData);

    setShuffledData(shuffled.slice(0, countEnVn(dataVocab)));
  }, []);

  // Calculate total vocabulary entries in API
  const countEnVn = (data) => {
    return data.length * 2;
  };

  // Function to shuffle array
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const handleMatchWords = (word) => {
    // If there's no selected word, select this word
    if (!selectedWord) {
      setSelectedWord(word);
      setTempColors({ [word._id + word.type]: "blue" }); // Highlight selected item
    } else {
      // If the clicked word is the same as the selected one, deselect it
      if (selectedWord._id === word._id && selectedWord.type === word.type) {
        setSelectedWord(null);
        setTempColors({}); // Reset selection colors
      } else {
        // Check for a match
        if (selectedWord._id === word._id && selectedWord.type !== word.type) {
          // Correct match
          const updatedData = shuffledData.map((item) =>
            item._id === word._id ? { ...item, tempColor: "green" } : item
          );

          setShuffledData(updatedData);
          setTimeout(() => {
            const finalData = updatedData.filter(
              (item) => item._id !== word._id
            );
            setShuffledData(finalData);
            setSelectedWord(null);
            setTempColors({}); // Reset selection colors

            if (finalData.length === 0) {
              setIsQuizCompleted(true);
            }
          }, 500);
        } else {
          // Incorrect match: highlight both selected items in red
          const updatedData = shuffledData.map((item) =>
            item === selectedWord || item === word
              ? { ...item, tempColor: "red" }
              : item
          );

          setShuffledData(updatedData);
          setTimeout(() => {
            const resetData = updatedData.map((item) =>
              item.tempColor === "red" ? { ...item, tempColor: "white" } : item
            );
            setShuffledData(resetData);
            setSelectedWord(null);
            setTempColors({}); // Reset selection colors

            // Reduce lives after incorrect match
            setLives((prevLives) => {
              const newLives = prevLives - 1;
              if (newLives === 0) {
                Alert.alert("Game Over", "You have run out of lives!");
                setIsQuizCompleted(true);
              }
              return newLives;
            });
          }, 500);
        }
      }
    }
  };

  const renderVocabulary = ({ item }) => {
    const backgroundColor = item.tempColor || "white"; // Use tempColor if set, otherwise white
    const borderColor = tempColors[item._id + item.type] || "gray"; // Default to gray unless selected

    return (
      <TouchableOpacity
        style={{
          width: 125,
          height: 140,
          borderRadius: 12,
          marginHorizontal: 5,
          marginTop: 12,
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 1,
          borderColor: borderColor, // Use the border color based on selection
          backgroundColor: backgroundColor,
        }}
        onPress={() => handleMatchWords(item)}
      >
        <Text
          style={{
            fontSize: 16,
            color: item.type === "en" ? "#2A7BD3" : "black",
            fontWeight: "500",
            marginHorizontal: 3,
          }}
        >
          {item.value}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <PaperProvider>
      <Appbar.Header style={{ backgroundColor: "#2A7BD3" }}>
        <View style={{ flex: 8 }}>
          <Appbar.BackAction
            color="white"
            onPress={() => navigation.goBack()}
          />
        </View>
        <View
          style={{
            flex: 2,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../../img/imgBoTuVung/heartPink.png")}
            style={{ width: 28, height: 28, resizeMode: "contain" }}
          />
          <Text style={{ fontSize: 22, marginLeft: 10, color: "white" }}>
            {lives}
          </Text>
        </View>
      </Appbar.Header>

      {!isQuizCompleted ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.backgroundGhepCap,
          }}
        >
          <FlatList
            keyExtractor={(item) => item._id + item.type}
            renderItem={renderVocabulary}
            data={shuffledData}
            numColumns={3}
          />
        </View>
      ) : (
        // Display upon quiz completion
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.backgroundGhepCap,
          }}
        >
          {lives === 0 ? (
            <Text
              style={{
                fontSize: 18,
                marginTop: 10,
                color: "gray",
                color: theme.color,
              }}
            >
              Cố gắng lên bạn nhé!
            </Text>
          ) : (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text
                style={{ fontWeight: "bold", fontSize: 22, color: theme.color }}
              >
                Congratulation!
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  marginTop: 7,
                  color: "gray",
                  color: theme.color,
                }}
              >
                Bạn đã hoàn thành tất cả câu hỏi!
              </Text>
            </View>
          )}

          <TouchableOpacity
            style={{
              width: 120,
              height: 45,
              borderRadius: 12,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
              backgroundColor: "#F4C33A",
            }}
            onPress={() => navigation.navigate("BoTuVung_S1")}
          >
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>OK</Text>
          </TouchableOpacity>
        </View>
      )}
    </PaperProvider>
  );
};

export default GhepCap;
