import React, { useContext, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Searchbar } from "react-native-paper";
import { useTranslate } from "../../../components/translate/TranslateLanguage";
import ActionSheet from "react-native-actions-sheet";
import { playVoiceText } from "../../../components/translate/PLayTranslateVoice";
import { favoriteContext } from "../../../context/favoriteContext";

const DictionarySearch = () => {
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedWord, setSelectedWord] = useState(null);

  const actionSheetRef = useRef(null); // Reference to ActionSheet

  const { translateEnToVn } = useTranslate();
  const { favorites, setFavorites } = useContext(favoriteContext);

  const toggleFavorite = (word) => {
    if (favorites.some((fav) => fav._id === word._id)) {
      // Nếu từ đã tồn tại, loại bỏ từ đó
      setFavorites(favorites.filter((fav) => fav._id !== word._id));
    } else {
      // Nếu từ chưa tồn tại, thêm vào favorites
      setFavorites([...favorites, word]);
    }
  };

  const fetchSuggestions = async (text) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${text}`
      );
      const data = await response.json();
      setLoading(false);

      if (Array.isArray(data)) {
        const formattedData = data.flatMap((item) =>
          item.meanings.map((meaning) => ({
            word: item.word,
            phonetic: item.phonetic,
            meaning:
              translateEnToVn(meaning.definitions[0]?.definition) || "N/A",
            partOfSpeech: meaning.partOfSpeech || "N/A",
            synonyms: meaning.synonyms || [], // Lấy synonyms từ nghĩa
            antonyms: meaning.antonyms || [],
            wordVn: translateEnToVn(capitalizeFirstLetter(item.word)), // Gọi hàm dịch
          }))
        );
        console.log(formattedData);

        setSuggestions(formattedData);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setLoading(false);
      setSuggestions([]);
    }
  };

  const handleSearch = (text) => {
    setSearchText(text);
    if (text.trim() === "") {
      setSuggestions([]);
    } else {
      fetchSuggestions(text);
    }
  };

  const handleSuggestionPress = (item) => {
    setSelectedWord(item); // Save the selected word details
    actionSheetRef.current?.show(); // Open the ActionSheet
  };

  const capitalizeFirstLetter = (str) => {
    if (typeof str !== "string" || str.length === 0) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const renderSuggestion = ({ item }) => (
    <TouchableOpacity
      style={styles.suggestionItem}
      onPress={() => handleSuggestionPress(item)}
    >
      <View>
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>
          {capitalizeFirstLetter(item.word)}{" "}
          <Text style={{ fontWeight: "regular" }}>-</Text>{" "}
          <Text style={{ fontWeight: "regular", fontSize: 16 }}>
            <Text style={{ fontStyle: "italic" }}>{item.phonetic}</Text> (
            {item.partOfSpeech}
            ): {item.wordVn}
          </Text>
        </Text>
        <Text style={{ fontSize: 14, paddingTop: 5 }}>{item.meaning}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Nhập từ cần tìm"
          value={searchText}
          onChangeText={handleSearch}
          style={styles.searchBar}
        />
        {loading && <ActivityIndicator size="small" color="#0000ff" />}

        {/* show list of suggested word */}
        {suggestions.length > 0 && (
          <View style={styles.suggestionListContainer}>
            <FlatList
              data={suggestions}
              keyExtractor={(item, index) => `${item.word}-${index}`}
              renderItem={renderSuggestion}
              nestedScrollEnabled={true}
              style={styles.suggestionList}
            />
          </View>
        )}
      </View>

      {/* ActionSheet for word details */}
      <ActionSheet ref={actionSheetRef}>
        <View style={styles.actionSheetContent}>
          {/* Header */}
          <View style={styles.headerContainer}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.wordTitle}>
                {capitalizeFirstLetter(selectedWord?.word)}
              </Text>
              <TouchableOpacity
                style={styles.audioButton}
                onPress={() => playVoiceText(selectedWord?.word, "en")}
              >
                <Text>🔊</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => actionSheetRef.current?.hide()}>
              <Text style={styles.closeButton}>Đóng</Text>
            </TouchableOpacity>
          </View>

          {/* Synonyms */}
          <View style={styles.synonymsContainer}>
            {selectedWord?.synonyms?.length > 0 ? (
              <ScrollView style={styles.scrollView}>
                <Text style={styles.sectionTitle}>Synonyms</Text>
                <View style={styles.listContainer}>
                  {selectedWord.synonyms.map((synonym, index) => (
                    <View
                      key={index}
                      style={{ flexDirection: "row", paddingVertical: 3 }}
                    >
                      <View style={{ flex: 8.5 }}>
                        <Text style={styles.listItem}>
                          {index + 1}. {capitalizeFirstLetter(synonym)} -{" "}
                          {translateEnToVn(capitalizeFirstLetter(synonym))}
                        </Text>
                      </View>
                      <View style={{ flex: 1.5 }}>
                        <TouchableOpacity
                          onPress={() =>
                            toggleFavorite({
                              _id: `${selectedWord.word}-${synonym}`,
                              en: capitalizeFirstLetter(synonym),
                              vn: translateEnToVn(
                                capitalizeFirstLetter(synonym)
                              ),
                            })
                          }
                        >
                          <Text style={{ fontSize: 22 }}>
                            {favorites.some(
                              (fav) =>
                                fav._id === `${selectedWord.word}-${synonym}`
                            )
                              ? "❤️"
                              : "🤍"}
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View></View>
                    </View>
                  ))}
                </View>
              </ScrollView>
            ) : (
              <Text style={styles.noData}>No synonyms available</Text>
            )}
          </View>

          {/* Antonyms */}
          <Text style={styles.sectionTitle}>Antonyms</Text>
          {selectedWord?.antonyms?.length > 0 ? (
            <View style={styles.listContainer}>
              {selectedWord.antonyms.map((antonym, index) => (
                <Text key={index} style={styles.listItem}>
                  {index + 1}. {capitalizeFirstLetter(antonym)} -{" "}
                  {translateEnToVn(capitalizeFirstLetter(antonym))}
                </Text>
              ))}
            </View>
          ) : (
            <Text style={styles.noData}>No antonyms available</Text>
          )}
        </View>
      </ActionSheet>
    </KeyboardAvoidingView>
  );
};

export default DictionarySearch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchContainer: {
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  searchBar: {
    backgroundColor: "#E9E3E3",
    borderWidth: 1,
    borderColor: "gray",
  },
  suggestionListContainer: {
    position: "absolute", // Hiển thị chồng lên các thành phần khác
    // flex: 1,
    width: "95%",
    backgroundColor: "#fff",
    zIndex: 10, // Đảm bảo hiển thị trên các thành phần khác
    borderRadius: 12,
    maxHeight: 300,
    borderWidth: 1,
    borderColor: "#d0d0d0",
    justifyContent: "center",
    marginTop: 80,
    marginLeft: 20,
  },
  suggestionList: {
    paddingHorizontal: 10,
  },
  suggestionItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  actionSheetContent: {
    padding: 20,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  wordTitle: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 4,
  },
  closeButton: {
    fontSize: 18,
    fontWeight: "600",
    color: "#007AFF",
  },
  phoneticContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  phoneticItem: {
    alignItems: "center",
  },
  phoneticText: {
    fontSize: 18,
    color: "#555",
  },
  audioButton: {
    borderRadius: 50,
    backgroundColor: "#f0f0f0",
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
  },
  wordMeaning: {
    fontSize: 16,
    color: "#333",
    textAlign: "left",
    marginVertical: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 20,
    color: "gray",
  },
  meaningItem: {
    fontSize: 16,
    color: "#555",
    paddingVertical: 5,
  },
  actionSheetFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  footerButton: {
    fontSize: 16,
    fontWeight: "600",
    color: "#007AFF",
  },
  listItem: {
    fontSize: 16,
    color: "#555",
    paddingVertical: 5,
  },
  noData: {
    fontSize: 16,
    color: "#888",
    fontStyle: "italic",
  },
  synonymsContainer: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  scrollView: {
    maxHeight: 180,
    paddingRight: 10,
  },
  listContainer: {
    paddingLeft: 10,
  },
});
