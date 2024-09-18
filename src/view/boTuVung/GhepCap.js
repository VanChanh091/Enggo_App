import { FlatList, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Appbar, PaperProvider } from "react-native-paper";

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const GhepCap = ({ route }) => {
  const { dataVocab } = route.params;

  const [shuffledData, setShuffledData] = useState([]);

  useEffect(() => {
    // Tạo mảng mới chứa cả giá trị 'en' và 'vn'
    let combinedData = [];
    dataVocab.forEach((item) => {
      combinedData.push({ id: item.id, value: item.en, type: "en" });
      combinedData.push({ id: item.id, value: item.vn, type: "vn" });
    });

    // Shuffle mảng để các giá trị ngẫu nhiên
    const shuffled = shuffleArray(combinedData);

    // Giới hạn 12 phần tử
    setShuffledData(shuffled.slice(0, 12));
  }, []);

  const renderVocabulary = ({ item }) => (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View
        style={{
          width: 125,
          height: 200,
          borderWidth: 1,
          borderRadius: 12,
          marginHorizontal: 5,
          marginTop: 12,
        }}
      >
        <Text></Text>
      </View>
    </View>
  );

  return (
    <PaperProvider>
      <Appbar.Header style={{ backgroundColor: "#2A7BD3" }}>
        <Appbar.BackAction
          color="white"
          onPress={() => navigation.navigate("TabNavigationContainer")}
        />
      </Appbar.Header>

      <View style={{ flex: 1 }}>
        <FlatList
          keyExtractor={(item) => item.id}
          renderItem={renderVocabulary}
          data={dataVocab}
          numColumns={3}
        />
      </View>
    </PaperProvider>
  );
};

export default GhepCap;
