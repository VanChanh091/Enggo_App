import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Appbar, PaperProvider } from "react-native-paper";
import apiSongNgu, { TruyenSongNgu } from "../../api/apiSongNgu";

const SongNgu_S2 = ({ navigation, route }) => {
  const { data } = route.params;
  // console.log(data);

  const renderListTruyen = ({ item }) => (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {item.listTruyen.map((truyen) => (
        <TouchableOpacity
          style={{
            width: "95%",
            height: 70,
            borderWidth: 1,
            marginTop: 13,
            borderRadius: 12,
            borderColor: "gray",
            flexDirection: "row",
          }}
          onPress={() =>
            navigation.navigate("SongNgu_S3", { dataTruyen: item })
          }
        >
          <View
            style={{
              flex: 1.2,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text key={truyen.id} style={{ fontWeight: "bold", fontSize: 18 }}>
              {truyen.id}
            </Text>
          </View>
          <View style={{ flex: 8.8, justifyContent: "center" }}>
            <Text style={{ fontWeight: 600, fontSize: 17 }}>
              {truyen.titleEn}
            </Text>
            <Text
              style={{
                fontWeight: 600,
                fontSize: 15,
                color: "gray",
                marginTop: 3,
              }}
            >
              {truyen.titleVn}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
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
          renderItem={renderListTruyen}
          data={TruyenSongNgu}
        />
      </View>
    </PaperProvider>
  );
};

export default SongNgu_S2;

const styles = StyleSheet.create({});
