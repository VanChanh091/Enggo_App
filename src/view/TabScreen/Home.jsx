import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Appbar, PaperProvider, Searchbar } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { Subjects, Suggest } from "../../api/apiHome";

const Home = ({ navigation }) => {
  const [search, setSearch] = useState("");

  const listSubjects = ({ item }) => (
    <View
      style={{
        width: 90,
        height: 70,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 4,
        marginVertical: 5,
      }}
    >
      <TouchableOpacity onPress={() => handleNavigationSubjects(item.id)}>
        <Image
          source={item.image}
          style={{ width: 45, height: 45, resizeMode: "contain" }}
        />
      </TouchableOpacity>
      <Text style={{ fontSize: 15, marginTop: 5, textAlign: "center" }}>
        {item.name}
      </Text>
    </View>
  );

  const handleNavigationSubjects = (id) => {
    switch (id) {
      case 1:
        navigation.navigate("BaiTapNavigation");
        break;
      case 2:
        navigation.navigate("TinTucNavigation");
        break;
      case 3:
        navigation.navigate("TruyenChemNavigation");
        break;
      case 4:
        navigation.navigate("SongNguNavigation");
        break;
      case 5:
        navigation.navigate("VideoNavigation");
        break;
      case 6:
        navigation.navigate("DanhNgon");
        break;
      case 7:
        navigation.navigate("BoTuVungNavigation");
        break;
      case 8:
        navigation.navigate("NguPhapNavigation");
        break;
      case 9:
        navigation.navigate("ListenNavigation");
        break;
      case 10:
        navigation.navigate("MauCauGiaoTiepNavigation");
        break;
      default:
        navigation.navigate("Home");
        break;
    }
  };

  const listSuggest = ({ item }) => (
    <TouchableOpacity
      style={{
        width: "100%",
        height: 120,
        marginVertical: 7,
        flexDirection: "row",
        borderBottomWidth: 1,
        borderColor: "#D0D0D0",
      }}
    >
      <View style={{ flex: 6.7 }}>
        <View style={{ flex: 6.5 }}>
          <Text style={{ fontSize: 15, marginTop: 4 }}>{item.title}</Text>
        </View>
        <View style={{ flex: 3.5, flexDirection: "row", alignItems: "center" }}>
          <Image source={item.icon} />
          <Text style={{ fontSize: 16, marginLeft: 5 }}>{item.subject}</Text>
        </View>
      </View>
      <View
        style={{
          flex: 3.3,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={item.image}
          style={{ width: 100, height: 100, resizeMode: "contain" }}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <PaperProvider style={{ flex: 1 }}>
      <Appbar.Header elevated="true" style={{ backgroundColor: "white" }}>
        <View
          style={{
            width: "85%",
            height: "100%",
            justifyContent: "center",
            paddingLeft: 15,
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 30, color: "#3B7DED" }}>
            Enggo
          </Text>
        </View>

        <TouchableOpacity>
          <Appbar.Action icon="bell" size={30} />
        </TouchableOpacity>
      </Appbar.Header>

      <ScrollView style={{ flex: 1 }}>
        {/* search bar */}
        <View
          style={{
            width: "100%",
            height: 85,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Searchbar
            placeholder="Search"
            value={search}
            onChangeText={setSearch}
            style={{
              width: "90%",
              height: "65%",
              backgroundColor: "#E9E3E3",
              borderWidth: 1,
              borderColor: "gray",
            }}
          />
        </View>

        {/* Subject */}
        <View
          style={{
            width: "100%",
            height: 320,
            // height: 230,
            justifyContent: "center",
            alignItems: "center",
            borderBottomWidth: 1,
            borderColor: "#D0D0D0",
          }}
        >
          <View style={{ width: "95%", height: "100%" }}>
            <View
              style={{
                flex: 2,
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  flex: 6.5,
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{ fontWeight: "bold", fontSize: 18, marginLeft: 10 }}
                >
                  Nguồn học
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  flex: 3.5,
                  justifyContent: "center",
                  alignItems: "flex-end",
                }}
              >
                <Text
                  style={{ fontSize: 18, color: "#1977F3", marginRight: 15 }}
                >
                  Cách học
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 8 }}>
              <FlatList
                keyExtractor={(item) => item.id}
                numColumns={4}
                horizontal={false}
                renderItem={listSubjects}
                data={Subjects}
                scrollEnabled={false}
              />
            </View>
          </View>
        </View>

        {/* suggested */}
        <View
          style={{
            width: "100%",
            height: 480,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={{ width: "92%", height: "100%" }}>
            <View
              style={{
                flex: 1.5,
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  width: 180,
                  height: 38,
                  borderRadius: 15,
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "#D0D0D0",
                }}
              >
                <View
                  style={{
                    flex: 2,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Ionicons name="star-outline" size={25} color="black" />
                </View>
                <View style={{ flex: 7 }}>
                  <Text style={{ fontSize: 16 }}>Đề xuất cho bạn</Text>
                </View>
              </View>
            </View>
            <View style={{ flex: 8.5 }}>
              <FlatList
                keyExtractor={(item) => item.id}
                horizontal={false}
                renderItem={listSuggest}
                data={Suggest}
                scrollEnabled={false}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </PaperProvider>
  );
};

export default Home;

const styles = StyleSheet.create({});
