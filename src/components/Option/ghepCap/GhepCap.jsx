import {
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Appbar, PaperProvider } from "react-native-paper";

const GhepCap = ({ navigation, route }) => {
  const { dataVocab } = route.params;

  const [shuffledData, setShuffledData] = useState([]);
  const [selectedWords, setSelectedWords] = useState([]);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [lives, setLives] = useState(3);

  useEffect(() => {
    // create new array contain value "en" and "vn"
    let combinedData = [];

    dataVocab.forEach((item) => {
      combinedData.push({ id: item.id, value: item.en, type: "en" });
      combinedData.push({ id: item.id, value: item.vn, type: "vn" });
    });

    // Shuffle contain random values
    const shuffled = shuffleArray(combinedData);

    setShuffledData(shuffled.slice(0, countEnVn(dataVocab)));
  }, []);

  //  cal total vocab en and vn in api
  const countEnVn = (data) => {
    let countEn = 0;
    let countVn = 0;

    data.forEach((item) => {
      if (item.en) countEn++;
      if (item.vn) countVn++;
    });

    return countEn + countVn;
  };

  // random items
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const handleMatchWords = (selectedWord) => {
    if (selectedWords.length === 0) {
      // If no words are selected, select the current word
      setSelectedWords([selectedWord]);
    } else {
      // Compare with the already selected word
      const [firstSelected] = selectedWords;

      if (
        firstSelected.id === selectedWord.id &&
        firstSelected.type !== selectedWord.type
      ) {
        // Correct match, remove both words
        const updatedData = shuffledData.filter(
          (item) => item.id !== selectedWord.id
        );
        setShuffledData(updatedData);
        setSelectedWords([]);

        // Check if all words are matched
        if (updatedData.length === 0) {
          setIsQuizCompleted(true);
        }
      } else {
        // Incorrect match, reduce lives
        setLives((prevLives) => {
          const newLives = prevLives - 1;
          if (newLives === 0) {
            Alert.alert("Game Over", "You have run out of lives!");
            setIsQuizCompleted(true);
          }
          return newLives;
        });
        setSelectedWords([]);
      }
    }
  };

  const renderVocabulary = ({ item }) => {
    // Determine styles based on the selection and match state
    const isSelected = selectedWords.some((word) => word.id === item.id);
    const isMatched =
      item.type === "en" &&
      selectedWords.length > 0 &&
      selectedWords[0].id === item.id &&
      selectedWords[0].type !== item.type;

    let backgroundColor = "white";
    let borderColor = "gray";

    if (isSelected) {
      borderColor = "#2A7BD3"; // Blue border for selected item
    }
    if (isMatched) {
      backgroundColor = "lightgreen"; // Green background for correct match
    } else if (
      selectedWords.length > 0 &&
      selectedWords[0].id !== item.id &&
      selectedWords[0].type !== item.type
    ) {
      backgroundColor = "lightcoral"; // Red background for incorrect match
    }

    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
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
            borderColor: borderColor,
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
      </View>
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
        <View style={{ flex: 1 }}>
          <FlatList
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderVocabulary}
            data={shuffledData}
            numColumns={3}
          />
        </View>
      ) : (
        // Hiển thị khi hoàn thành bài trắc nghiệm
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {lives === 0 ? (
            <Text style={{ fontSize: 18, marginTop: 10, color: "gray" }}>
              Cố gắng lên bạn nhé!
            </Text>
          ) : (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={{ fontWeight: "bold", fontSize: 22 }}>
                Congratulation!
              </Text>
              <Text style={{ fontSize: 18, marginTop: 7, color: "gray" }}>
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
