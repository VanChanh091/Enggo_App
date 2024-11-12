import React, { useContext } from "react";
import { ScrollView, Text, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import HeaderScreen from "../../components/header/HeaderScreen";
import themeContext from "../../theme/themeContext";

const NguPhap_S2 = ({ route }) => {
  const { data } = route.params;
  const theme = useContext(themeContext);

  return (
    <PaperProvider>
      <HeaderScreen title={data.title} />

      <ScrollView style={{ flex: 1, backgroundColor: theme.background }}>
        {data.content.map((noiDung, index) => (
          <View key={noiDung.id || index}>
            <View style={{ flexDirection: "row", marginTop: 12 }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 500,
                  marginLeft: 12,
                  color: theme.color,
                }}
              >
                {noiDung.id}.{" "}
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 500,
                  marginLeft: 4,
                  color: theme.color,
                }}
              >
                {noiDung.heading}
              </Text>
            </View>
            <Text
              style={{
                marginTop: 5,
                marginHorizontal: 12,
                fontSize: 16,
                color: theme.color,
              }}
            >
              {noiDung.text}
            </Text>
          </View>
        ))}
      </ScrollView>
    </PaperProvider>
  );
};

export default NguPhap_S2;
