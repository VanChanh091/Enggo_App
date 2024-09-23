import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Appbar, PaperProvider } from "react-native-paper";
import {
  BaoSongNgu,
  ChamNgonHay,
  MauCauGiaoTiep,
  TruyenCoTich,
  TruyenCuoi,
  TruyenNgan,
  TruyenNguNgon,
} from "../../api/apiSongNgu";

const SongNgu_S2 = ({ navigation, route }) => {
  const { data } = route.params;
  console.log(data);

  return (
    <PaperProvider>
      <Appbar.Header style={{ backgroundColor: "#2A7BD3" }}>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content title={data.topic} color="white" />
      </Appbar.Header>

      <View style={{ flex: 1 }}>
        {data.subTopic.map((subTopic) => (
          <TouchableOpacity
            style={{
              width: "95%",
              height: 75,
              borderWidth: 1,
              borderRadius: 12,
              borderColor: "gray",
              flexDirection: "row",
              marginHorizontal: 10,
              marginTop: 10,
            }}
            key={subTopic.id}
            onPress={() =>
              navigation.navigate("SongNgu_S3", { dataTruyen: subTopic })
            }
          >
            <View
              style={{
                flex: 1.2,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                key={subTopic.id}
                style={{ fontWeight: "bold", fontSize: 18 }}
              >
                {subTopic.id}
              </Text>
            </View>
            <View style={{ flex: 8.8, justifyContent: "center" }}>
              <Text style={{ fontWeight: 500, fontSize: 17 }}>
                {subTopic.titleEn}
              </Text>
              <Text
                style={{
                  fontWeight: 600,
                  fontSize: 16,
                  color: "gray",
                  marginTop: 3,
                }}
              >
                {subTopic.titleVn}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </PaperProvider>
  );
};

export default SongNgu_S2;

const styles = StyleSheet.create({});
