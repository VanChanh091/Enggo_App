import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  MD2Colors,
  PaperProvider,
} from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import HeaderScreen from "../../components/header/HeaderScreen";
import { appInfo } from "../../constants/appInfos";
import themeContext from "../../theme/themeContext";

const SongNgu_S1 = ({ navigation }) => {
  const theme = useContext(themeContext);

  const [bilingual, setBilingual] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBilingual();
  }, []);

  const fetchBilingual = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${appInfo.Host_URL}/api/bilingual-topics`);
      const data = await res.json();
      setBilingual(data.data);
      // console.log(bilingual);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const renderTagName = ({ item, index }) => (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity
        style={{
          width: "90%",
          height: 60,
          borderWidth: 1,
          marginTop: 13,
          borderRadius: 12,
          flexDirection: "row",
          borderColor: theme.border,
        }}
        onPress={() => navigation.navigate("SongNgu_S2", { data: item })}
        key={item._id}
      >
        <View style={{ flex: 9, alignItems: "center", flexDirection: "row" }}>
          <Text style={{ marginLeft: 15, fontSize: 18, color: theme.color }}>
            {index + 1}.
          </Text>
          <Text style={{ marginLeft: 5, fontSize: 18, color: theme.color }}>
            {item.topic}
          </Text>
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Ionicons
            name="chevron-forward-outline"
            size={25}
            color={theme.color}
          />
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <PaperProvider>
      <HeaderScreen title="Truyện Song Ngữ" />

      <View style={{ flex: 1, backgroundColor: theme.background }}>
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
            renderItem={renderTagName}
            data={bilingual}
          />
        )}
      </View>
    </PaperProvider>
  );
};

export default SongNgu_S1;

const styles = StyleSheet.create({});
