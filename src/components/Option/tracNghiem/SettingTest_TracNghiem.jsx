import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Appbar, PaperProvider } from "react-native-paper";
import { CheckBox } from "@rneui/themed";
import HeaderScreen from "../../header/HeaderScreen";

const SettingTest_TracNghiem = ({ navigation, route }) => {
  const { dataVocab } = route.params;

  const [isDocNgheSelected, setIsDocNgheSelected] = useState(0);
  const [isNghiaTuSelected, setIsNghiaTuSelected] = useState(0);

  const handleStart = () => {
    const settings = {
      type: isDocNgheSelected ? "nghe" : "doc",
      mode: isNghiaTuSelected ? "tu-nghia" : "nghia-tu",
    };
    if (settings.type === "doc") {
      navigation.navigate("TracNghiem_Doc", {
        settings: settings,
        data: dataVocab,
      });
    } else {
      navigation.navigate("TracNghiem_Nghe", {
        settings: settings,
        data: dataVocab,
      });
    }
  };

  return (
    <PaperProvider>
      <HeaderScreen title="" />

      <View
        style={{
          flex: 1,
          backgroundColor: "white",
        }}
      >
        {/* setting test */}
        <View style={{ flex: 8 }}>
          <Text style={{ fontSize: 18, marginTop: 25, marginLeft: 12 }}>
            Cài đặt kiểm tra:
          </Text>
          <View
            style={{
              width: "100%",
              height: 70,
              borderWidth: 1,
              borderColor: "#D0D0D0",
              flexDirection: "row",
              marginTop: 15,
            }}
          >
            <View
              style={{
                flex: 1,
                borderRightWidth: 1,
                borderColor: "#D0D0D0",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* doc */}
              <CheckBox
                checked={isDocNgheSelected === 0}
                onPress={() => setIsDocNgheSelected(0)}
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
              />
              <Text style={{ fontSize: 18 }}>Đọc</Text>
            </View>
            <View
              style={{
                flex: 1,
                borderColor: "gray",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* nghe */}
              <CheckBox
                checked={isDocNgheSelected === 1}
                onPress={() => setIsDocNgheSelected(1)}
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
              />
              <Text style={{ fontSize: 18 }}>Nghe</Text>
            </View>
          </View>
          <View
            style={{
              marginTop: 15,
              width: "100%",
              height: 120,
            }}
          >
            <View style={{ flex: 1 }}>
              <View
                style={{
                  flex: 1,
                  borderColor: "gray",
                  flexDirection: "row",
                  alignItems: "center",
                  marginLeft: 10,
                }}
              >
                {/* nghia - tu */}
                <CheckBox
                  checked={isNghiaTuSelected === 0}
                  onPress={() => setIsNghiaTuSelected(0)}
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                />
                <Text style={{ fontSize: 18 }}>Nghĩa - Từ</Text>
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <View
                style={{
                  flex: 1,
                  borderColor: "gray",
                  flexDirection: "row",
                  alignItems: "center",
                  marginLeft: 10,
                }}
              >
                {/* tu - nghia */}
                <CheckBox
                  checked={isNghiaTuSelected === 1}
                  onPress={() => setIsNghiaTuSelected(1)}
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                />
                <Text style={{ fontSize: 18 }}>Từ - Nghĩa</Text>
              </View>
            </View>
          </View>
        </View>

        {/* button */}
        <View style={{ flex: 2, alignItems: "center" }}>
          <TouchableOpacity
            style={{
              width: "80%",
              height: 60,
              borderRadius: 12,
              backgroundColor: "#F4C33A",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={handleStart}
          >
            <Text style={{ fontWeight: "bold", fontSize: 22 }}>Bắt đầu</Text>
          </TouchableOpacity>
        </View>
      </View>
    </PaperProvider>
  );
};

export default SettingTest_TracNghiem;

const styles = StyleSheet.create({});
