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
let isStopped = false; // Flag to indicate if playback should stop

export const playVoiceText = async (text) => {
  if (isPlaying) return; // Prevent multiple simultaneous plays
  isPlaying = true; // Set as playing
  isStopped = false; // Reset stop flag

  const textChunks = splitText(text, 200); // Limit to 200 characters per chunk

  for (const chunk of textChunks) {
    if (isStopped) break; // Stop playback if the stop flag is set

    const audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=${encodeURIComponent(
      chunk
    )}&tl=en`;

    try {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        shouldDuckAndroid: false,
        staysActiveInBackground: false,
      });
      currentSound = await Audio.Sound.createAsync({ uri: audioUrl });
      
      await currentSound.sound.playAsync();

      // Wait for the sound to finish playing before proceeding
      await new Promise((resolve) => {
        currentSound.sound.setOnPlaybackStatusUpdate((status) => {
          if (status.didJustFinish) {
            currentSound.sound.unloadAsync(); // Clean up after playing
            resolve(); // Proceed to next chunk
          }
        });
      });
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  }

  isPlaying = false; // Reset playing state after all chunks are done
};

export const stopVoiceText = async () => {
  isStopped = true;
  if (currentSound) {
    await currentSound.sound.stopAsync();
    await currentSound.sound.unloadAsync();
    currentSound = null;
  }
};
