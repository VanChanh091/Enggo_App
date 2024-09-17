import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Validate } from "../../ultis/Validate";
import authentication from "../../apis/authApi";

const RequestResetPassword = ({ navigation }) => {

  const [email, setEmail] = useState("");

  const handleSendEmailResetPassword = async () => {
    const emailValidation = Validate.email(email);
    if (!emailValidation) {
      Alert.alert("Lỗi", "Email không hợp lệ.");
      return;
    }
    // Call API send email reset password
    try {
      const res = await authentication.HandleAuthentication("/forgotPassword", { email }, "post");
      console.log(res);

      if (res.status === 200) {
        Alert.alert(
          "Thông báo",
          "Vui lòng kiểm tra email để xem mật khẩu mới.",
          [
            {
              text: "OK",
              onPress: () => navigation.navigate("SignIn")
            }
          ]
        );
      }
    } catch (error) {
      console.error("Error sending reset password email:", error);
      Alert.alert("Lỗi", "Đã xảy ra lỗi khi gửi email đặt lại mật khẩu.");
    }
  };


  return (
    <View style={styles.appContainer}>
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
        style={{ flex: 8.2, alignItems: "center", justifyContent: "center" }}
      >
        <View style={{ width: "85%", height: "100%", paddingTop: 24 }}>
          <Text style={{ fontWeight: "bold", fontSize: 24 }}>
            Tạo lại mật khẩu
          </Text>
          <View style={{ width: 260, height: 60 }}>
            <Text style={{ fontSize: 17, marginTop: 10 }}>
              Vui lòng nhập email của bạn để gửi yêu cầu tạo lại mật khẩu
            </Text>
          </View>

          <View
            style={{
              width: "100%",
              height: 70,
              marginTop: 20,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                width: "100%",
                height: 55,
                borderWidth: 1,
                borderRadius: 12,
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
                <Ionicons name="mail-outline" size={25} color="black" />
              </View>
              <View style={{ flex: 8.5, justifyContent: "center" }}>
                <TextInput
                  placeholder="abc@gmail.com"
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  style={{
                    color: "gray",
                    fontSize: 18,
                    width: "100%",
                    height: "100%",
                    borderRadius: 12,
                  }}
                />
              </View>
            </View>
          </View>

          <View
            style={{
              width: "100%",
              height: 70,
              marginTop: 15,
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{
                width: "90%",
                height: 50,
                backgroundColor: "#5669fe",
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 12,
              }}
              onPress={handleSendEmailResetPassword}
            >
              <Text style={{ color: "white", fontSize: 20 }}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RequestResetPassword;

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
});
