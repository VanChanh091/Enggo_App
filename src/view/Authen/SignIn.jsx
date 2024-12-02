import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Switch,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Validate } from "../../ultis/Validate";
import authentication from "../../apis/authApi";
import { useDispatch } from "react-redux";
import { addAuth } from "../../redux/reducers/authReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { appInfo } from "../../constants/appInfos";
import LoadingModal from "../../loadingModal/LoadingModal";

const SignIn = ({ navigation }) => {
  // Switch
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setPasswordVisible] = useState(false); //password co the nhin thay duoc mac dinh la false
  const [loading, setLoading] = useState(false);


  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };


  const handleLogin = async () => {
    // Validate email and password
    const emailValidate = Validate.email(email);
    const passwordValidate = Validate.Password(password);
  
    if (!emailValidate) {
      Alert.alert("Lỗi", "Email không hợp lệ");
      return;
    }
    if (!passwordValidate) {
      Alert.alert("Lỗi", "Mật khẩu không hợp lệ");
      return;
    }
  
    const data = { email, password };
    try {
      setLoading(true);
  
      const res = await fetch(`${appInfo.Host_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      const resData = await res.json();
      console.log("res data:", resData);
  
      if (res.status === 400) {
        setLoading(false);
        Alert.alert("Lỗi đăng nhập", "Email không tồn tại");
        return;
      }
      if (res.status === 401) {
        setLoading(false);
        Alert.alert("Lỗi đăng nhập", "Mật khẩu không chính xác");
        return;
      }
  
      dispatch(addAuth(resData.data));
      await AsyncStorage.setItem('auth', JSON.stringify(resData.data));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      Alert.alert("Lỗi", "Đăng nhập thất bại");
    }
  };
  

  return (
    <View style={styles.container}>
      {/* logo */}
      <View
        style={{
          flex: 2.7,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={require("../../img/imgAuth/logoSplashScreen.png")}
          style={{
            marginTop: 18,
            width: 100,
            height: 100,
            resizeMode: "contain",
          }}
        ></Image>
        <Text style={{ fontWeight: "bold", fontSize: 35, marginTop: 5 }}>
          Enggo
        </Text>
      </View>

      {/* Sign in form */}
      <View
        style={{
          flex: 3,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={{ width: "85%", height: "100%", paddingTop: 10 }}>
          <Text style={{ fontWeight: "bold", fontSize: 26 }}>Đăng nhập</Text>
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
              <Ionicons name="mail-outline" size={25} color="black" />
            </View>
            <View style={{ flex: 8.5, justifyContent: "center" }}>
              {/* Input Email */}
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Nhập email"
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
          <View
            style={{
              width: "100%",
              height: 55,
              borderWidth: 1,
              borderRadius: 12,
              marginTop: 18,
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
              {/* Input Password */}
              <TextInput
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!isPasswordVisible}
                placeholder="Nhập mật khẩu"
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
              height: 45,
              marginTop: 15,
              flexDirection: "row",
            }}
          >
            <View
              style={{
                flex: 6,
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  flex: 3,
                }}
              >
                <Switch
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                  style={{ width: 35, height: 25 }}
                />
              </View>
              <View style={{ flex: 7, marginTop: 5 }}>
                <Text style={{ fontSize: 16, marginLeft: -5 }}>
                  Nhớ tài khoản
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 4,
                // alignItems: "center",
                // justifyContent: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("RequestResetPassword")}
              >
                <Text style={{ fontSize: 16, marginTop: 5 }}>
                  Quên mật khẩu?
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      {/* other login methods */}
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
            onPress={handleLogin}
          >
            <Text style={{ color: "white", fontSize: 18 }}>Đăng nhập</Text>
          </TouchableOpacity>
          <Text
            style={{
              color: "gray",
              fontWeight: "bold",
              fontSize: 18,
              marginTop: 35,
            }}
          >
            Hoặc
          </Text>
          <TouchableOpacity
            style={{
              width: "100%",
              height: 50,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 12,
              flexDirection: "row",
              borderWidth: 1,
              borderColor: "gray",
            }}
          >
            <View
              style={{
                flex: 3,
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../img/imgAuth/google.png")}
                style={{ width: 32, height: 32, resizeMode: "contain" }}
              />
            </View>
            <View style={{ flex: 7 }}>
              <Text style={{ fontSize: 18 }}>Đăng nhập với Google</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: "100%",
              height: 50,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 12,
              flexDirection: "row",
              borderWidth: 1,
              borderColor: "gray",
            }}
          >
            <View
              style={{
                flex: 3,
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../img/imgAuth/fb.png")}
                style={{ width: 32, height: 32, resizeMode: "contain" }}
              />
            </View>
            <View style={{ flex: 7 }}>
              <Text style={{ fontSize: 18 }}>Đăng nhập với Facebook</Text>
            </View>
          </TouchableOpacity>
          <Text style={{ fontSize: 16, marginTop: 8 }}>
            Bạn chưa có tài khoản?
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <Text style={{ color: "#5669fe", fontSize: 16, marginLeft: 5 }}>
                Đăng ký
              </Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
      <LoadingModal visible={loading} />
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
