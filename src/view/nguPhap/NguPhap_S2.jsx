import React, { useState, useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import HeaderScreen from "../../components/header/HeaderScreen";

const NguPhap_S2 = ({ navigation, route }) => {
  const { data } = route.params;

  return (
    <PaperProvider>
      <HeaderScreen title={data.title} />

      <ScrollView style={{ flex: 1 }}>
        {data.content.map((noiDung) => (
          <View key={noiDung.id}>
            <View style={{ flexDirection: "row", marginTop: 12 }}>
              <Text style={{ fontSize: 18, fontWeight: 500, marginLeft: 12 }}>
                {noiDung.id}.{" "}
              </Text>
              <Text style={{ fontSize: 18, fontWeight: 500, marginLeft: 4 }}>
                {noiDung.heading}
              </Text>
            </View>
            <Text style={{ marginTop: 5, marginHorizontal: 12, fontSize: 16 }}>
              {noiDung.text}
            </Text>
          </View>
        ))}
      </ScrollView>
    </PaperProvider>
  );
};

export default NguPhap_S2;
