import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  MD2Colors,
  PaperProvider,
} from "react-native-paper";
import HeaderScreen from "../../components/header/HeaderScreen";
import { appInfo } from "../../constants/appInfos";
import themeContext from "../../context/themeContext";

const TruyenChem_S1 = ({ navigation }) => {
  const theme = useContext(themeContext);

  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${appInfo.Host_URL}/api/stories`);
      const data = await res.json();
      setStories(data.data);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const listTruyenChem = ({ item }) => (
    <TouchableOpacity
      style={{
        width: "90%",
        height: 100,
        flexDirection: "row",
        // backgroundColor: "#f3f3f3",
        backgroundColor: theme.backgroundStories,
        marginTop: 12,
        marginLeft: 18,
        borderRadius: 12,
      }}
      onPress={() => navigation.navigate("TruyenChem_S2", { data: item })}
    >
      <View style={{ flex: 7, justifyContent: "center" }}>
        <Text style={{ fontSize: 17, paddingLeft: 13 }}>{item.nameVn}</Text>
      </View>
      <View style={{ flex: 3, justifyContent: "center", alignItems: "center" }}>
        <Image
          source={{ uri: item.image }}
          style={{
            width: 95,
            height: 95,
            resizeMode: "contain",
            borderRadius: 20,
          }}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <PaperProvider>
      <HeaderScreen title={"Truyện Chêm"} />
      <View
        style={{
          flex: 1,
          backgroundColor: theme.background,
        }}
      >
        <View style={{ flex: 9 }}>
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
            <FlatList
              keyExtractor={(index) => index._id}
              horizontal={false}
              renderItem={listTruyenChem}
              data={stories}
            />
          )}
        </View>
        <View style={{ flex: 1 }}></View>
      </View>
    </PaperProvider>
  );
};

export default TruyenChem_S1;

const styles = StyleSheet.create({});
