import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { PaperProvider } from "react-native-paper";
import HeaderScreen from "../../../components/header/HeaderScreen";
import { Ionicons } from "@expo/vector-icons";

const Parody = ({ route }) => {
  const { data } = route.params;
  return (
    <PaperProvider>
      <HeaderScreen title={"Nói nhại"} />

      <View style={{ flex: 1 }}>
        <ScrollView>
          {data.content.map((item, index) => (
            <View
              key={index}
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: "90%",
                  height: 120,
                  borderWidth: 1,
                  borderRadius: 10,
                  marginVertical: 10,
                  flexDirection: "row",
                }}
                key={index}
              >
                <View style={{ flex: 8, borderRightWidth: 1 }}>
                  <ScrollView>
                    <Text
                      style={{
                        fontWeight: 400,
                        fontSize: 16,
                        paddingHorizontal: 10,
                        paddingVertical: 10,
                      }}
                    >
                      {item.text}
                    </Text>
                  </ScrollView>
                </View>
                <View
                  style={{
                    flex: 2,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity>
                    <Ionicons
                      name="volume-medium-sharp"
                      color="black"
                      size={32}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={{ paddingTop: 15 }}>
                    <Ionicons name="mic-sharp" color="black" size={32} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </PaperProvider>
  );
};

export default Parody;

const styles = StyleSheet.create({});
