import React, { useContext, useEffect, useRef, useState } from "react";
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
import { theme } from "../../../context/theme";
import { SegmentedButtons } from "react-native-paper";
import { debounce } from "lodash";

const DictionarySearch = () => {
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedWord, setSelectedWord] = useState(null);
  const [selectedSegment, setSelectedSegment] = useState("synonyms");

  const actionSheetRef = useRef(null); // Reference to ActionSheet

  const { translateEnToVn } = useTranslate();
  const { favorites, setFavorites } = useContext(favoriteContext);

  useEffect(() => {
    return () => {
      debouncedFetchSuggestions.cancel();
    };
  }, []);

  const debouncedFetchSuggestions = useRef(
    debounce(async (text, fetchFunction) => {
      if (text.trim()) {
        await fetchFunction(text);
      }
    }, 150)
  ).current;

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
          item.meanings.map((meaning) => {
            // Lấy tất cả các định nghĩa và ví dụ từ `definitions`
            const allDefinitions = meaning.definitions.map(
              (def) => def.definition
            );
            const allExamples = meaning.definitions
              .map((def) => def.example)
              .filter((ex) => ex); // Lọc bỏ những `example` bị undefined

            return {
              word: item.word,
              phonetic: item.phonetic || "N/A",
              meaning:
                translateEnToVn(meaning.definitions[0]?.definition) || "N/A",
              partOfSpeech: meaning.partOfSpeech || "N/A",
              synonyms: meaning.synonyms || [],
              antonyms: meaning.antonyms || [],
              wordVn: translateEnToVn(capitalizeFirstLetter(item.word)),
              example: meaning.definitions[0]?.example || "N/A",
              allMeaning: allDefinitions,
              allExample: allExamples,
            };
          })
        );

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
      debouncedFetchSuggestions(text, fetchSuggestions);
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
              <View>
                <Text style={styles.wordTitle}>
                  {capitalizeFirstLetter(selectedWord?.word)} -{" "}
                  {translateEnToVn(capitalizeFirstLetter(selectedWord?.word))}
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    color: "gray",
                    paddingHorizontal: 5,
                    paddingVertical: 4,
                  }}
                >
                  {capitalizeFirstLetter(selectedWord?.phonetic)} -{" "}
                  {capitalizeFirstLetter(selectedWord?.partOfSpeech)}
                </Text>
              </View>
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

          {/* Segmented Buttons */}
          <SegmentedButtons
            value={selectedSegment}
            onValueChange={setSelectedSegment}
            buttons={[
              { value: "synonyms", label: "Synonyms & Antonyms" },
              { value: "definition", label: "Definition" },
            ]}
            style={styles.segmentedButtons}
          />

          {/* Render Synonyms & Antonyms */}
          {selectedSegment === "synonyms" ? (
            <View style={{ flex: 1 }}>
              {/* Synonyms */}
              <View style={styles.synonymsContainer}>
                <Text style={styles.sectionTitle}>Synonyms</Text>
                {selectedWord?.synonyms?.length > 0 ? (
                  <ScrollView style={styles.scrollView}>
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
                                    fav._id ===
                                    `${selectedWord.word}-${synonym}`
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

              {/* Antonyms Section */}
              <View style={styles.antonymsContainer}>
                <Text style={styles.sectionTitle}>Antonyms</Text>
                {selectedWord?.antonyms?.length > 0 ? (
                  <ScrollView style={styles.scrollView}>
                    <View style={styles.listContainer}>
                      {selectedWord.antonyms.map((antonyms, index) => (
                        <View
                          key={index}
                          style={{ flexDirection: "row", paddingVertical: 3 }}
                        >
                          <View style={{ flex: 8.5 }}>
                            <Text style={styles.listItem}>
                              {index + 1}. {capitalizeFirstLetter(antonyms)} -{" "}
                              {translateEnToVn(capitalizeFirstLetter(antonyms))}
                            </Text>
                          </View>
                          <View style={{ flex: 1.5 }}>
                            <TouchableOpacity
                              onPress={() =>
                                toggleFavorite({
                                  _id: `${selectedWord.word}-${antonyms}`,
                                  en: capitalizeFirstLetter(antonyms),
                                  vn: translateEnToVn(
                                    capitalizeFirstLetter(antonyms)
                                  ),
                                })
                              }
                            >
                              <Text style={{ fontSize: 22 }}>
                                {favorites.some(
                                  (fav) =>
                                    fav._id ===
                                    `${selectedWord.word}-${antonyms}`
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
            </View>
          ) : (
            <View style={{ flex: 1 }}>
              <View
                style={{
                  flex: 1,
                  borderBottomWidth: 1,
                  borderColor: "#d0d0d0",
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 18,
                    paddingVertical: 3,
                  }}
                >
                  Definition
                </Text>
                <ScrollView>
                  {selectedWord?.allMeaning?.length > 0 ? (
                    selectedWord.allMeaning
                      .slice(0, 10)
                      .map((meaning, mIdx) => (
                        <View
                          key={mIdx}
                          style={{
                            paddingVertical: 3,
                            marginLeft: 10,
                          }}
                        >
                          <Text key={mIdx} style={styles.listItem}>
                            {mIdx + 1}. {meaning}
                          </Text>
                          <Text style={styles.listItem}>
                            - {translateEnToVn(meaning)}
                          </Text>
                        </View>
                      ))
                  ) : (
                    <Text>No meanings available</Text>
                  )}
                </ScrollView>
              </View>

              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 18,
                    paddingVertical: 10,
                  }}
                >
                  Examples
                </Text>
                <ScrollView>
                  {selectedWord?.allExample?.length > 0 ? (
                    selectedWord.allExample
                      .slice(0, 10)
                      .map((example, mIdx) => (
                        <View
                          key={mIdx}
                          style={{
                            paddingVertical: 3,
                            marginLeft: 10,
                          }}
                        >
                          <Text key={mIdx} style={styles.listItem}>
                            {mIdx + 1}. {example}
                          </Text>
                          <Text style={styles.listItem}>
                            - {translateEnToVn(example)}
                          </Text>
                        </View>
                      ))
                  ) : (
                    <Text>No meanings available</Text>
                  )}
                  <View style={{ marginVertical: 10 }} />
                </ScrollView>
              </View>
            </View>
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
    backgroundColor: theme.backgroundColor,
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
    backgroundColor: theme.backgroundColor,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 700,
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
    fontSize: 20,
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
    paddingVertical: 10,
  },
  synonymsContainer: {
    marginVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#d0d0d0",
  },
  antonymsContainer: {
    marginVertical: 10,
    borderColor: "#d0d0d0",
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
  segmentedButtons: {
    marginVertical: 10,
  },
});
