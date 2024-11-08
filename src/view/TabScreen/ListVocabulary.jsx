import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useContext } from "react";
import { PaperProvider, Appbar } from "react-native-paper";
import themeContext from "../../theme/themeContext";

const ListVocabulary = ({ navigation }) => {
  const theme = useContext(themeContext);
  return (
    <PaperProvider>
      <Appbar.Header style={{ backgroundColor: "#2A7BD3" }}>
        <View
          style={{
            width: "85%",
            height: "100%",
            justifyContent: "center",
            paddingLeft: 15,
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 30, color: "white" }}>
            Enggo
          </Text>
        </View>
        <TouchableOpacity>
          <Appbar.Action icon="bell" size={30} color="white" />
        </TouchableOpacity>
      </Appbar.Header>

      <View style={{ flex: 1, backgroundColor: theme.background }}>
        {/* slogan */}
        <View style={{ flex: 4.5 }}>
          <View
            style={{
              backgroundColor: "#2A7BD3",
              width: "100%",
              height: 120,
              alignItems: "center",
            }}
          >
            <Text style={styles.title}>
              Học ít - nhớ sâu từ vựng với phương pháp khoa học
            </Text>
          </View>

          <View style={{ alignItems: "center" }}>
            <Image
              source={require("../../img/imgTab/chart.png")}
              style={{
                width: 300,
                height: 300,
                resizeMode: "contain",
                marginTop: -85,
              }}
            />
          </View>
        </View>

        {/* my vocab */}
        <View style={{ flex: 5.5 }}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 20,
              marginTop: 20,
              marginLeft: 20,
              color: theme.color,
            }}
          >
            Bộ từ của bạn
          </Text>

          <View
            style={{
              width: "100%",
              height: "100%",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <View
              style={{
                width: 300,
                height: 260,
                borderRadius: 10,
                backgroundColor: theme.background,
                borderColor: theme.border,
                borderWidth: 1,
              }}
            >
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Image
                  source={require("../../img/imgTab/folder.png")}
                  style={{
                    width: 60,
                    height: 60,
                    resizeMode: "contain",
                    marginTop: 10,
                  }}
                />
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 14,
                    marginTop: 10,
                    color: theme.color,
                  }}
                >
                  Bạn chưa lưu từ vựng nào. Hãy lưu lại để ôn tập nhé.
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 14,
                    marginTop: 25,
                    color: theme.color,
                  }}
                >
                  Lưu các từ vựng có sẵn tại đây
                </Text>
                <View
                  style={{
                    width: "100%",
                    height: 70,
                    flexDirection: "row",
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        width: "90%",
                        height: 45,
                        borderRadius: 12,
                        backgroundColor: "#50C5AA",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: 20,
                      }}
                      onPress={() => navigation.navigate("BoTuVungNavigation")}
                    >
                      <Text style={{ fontSize: "17", color: "white" }}>
                        Bộ từ vựng
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={() => navigation.navigate("BoTuVung_S1")}
                  >
                    <TouchableOpacity
                      style={{
                        width: "90%",
                        height: 45,
                        borderRadius: 12,
                        backgroundColor: "#50C5AA",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: 20,
                      }}
                      onPress={() =>
                        navigation.navigate("MauCauGiaoTiepNavigation")
                      }
                    >
                      <Text style={{ fontSize: "17", color: "white" }}>
                        Mẫu câu
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </PaperProvider>
  );
};

export default ListVocabulary;

const styles = StyleSheet.create({
  title: {
    color: "white",
    fontSize: 15,
    marginTop: 10,
    fontStyle: "italic",
  },
});
