import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const ListItems = ({ data, navigationScreen }) => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, marginTop: 10 }}>
      <ScrollView>
        {/* background */}
        <View
          style={{
            width: "100%",
            height: 230,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={data.background}
            style={{ width: "92%", height: "100%", resizeMode: "contain" }}
          />
        </View>

        {/* list  */}
        <View
          style={{
            flex: 7,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <View
            style={{
              width: "92%",
              height: "100%",
              alignItems: "flex-end",
            }}
          >
            {data.list.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  width: "100%",
                  height: 95,
                  borderRadius: 10,
                  marginVertical: 6,
                  flexDirection: "row",
                  backgroundColor: "#E6E6E6",
                  borderWidth: 1,
                  borderColor: "#B3B7B7",
                }}
                onPress={() =>
                  navigation.navigate(navigationScreen, {
                    data: item,
                  })
                }
              >
                <View
                  style={{
                    flex: 7,
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontSize: 15, paddingLeft: 10 }}>
                    {item.title}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 3,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={item.image}
                    style={{
                      width: "80%",
                      height: "80%",
                      borderRadius: 6,
                    }}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ListItems;

const styles = StyleSheet.create({});
