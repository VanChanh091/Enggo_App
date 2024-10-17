import { Audio } from "expo-av";

export const playWordPronunciation = async (word) => {
  const audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=${encodeURIComponent(
    word
  )}&tl=en`;
  try {
    const { sound } = await Audio.Sound.createAsync({ uri: audioUrl });
    await sound.playAsync();
  } catch (error) {
    console.error("Error playing sound:", error);
  }
};
