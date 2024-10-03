import { Ionicons } from "@expo/vector-icons";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAuth, authSelector } from "../redux/reducers/authReducer";

import SplashScreen from "../../splashScreen/SplashScreen";
import {
  RequestResetPassword,
  ResetPassword,
  SignIn,
  SignUp,
  Verification,
} from "../view/Authen";
import { SongNgu_S1, SongNgu_S2, SongNgu_S3 } from "../view/songNgu";
import { Account, Home, ListVocabulary } from "../view/TabScreen";
import { TinTuc_S1, TinTuc_S2 } from "../view/tinTuc";
import { TruyenChem_S1, TruyenChem_S2 } from "../view/truyenChem";
import { NguPhap_S1, NguPhap_S2 } from "../view/nguPhap";
import { BoTuVung_S1, BoTuVung_S2 } from "../view/boTuVung";
import { MauCauGiaoTiep_S1, MauCauGiaoTiep_S2 } from "../view/MauCauGiaoTiep";
import {
  ListVideoOfChannel,
  TopTabVideo,
  VideoSetting,
  WatchVideoChooseWord,
  WatchVideoWithCaptions,
  WatchVideoWriteWord,
} from "../view/video";
import DanhNgon from "../view/danhNgon/DanhNgon";
import {
  GhepCap,
  LuyenDoc,
  SettingTest_TracNghiem,
  SettingTest_VietCau,
  TracNghiem_Doc,
  TracNghiem_Nghe,
  VietCau_Doc,
  VietCau_Nghe,
} from "../components/Option";
import {
  DetailOfListening,
  ListListeningOfTopic,
  TopicListening,
} from "../view/baiNghe";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigationContainer = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Trang chủ",
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="home-outline" size={size} color={color} />;
          },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="ListVocabulary"
        component={ListVocabulary}
        options={{
          tabBarLabel: "Bộ từ",
          tabBarIcon: ({ color, size }) => {
            return (
              <Ionicons name="library-outline" size={size} color={color} />
            );
          },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarLabel: "Tài khoản",
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="person-outline" size={size} color={color} />;
          },
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

const AuthenNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Verification"
        component={Verification}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="RequestResetPassword"
        component={RequestResetPassword}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const TruyenChemNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TruyenChem_S1"
        component={TruyenChem_S1}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="TruyenChem_S2"
        component={TruyenChem_S2}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const TinTucNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TinTuc_S1"
        component={TinTuc_S1}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TinTuc_S2"
        component={TinTuc_S2}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const SongNguNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SongNgu_S1"
        component={SongNgu_S1}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SongNgu_S2"
        component={SongNgu_S2}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SongNgu_S3"
        component={SongNgu_S3}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const NguPhapNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="NguPhap_S1"
        component={NguPhap_S1}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NguPhap_S2"
        component={NguPhap_S2}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const BoTuVungNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BoTuVung_S1"
        component={BoTuVung_S1}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BoTuVung_S2"
        component={BoTuVung_S2}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GhepCap"
        component={GhepCap}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LuyenDoc"
        component={LuyenDoc}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TracNghiem_Doc"
        component={TracNghiem_Doc}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TracNghiem_Nghe"
        component={TracNghiem_Nghe}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VietCau_Doc"
        component={VietCau_Doc}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VietCau_Nghe"
        component={VietCau_Nghe}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SettingTest_TracNghiem"
        component={SettingTest_TracNghiem}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SettingTest_VietCau"
        component={SettingTest_VietCau}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const VideoNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TopTabVideo"
        component={TopTabVideo}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ListVideoOfChannel"
        component={ListVideoOfChannel}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VideoSetting"
        component={VideoSetting}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="WatchVideoWithCaptions"
        component={WatchVideoWithCaptions}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="WatchVideoChooseWord"
        component={WatchVideoChooseWord}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="WatchVideoWriteWord"
        component={WatchVideoWriteWord}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const ListenNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TopicListening"
        component={TopicListening}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ListListeningOfTopic"
        component={ListListeningOfTopic}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetailOfListening"
        component={DetailOfListening}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const MauCauGiaoTiepNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MauCauGiaoTiep_S1"
        component={MauCauGiaoTiep_S1}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MauCauGiaoTiep_S2"
        component={MauCauGiaoTiep_S2}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GhepCap"
        component={GhepCap}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LuyenDoc"
        component={LuyenDoc}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TracNghiem_Doc"
        component={TracNghiem_Doc}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TracNghiem_Nghe"
        component={TracNghiem_Nghe}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VietCau_Doc"
        component={VietCau_Doc}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VietCau_Nghe"
        component={VietCau_Nghe}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SettingTest_TracNghiem"
        component={SettingTest_TracNghiem}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SettingTest_VietCau"
        component={SettingTest_VietCau}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const MainNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TabNavigationContainer"
        component={TabNavigationContainer}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="SongNguNavigation"
        component={SongNguNavigation}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="TruyenChemNavigation"
        component={TruyenChemNavigation}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="TinTucNavigation"
        component={TinTucNavigation}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="NguPhapNavigation"
        component={NguPhapNavigation}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="BoTuVungNavigation"
        component={BoTuVungNavigation}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="VideoNavigation"
        component={VideoNavigation}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="DanhNgon"
        component={DanhNgon}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="MauCauGiaoTiepNavigation"
        component={MauCauGiaoTiepNavigation}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ListenNavigation"
        component={ListenNavigation}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const NavigationStack = () => {
  const { getItem } = useAsyncStorage("auth");

  const [isShowSplash, setisShowSplash] = useState(true);

  const auth = useSelector(authSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    checkLogin();

    const timeout = setTimeout(() => {
      setisShowSplash(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  const checkLogin = async () => {
    const res = await getItem();

    if (res) {
      dispatch(addAuth(JSON.parse(res)));
      console.log("res :", res);
    } else {
      // Xử lý trường hợp không tìm thấy thông tin đăng nhập
    }
  };

  return (
    <>
      {/* {isShowSplash ? (
        <SplashScreen />
      ) : auth.accesstoken ? (
        <MainNavigator />
      ) : (
        <AuthenNavigation />
      )} */}

      <MainNavigator />
    </>
  );
};

export default NavigationStack;
