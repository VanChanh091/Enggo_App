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

  const handleTruyen = (tag) => {
    switch (tag) {
      case "Truyện ngắn":
        return TruyenNgan.flatMap((truyen) => truyen.listTruyen);
      case "Truyện cổ tích":
        return TruyenCoTich.flatMap((truyen) => truyen.listTruyen);
      case "Truyện cười":
        return TruyenCuoi.flatMap((truyen) => truyen.listTruyen);
      case "Truyện ngụ ngôn":
        return TruyenNguNgon.flatMap((truyen) => truyen.listTruyen);
      case "Mẫu câu giao tiếp":
        return MauCauGiaoTiep.flatMap((truyen) => truyen.listTruyen);
      case "Báo song ngữ":
        return BaoSongNgu.flatMap((truyen) => truyen.listTruyen);
      case "Châm ngôn hay":
        return ChamNgonHay.flatMap((truyen) => truyen.listTruyen);
      default:
      // navigation.navigate("SongNgu_S1");
    }
  };

  const renderListTruyens = ({ item }) => (
    <TouchableOpacity
      style={{
        width: "95%",
        height: 70,
        borderWidth: 1,
        borderRadius: 12,
        borderColor: "gray",
        flexDirection: "row",
        marginHorizontal: 10,
        marginTop: 10,
      }}
      onPress={() => navigation.navigate("SongNgu_S3", { dataTruyen: item })}
    >
      <View
        style={{
          flex: 1.2,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text key={item.id} style={{ fontWeight: "bold", fontSize: 18 }}>
          {item.id}
        </Text>
      </View>
      <View style={{ flex: 8.8, justifyContent: "center" }}>
        <Text style={{ fontWeight: 500, fontSize: 17 }}>{item.titleEn}</Text>
        <Text
          style={{
            fontWeight: 600,
            fontSize: 16,
            color: "gray",
            marginTop: 3,
          }}
        >
          {item.titleVn}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <PaperProvider>
      <Appbar.Header style={{ backgroundColor: "#2A7BD3" }}>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content title={data.tag} color="white" />
      </Appbar.Header>

      <View style={{ flex: 1 }}>
        <FlatList
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderListTruyens}
          data={handleTruyen(data.tag)}
        />
      </View>
    </PaperProvider>
  );
};

export default SongNgu_S2;

const styles = StyleSheet.create({});
