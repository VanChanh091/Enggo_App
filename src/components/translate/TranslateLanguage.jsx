import { useState } from "react";

export const useTranslate = () => {
  const [translatedText, setTranslatedText] = useState({});
  const [languageToggles, setLanguageToggles] = useState({});

  const toggleLanguage = (id) => {
    setLanguageToggles((prev) => ({
      ...prev,
      [id]: !prev[id], // Toggle the language state for the given id
    }));
  };

  // Function to call the Google Translate API
  const translateText = async (id, text) => {
    try {
      const isEnglishToVietnamese = languageToggles[id] ?? true; // Default to true if not toggled yet
      const sourceLang = isEnglishToVietnamese ? "en" : "vi";
      const targetLang = isEnglishToVietnamese ? "vi" : "en";

      const response = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(
          text
        )}`
      );
      const result = await response.json();
      if (result && result[0]) {
        const translatedTextArray = result[0].map((item) => item[0]);
        setTranslatedText((prev) => ({
          ...prev,
          [id]: translatedTextArray.join(""),
        }));
      }
    } catch (error) {
      console.error("Error translating text:", error);
    }
  };

  const translateEnToVn = async (text) => {
    try {
      const response = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=${encodeURIComponent(
          text
        )}`
      );
      const result = await response.json();
      if (result && result[0]) {
        const translatedTextArray = result[0].map((item) => item[0]);
        return translatedTextArray.join("");
      }
      return "Không có nghĩa";
    } catch (error) {
      console.error("Error translating text:", error);
    }
  };

  // Function to handle translation with a delay
  const translateWithDelay = (id, text) => {
    setTimeout(() => {
      toggleLanguage(id);
    }, 100);
    translateText(id, text);
  };

  return {
    translatedText,
    translateWithDelay,
    translateEnToVn,
  };
};
