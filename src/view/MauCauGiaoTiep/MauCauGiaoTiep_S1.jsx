import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { MD2Colors, PaperProvider } from "react-native-paper";
import HeaderScreen from "../../components/header/HeaderScreen";
import { appInfo } from "../../constants/appInfos";
import themeContext from "../../theme/themeContext";

const MauCauGiaoTiep_S1 = ({ navigation }) => {
  const theme = useContext(themeContext);

  const [communication, setCommunication] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${appInfo.Host_URL}/api/communication`);
      const data = await res.json();
      setCommunication(data);
      // console.log("communication data: ", data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderTopicAndVocabulary = ({ item }) => (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity
        style={{
          width: "92%",
          height: 60,
          borderWidth: 1,
          borderRadius: 12,
          borderColor: theme.border,
          marginTop: 10,
          flexDirection: "row",
        }}
        onPress={() => navigation.navigate("MauCauGiaoTiep_S2", { data: item })}
      >
        <View
          style={{
            flex: 1.8,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={{ uri: item.image }}
            // source={item.image}
            style={{ width: 45, height: 45, resizeMode: "contain" }}
          />
        </View>
        <View style={{ flex: 8.2, justifyContent: "center", paddingLeft: 7 }}>
          <Text style={{ fontWeight: 500, fontSize: 18, color: theme.color }}>
            {item.titleEn}
          </Text>
          <Text style={{ marginTop: 4, fontSize: 17, color: theme.text }}>
            {item.titleVn}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
  return (
    <PaperProvider>
      <HeaderScreen title="Mẫu Câu Giao Tiếp" />

      {isLoading ? (
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
        <View style={{ flex: 1, backgroundColor: theme.background }}>
          <View style={{ flex: 9 }}>
            <FlatList
              keyExtractor={(item) => item._id}
              renderItem={renderTopicAndVocabulary}
              data={communication}
            />
          </View>
          <View style={{ flex: 1 }}></View>
        </View>
      )}
    </PaperProvider>
  );
};

export default MauCauGiaoTiep_S1;

const styles = StyleSheet.create({});
