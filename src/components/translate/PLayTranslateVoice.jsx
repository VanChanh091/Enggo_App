import { Audio } from "expo-av";

const splitText = (text, maxLength = 200) => {
  const chunks = [];
  let currentIndex = 0;

  while (currentIndex < text.length) {
    const nextChunk = text.slice(currentIndex, currentIndex + maxLength);
    chunks.push(nextChunk);
    currentIndex += maxLength;
  }

  return chunks;
};

let currentSound = null;
let isPlaying = false;
let isStopped = false;
let currentPosition = 0;

export const playVoiceText = async (text) => {
  // Nếu âm thanh đang phát, dừng nó và lưu lại vị trí hiện tại
  // if (isPlaying) {
  //   await stopVoiceText(); // Dừng âm thanh hiện tại
  //   return; // Không phát lại nếu đang dừng
  // }

  isPlaying = true; // Đặt trạng thái là đang phát
  isStopped = false; // Đặt lại flag dừng

  if (currentSound) {
    await currentSound.sound.unloadAsync(); // Giải phóng âm thanh hiện tại nếu có
    currentSound = null; // Đặt lại đối tượng âm thanh
  }

  const textChunks = splitText(text, 200); // Giới hạn mỗi đoạn văn bản là 200 ký tự

  // Phát từng đoạn âm thanh, và nếu âm thanh đã dừng thì tiếp tục từ vị trí lưu
  for (const [index, chunk] of textChunks.entries()) {
    if (isStopped) {
      await stopVoiceText(); // Dừng nếu flag dừng được thiết lập
      break; // Thoát khỏi vòng lặp nếu dừng
    }

    const audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=${encodeURIComponent(
      chunk
    )}&tl=en`;

    try {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        shouldDuckAndroid: false,
        staysActiveInBackground: false,
      });

      if (currentSound && currentPosition > 0 && index === 0) {
        // Nếu âm thanh đã dừng trước đó, phát lại từ vị trí lưu
        await currentSound.sound.playFromPositionAsync(currentPosition);
      } else {
        // Nếu không có âm thanh đã dừng trước đó, tạo âm thanh mới
        currentSound = await Audio.Sound.createAsync({ uri: audioUrl });
        await currentSound.sound.playAsync();
      }

      // Chờ âm thanh phát xong trước khi tiếp tục phát đoạn tiếp theo
      await new Promise((resolve) => {
        currentSound.sound.setOnPlaybackStatusUpdate((status) => {
          if (status.didJustFinish && !isStopped) {
            currentSound.sound.unloadAsync(); // Giải phóng sau khi phát xong
            resolve(); // Chuyển tiếp tới đoạn tiếp theo
          }
        });
      });
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  }

  isPlaying = false; // Đặt lại trạng thái phát khi hoàn tất
};

export const stopVoiceText = async () => {
  isStopped = true;
  if (currentSound) {
    try {
      // Kiểm tra xem âm thanh hiện tại có đang phát hay không
      const status = await currentSound.sound.getStatusAsync();
      if (status.isPlaying || status.positionMillis > 0) {
        await currentSound.sound.stopAsync();
      }

      // Giải phóng tài nguyên âm thanh
      await currentSound.sound.unloadAsync();
      currentSound = null;
    } catch (error) {
      console.error("Error stopping the sound:", error);
    }
  }
  isPlaying = false;
};
