import React, { useContext } from "react";
import {
  FlatList,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import themeContext from "../../context/themeContext";

const ListTopic = ({ data, navigationScreen }) => {
  const navigation = useNavigation();

  const theme = useContext(themeContext);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={{ flex: 1, height: 125, margin: 6 }}
      onPress={() => navigation.navigate(navigationScreen, { data: item })}
    >
      <ImageBackground
        source={{ uri: item.background }}
        style={{
          width: "100%",
          height: "100%",
          resizeMode: "cover",
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
        <View style={{ flex: 4 }}>
          <Text
            style={{
              fontSize: 17,
              color: "white",
              marginVertical: 10,
              marginHorizontal: 10,
            }}
          >
            {item.title}
          </Text>
        </View>
        <View
          style={{
            flex: 6,
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <View
            style={{
              width: 30,
              height: 30,
              borderRadius: 15,
              backgroundColor: "white",
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#d0d0d0",
              marginRight: 7,
              marginBottom: 7,
            }}
          >
            <Text style={{ fontWeight: "500", fontSize: 15 }}>
              {item.Items.length}
            </Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, marginBottom: 10 }}>
      <FlatList
        data={data}
        keyExtractor={(index) => index._id}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={{ paddingHorizontal: 8 }}
      />
    </View>
  );
};

export default ListTopic;
