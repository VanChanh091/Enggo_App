import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Appbar, PaperProvider } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

import { useDispatch } from "react-redux";
import authentication from "../../apis/authApi";
import { Validate } from "../../ultis/Validate";
import LoadingModal from "../../modal/LoadingModal";



const initValues = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};


const SignUp = ({ navigation }) => {
  const [values, setValues] = useState(initValues);
  const [isLoading,setIsLoading] = useState(false);

  const [isPasswordVisible, setPasswordVisible] = useState(false); //password co the nhin thay duoc mac dinh la false
  const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const [isDisable, setIsDisable] = useState(true);

  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!isConfirmPasswordVisible);
  };


  const handleChangeValue = (key, value) => {
    setValues(prevValues => ({ ...prevValues, [key]: value }));
  };

  const handleRegister = async () => {
    const { username, email, password, confirmPassword } = values;

    console.log(username , email, password, confirmPassword);
    
    if (!username) {
      Alert.alert("Lỗi", "Bạn chưa nhập họ tên");
      return;
    }
    if (!email) {
      Alert.alert("Lỗi", "Bạn chưa nhập email");
      return;
    }
    const emailValidate = Validate.email(email);
    const passwordValidate = Validate.Password(password);
    const confirmPasswordValidate = Validate.Password(confirmPassword);
    
    if (!emailValidate) {
      Alert.alert("Lỗi", "Email không hợp lệ");
      return;
    }
    if (!passwordValidate) {
      Alert.alert("Lỗi", "Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }
    if (!confirmPasswordValidate) {
      Alert.alert("Lỗi", "Mật khẩu xác thực phải có ít nhất 6 ký tự");
      return;
    }
    if (!password) {
      Alert.alert("Lỗi", "Bạn chưa nhập mật khẩu");
      return;
    }
    if (!confirmPassword) {
      Alert.alert("Lỗi", "Bạn chưa nhập lại mật khẩu");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Lỗi", "Mật khẩu không trùng khớp");
      return;
    }

    // phan xu ly
    const api = '/verification';
    setIsLoading(true);
    try {
      const res = await authentication.HandleAuthentication(api, { email }, 'post');

      console.log(res);
      setIsLoading(false);
      if (res.status === 200) {
        navigation.navigate('Verification', { code: res.data.code, ...values });
      }

    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1.1,
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          style={{ marginLeft: 15 }}
          onPress={() => navigation.goBack()}
        >
          {/* <Ionicons name="arrow-back-outline" size={30} color="black" /> */}
        </TouchableOpacity>
      </View>

      {/* Sign up form */}
      <View
        style={{
          flex: 3.6,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={{ width: "85%", height: "100%", paddingTop: 10 }}>
          <Text style={{ fontWeight: "bold", fontSize: 28 }}>Đăng ký</Text>
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
              <Ionicons name="person-outline" size={25} color="black" />
            </View>
            <View style={{ flex: 8.5, justifyContent: "center" }}>

              <TextInput

            
                onChangeText={val => handleChangeValue('username', val)}
                value={values.username}

                placeholder="Nhập họ tên của bạn"

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
              marginTop: 15,
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

            {/* Email */}
            <View style={{ flex: 8.5, justifyContent: "center" }}>
              <TextInput

                placeholder="abc@gmail.com"
                onChangeText={val => handleChangeValue('email', val)}
                value={values.email}

                

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
              marginTop: 15,
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

                value={values.password}
                onChangeText={val => handleChangeValue("password",val)}
                secureTextEntry={!isPasswordVisible}
   

                // value={password}
                // onChangeText={setPassword}
                // secureTextEntry={!isPasswordVisible}
                placeholder="Nhập mật khẩu của bạn"

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


          {/* Confirm password */}
          <View
            style={{
              width: "100%",
              height: 55,
              borderWidth: 1,
              borderRadius: 12,
              marginTop: 15,
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

                value={values.confirmPassword}
                onChangeText={val => handleChangeValue("confirmPassword",val)}
                secureTextEntry={!isConfirmPasswordVisible}
   

                // value={password}
                // onChangeText={setPassword}
                // secureTextEntry={!isPasswordVisible}
                placeholder="Xác nhận lại mật khẩu"

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

      {/* other sign up methods */}
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
            onPress={handleRegister}
          >
            <Text style={{ color: "white", fontSize: 20 }}>Đăng ký</Text>
          </TouchableOpacity>
          <Text
            style={{
              color: "gray",
              fontWeight: "bold",
              fontSize: 18,
              marginTop: 30,
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
              marginTop: 25,
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
              <Text style={{ fontSize: 18 }}>Đăng ký với Google</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: "100%",
              height: 50,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 15,
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
              <Text style={{ fontSize: 18 }}>Đăng ký với Facebook</Text>
            </View>
          </TouchableOpacity>
          <Text style={{ fontSize: 16, marginTop: 8 }}>
            Ban đã có tài khoản?
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={{ color: "#5669fe", fontSize: 16, marginLeft: 5 }}>
                Đăng nhập
              </Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
      <LoadingModal visible={isLoading}/>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
