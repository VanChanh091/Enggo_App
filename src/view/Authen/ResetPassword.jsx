import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import authentication from "../../apis/authApi";
import LoadingModal from "../../loadingModal/LoadingModal";
import { appInfo } from "../../constants/appInfos";

const ResetPassword = ({ navigation, route }) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false); //password co the nhin thay duoc mac dinh la false
  const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setloading] = useState(false);
  const user = route.params;

  console.log(user);

  const handleChangePassword = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Thất bại!", "Mật khẩu không khớp");
      return;
    }

    // const api = "changePassword";
    const data = { email: user.user.email, password: password };
    setloading(true);

    try {
      const res = await fetch(`${appInfo.Host_URL}/auth/changePassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log("res", res);
      if(res.status === 200){        
        Alert.alert("Thành công", "Đổi mật khẩu thành công", [
          {
            text: "OK",
            onPress: () => {
              navigation.goBack();
            },
          },
        ]);
        

      }else{
        Alert.alert("Thất bại", "Đã có lỗi xảy ra, vui lòng thử lại sau");
      }
      
      setloading(false);
    } catch (error) {
      setloading(false);
      console.log(error);
      Alert.alert("Lỗi", "Đã có lỗi xảy ra, vui lòng thử lại sau");
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        <TouchableOpacity
          style={{ marginLeft: 15 }}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back-outline" size={30} color="black" />
        </TouchableOpacity>
      </View>

      <View
        style={{
          flex: 3,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={{ width: "85%", height: "100%", paddingTop: 10 }}>
          <Text style={{ fontWeight: "bold", fontSize: 28 }}>
            Create New Password
          </Text>
          <View style={{ width: 300, height: 60 }}>
            <Text style={{ fontSize: 17, marginTop: 10, color: "gray" }}>
              Your password must be different from the previous used passwords.
            </Text>
          </View>
          <View
            style={{
              width: "100%",
              height: 55,
              borderWidth: 1,
              borderRadius: 12,
              marginTop: 30,
              flexDirection: "row",
              borderColor: "gray",
            }}
          >
            <View
              style={{
                flex: 1.5,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons name="lock-closed-outline" size={25} color="black" />
            </View>
            <View style={{ flex: 7, justifyContent: "center" }}>
              <TextInput
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!isPasswordVisible}
                placeholder="Mật khẩu mới"
                style={{
                  color: "gray",
                  fontSize: 18,
                  width: "100%",
                  height: "100%",
                  borderRadius: 12,
                }}
              />
            </View>
            <TouchableOpacity
              style={{
                flex: 1.5,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={togglePasswordVisibility}
            >
              <Ionicons
                name={isPasswordVisible ? "eye-outline" : "eye-off-outline"}
                size={25}
                color="black"
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: "100%",
              height: 55,
              borderWidth: 1,
              borderRadius: 12,
              marginTop: 20,
              flexDirection: "row",
              borderColor: "gray",
            }}
          >
            <View
              style={{
                flex: 1.5,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons name="lock-closed-outline" size={25} color="black" />
            </View>
            <View style={{ flex: 7, justifyContent: "center" }}>
              <TextInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!isConfirmPasswordVisible}
                placeholder="Nhập lại mật khẩu mới"
                style={{
                  color: "gray",
                  fontSize: 18,
                  width: "100%",
                  height: "100%",
                  borderRadius: 12,
                }}
              />
            </View>
            <TouchableOpacity
              style={{
                flex: 1.5,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={toggleConfirmPasswordVisibility}
            >
              <Ionicons
                name={
                  isConfirmPasswordVisible ? "eye-outline" : "eye-off-outline"
                }
                size={25}
                color="black"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 4,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            width: "75%",
            height: "100%",
            alignItems: "center",
            // justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={{
              width: "100%",
              height: 50,
              backgroundColor: "#5669fe",
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 12,
            }}
            onPress={handleChangePassword}
          >
            <Text style={{ color: "white", fontSize: 20 }}>Xác nhận</Text>
          </TouchableOpacity>
        </View>
      </View>
      <LoadingModal visible={loading} />
    </View>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
