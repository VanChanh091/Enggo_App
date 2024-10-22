import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  MD2Colors,
  PaperProvider,
} from "react-native-paper";
import ApiTruyenChem from "../../api/ApiTruyenChem";
import HeaderScreen from "../../components/header/HeaderScreen";
import { appInfo } from "../../constants/appInfos";

const TruyenChem_S1 = ({ navigation }) => {
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
      if (data && data.data) {
        setStories(data.data);
        console.log('Stories:', data.data);
      } else {
        console.log('No stories found');
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const listTruyenChem = ({ item }) => (
    <TouchableOpacity
      style={{
        width: "90%",
        height: 100,
        flexDirection: "row",
        backgroundColor: "#f3f3f3",
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
          source={item.image}
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
          backgroundColor: "white",
        }}
      >
        <View style={{ flex: 9 }}>
          {loading ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator animating={true} color={MD2Colors.blue800} />
            </View>
          ) : (
            <FlatList
              keyExtractor={(index) => index.id}
              horizontal={false}
              renderItem={listTruyenChem}
              data={ApiTruyenChem}
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
