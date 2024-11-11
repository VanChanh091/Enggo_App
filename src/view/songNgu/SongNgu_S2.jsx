import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import { PaperProvider } from "react-native-paper";
import HeaderScreen from "../../components/header/HeaderScreen";
import themeContext from "../../theme/themeContext";

const SongNgu_S2 = ({ navigation, route }) => {
  const { data } = route.params;
  const theme = useContext(themeContext);

  return (
    <PaperProvider>
      <HeaderScreen title={data.topic} />

      <View style={{ flex: 1, backgroundColor: theme.background }}>
        {data.subTopic.map((subTopic, index) => (
          <TouchableOpacity
            style={{
              width: "95%",
              height: 80,
              borderWidth: 1,
              borderRadius: 12,
              borderColor: theme.border,
              flexDirection: "row",
              marginHorizontal: 10,
              marginTop: 10,
            }}
            key={index}
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
                key={index}
                style={{ fontWeight: "bold", fontSize: 18, color: theme.color }}
              >
                {index + 1}
              </Text>
            </View>
            <View style={{ flex: 8.8, justifyContent: "center" }}>
              <Text
                style={{ fontWeight: 500, fontSize: 17, color: theme.color }}
              >
                {subTopic.titleEn}
              </Text>
              <Text
                style={{
                  fontWeight: 600,
                  fontSize: 16,
                  color: "gray",
                  marginTop: 3,
                  color: theme.color,
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
