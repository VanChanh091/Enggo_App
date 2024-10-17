import { Audio } from "expo-av";

// Helper function to split the text into smaller chunks
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

// Global variable to manage the current audio sound
let currentSound = null;
let isPlaying = false;

// Function to play voice for long text by splitting it into chunks
export const playVoiceText = async (text) => {
  if (isPlaying) return; // Prevent multiple simultaneous plays
  isPlaying = true; // Set as playing

  const textChunks = splitText(text, 200); // Limit to 200 characters per chunk

  for (const chunk of textChunks) {
    const audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=${encodeURIComponent(
      chunk
    )}&tl=en`;

    try {
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
