import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import Slider from "@react-native-community/slider";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as Speech from "expo-speech";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";

const PlayVoice = (text) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(0.75);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0); // Thời gian đã phát
  const [isLooping, setIsLooping] = useState(false);

  const intervalRef = useRef(null); // Ref để giữ bộ đếm

  // const [text] = useState(text.text);

  const textLength = text.text.length;

  const getText = text.text; //get all text from allText

  useEffect(() => {
    const duration = calculateDuration(getText);
    setTotalDuration(duration);
  }, [getText, playbackRate]);

  useEffect(() => {
    if (isSpeaking) {
      intervalRef.current = setInterval(() => {
        setElapsedTime((prevTime) => {
          const newTime = prevTime + 1;
          if (newTime >= totalDuration) {
            clearInterval(intervalRef.current);
            return totalDuration;
          }
          return newTime;
        });
      }, 1000); // Cập nhật mỗi giây
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isSpeaking, totalDuration]);

  useEffect(() => {
    if (isLooping && !isSpeaking) {
      startSpeech(0, getText); // Phát lại từ đầu
    }
  }, [isLooping, isSpeaking]);

  useEffect(() => {
    // Dọn dẹp khi component unmount để đảm bảo không có setInterval bị rò rỉ
    return () => stopTrackingProgress();
  }, []);

  // Tốc độ ký tự trên giây
  const charsPerSecond = (180 / 60) * playbackRate;

  const calculateDuration = (text) => {
    const validText = typeof text === "string" ? text : "";
    const words = validText.split(" ").length;
    const wordsPerSecond =
      playbackRate === 0.75
        ? 180 / 60
        : playbackRate === 1.0
        ? 220 / 60
        : (180 / 60) * 2;
    const totalSeconds = words / wordsPerSecond;
    return totalSeconds;
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const startTrackingProgress = () => {
    if (intervalRef.current) return; // Nếu đồng hồ đã chạy, không chạy lại
    intervalRef.current = setInterval(() => {
      setElapsedTime((prev) => {
        if (prev + 1 >= totalDuration) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          return totalDuration;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const stopTrackingProgress = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startSpeech = async (position, text) => {
    // Đặt lại vị trí hiện tại nếu cần
    setCurrentPosition(position);

    const validText = typeof text === "string" ? text : "";
    await Speech.speak(validText.slice(position), {
      // Phát từ vị trí chỉ định
      language: "en-US",
      rate: playbackRate,
      onDone: () => {
        stopTrackingProgress(); // Dừng bộ đếm khi phát xong
        setElapsedTime(totalDuration);
        if (isLooping) {
          startSpeech(0, getText); // Nếu đang lặp, phát lại từ đầu
        }
        setIsSpeaking(false); // Đặt trạng thái không đang phát
      },
      onStart: () => {
        setElapsedTime(position); // Đặt thời gian đã phát ngay từ đầu
        startTrackingProgress(); // Bắt đầu theo dõi tiến độ
      },
    });
    setIsSpeaking(true); // Đặt trạng thái là đang phát
  };

  const speakText = () => {
    if (isPaused) {
      Speech.resume();
      setIsPaused(false);
    } else {
      // Nếu đã phát, dừng phát hiện tại
      if (isSpeaking) {
        stopSpeech();
      }
      // Bắt đầu phát từ vị trí hiện tại
      startSpeech(currentPosition, getText);
    }
    setIsSpeaking(!isSpeaking);
  };

  const stopSpeech = async () => {
    await Speech.stop();
    setIsSpeaking(false);
    setIsPaused(false);
    clearInterval(intervalRef.current);
    setElapsedTime(0);
    setCurrentPosition(0);
    setIsLooping(false); // Đặt lặp về false khi dừng
  };

  const pauseSpeech = async () => {
    if (isSpeaking) {
      await Speech.pause();
      setIsPaused(true);
      clearInterval(intervalRef.current);
      stopTrackingProgress();
    }
    setIsSpeaking(false);
  };

  // Change playback speed
  const handleChangeSpeed = () => {
    let newRate;
    if (playbackRate === 1.0) {
      newRate = 1.25;
    } else if (playbackRate === 1.25) {
      newRate = 0.75;
    } else {
      newRate = 1.0; // Trở về bình thường
    }
    setPlaybackRate(newRate);
  };

  const handleForward = async () => {
    const newPosition = Math.min(
      currentPosition + 5 * charsPerSecond,
      textLength
    );
    setCurrentPosition(newPosition);
    setElapsedTime(Math.min(elapsedTime + 5, totalDuration)); // Cập nhật thời gian hiển thị
    if (isSpeaking) {
      await stopSpeech();
      startSpeech(newPosition, getText); // Phát lại từ vị trí mới
    }
  };

  const handleBackward = async () => {
    const newPosition = Math.max(currentPosition - 5 * charsPerSecond, 0);
    setCurrentPosition(newPosition);
    setElapsedTime(Math.max(elapsedTime - 5, 0)); // Cập nhật thời gian hiển thị
    if (isSpeaking) {
      await stopSpeech();
      startSpeech(newPosition, getText); // Phát lại từ vị trí mới
    }
  };

  // Lặp lại từ đầu
  const handleRepeat = () => {
    stopSpeech();
    setCurrentPosition(0); // Đặt lại vị trí về đầu
    setElapsedTime(0); // Reset lại thời gian đã phát
    speakText(); // Phát lại từ đầu
  };

  const toggleLoop = () => {
    setIsLooping((prev) => !prev);
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 1.7,
          borderTopWidth: 1,
          borderColor: "#d0d0d0",
        }}
      >
        {/* play duration*/}
        <View style={{ flex: 0.7, flexDirection: "row" }}>
          <View
            style={{
              flex: 1.5,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 15, color: "#666" }}>
              {formatTime(elapsedTime)}
            </Text>
          </View>
          <View style={{ flex: 7 }}>
            <Slider
              style={{ flex: 1 }}
              minimumValue={0}
              maximumValue={totalDuration}
              value={elapsedTime}
              disabled={true}
              onValueChange={(value) => {
                setElapsedTime(value);
                setCurrentPosition(value);
              }}
              onSlidingComplete={(value) => {
                stopSpeech(); // Dừng giọng nói hiện tại
                startSpeech(value, getText); // Phát lại từ vị trí mới
              }}
              minimumTrackTintColor="#1E90FF"
              maximumTrackTintColor="#d3d3d3"
              thumbTintColor="#1E90FF"
            />
          </View>
          <View
            style={{
              flex: 1.5,

              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 15, color: "#666" }}>
              {formatTime(totalDuration)}
            </Text>
          </View>
        </View>

        {/* Playback controls */}
        <View
          style={{
            width: "100%",
            height: 50,
            flexDirection: "row",
          }}
        >
          {/* speed */}
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={handleChangeSpeed}>
              <Text
                style={{ fontWeight: "bold", fontSize: 18, color: "#1E90FF" }}
              >
                {playbackRate.toFixed(2)}x
              </Text>
            </TouchableOpacity>
          </View>

          {/* stop */}
          {/* <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity>
              <Entypo name="controller-stop" size={35} color="#1E90FF" />
            </TouchableOpacity>
          </View> */}

          {/* play/pause */}
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={isSpeaking ? pauseSpeech : speakText}>
              <Icon
                name={isSpeaking ? "pause" : "play-arrow"}
                size={50}
                color="#1E90FF"
              />
            </TouchableOpacity>
          </View>

          {/* restart */}
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={handleRepeat}>
              <MaterialCommunityIcons
                name="restart"
                size={35}
                color="#1E90FF"
              />
            </TouchableOpacity>
          </View>

          {/* repeat */}
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={toggleLoop}>
              {isLooping ? (
                <MaterialCommunityIcons
                  name="repeat"
                  size={35}
                  color="#1E90FF"
                />
              ) : (
                <MaterialCommunityIcons
                  name="repeat-off"
                  size={35}
                  color="#1E90FF"
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PlayVoice;

const styles = StyleSheet.create({});
