import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useContext } from "react";
import themeContext from "../../../context/themeContext";
import { Subjects } from "../../../api/apiHome";
import { useNavigation } from "@react-navigation/native";

const Subject = () => {
  const navigation = useNavigation();
  const theme = useContext(themeContext);

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
      <Text
        style={{
          fontSize: 15,
          marginTop: 5,
          textAlign: "center",
          color: theme.color,
        }}
      >
        {item.name}
      </Text>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          width: "100%",
          height: 320,
          justifyContent: "center",
          alignItems: "center",
          borderBottomWidth: 1,
          borderColor: theme.border,
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
                style={{
                  fontWeight: "bold",
                  fontSize: 18,
                  marginLeft: 10,
                  color: theme.color,
                }}
              >
                Nguồn học
              </Text>
            </View>
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
    </View>
  );
};

export default Subject;

const styles = StyleSheet.create({});
