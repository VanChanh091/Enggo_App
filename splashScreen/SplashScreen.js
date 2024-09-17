import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Logo from "../assets/logoSplashScreen.png";
import LoadingModal from "../src/modal/LoadingModal";

const SplashScreen = () => {
  const [loading, setLoading] = useState(true);
  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <Image
          source={Logo}
          style={{ width: 80, height: 100, resizeMode: "contain" }}
        />
        <ActivityIndicator color={'black'} style={{marginTop:20}}/>
      </View>
      
    </>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
