import React, { useState, useEffect } from "react";
import { FlatList, View } from "react-native";
import { List, PaperProvider } from "react-native-paper";
import { Categories } from "../../api/apiNguPhap";
import HeaderScreen from "../../components/header/HeaderScreen";

const NguPhap_S1 = ({ navigation }) => {
  const renderCategories = ({ item }) => (
    <List.Accordion
      key={item.id}
      title={item.title}
      style={{
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "gray",
        marginVertical: 6,
        marginHorizontal: 10,
        height: 60,
        backgroundColor: "white",
      }}
    >
      {item.subTopics.map((subTopics) => (
        <View
          key={subTopics.id}
          style={{ alignItems: "flex-end", marginRight: 12 }}
        >
          <List.Item
            title={subTopics.title}
            onPress={() =>
              navigation.navigate("NguPhap_S2", { data: subTopics })
            }
            style={{
              borderRadius: 12,
              borderWidth: 1,
              borderColor: "gray",
              marginVertical: 3,
              backgroundColor: "white",
              width: "93%",
              height: 50,
            }}
          />
        </View>
      ))}
    </List.Accordion>
  );

  return (
    <PaperProvider>
      <HeaderScreen title="Ngữ Pháp" />

      <View style={{ flex: 1, backgroundColor: "white" }}>
        <FlatList
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderCategories}
          data={Categories}
        />
      </View>
    </PaperProvider>
  );
};

export default NguPhap_S1;
