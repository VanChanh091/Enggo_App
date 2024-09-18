import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Appbar, PaperProvider } from "react-native-paper";

// random items
const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const GhepCap = ({ navigation, route }) => {
  const { dataVocab } = route.params;

  const [shuffledData, setShuffledData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [hiddenItems, setHiddenItems] = useState([]);

  //  cal total vocab en and vn in api
  const countEnVn = (data) => {
    let countEn = 0;
    let countVn = 0;

    data.forEach((item) => {
      if (item.en) countEn++;
      if (item.vn) countVn++;
    });

    return countEn + countVn;
  };
  //   console.log(countEnVn(dataVocab));

  useEffect(() => {
    // create new array contain value "en" and "vn"
    let combinedData = [];
    dataVocab.forEach((item) => {
      combinedData.push({ id: item.id, value: item.en, type: "en" });
      combinedData.push({ id: item.id, value: item.vn, type: "vn" });
    });

    // Shuffle contain random values
    const shuffled = shuffleArray(combinedData);

    // limit 12 items
    setShuffledData(shuffled.slice(0, countEnVn(dataVocab)));
    // setShuffledData(shuffled);
  }, []);

  // Hàm xử lý khi nhấn vào một mục
  //   const handleSelectItem = (item) => {
  //     if (selectedItems.includes(item)) {
  //       // Nếu item đã được chọn trước đó, bỏ chọn nó
  //       setSelectedItems(selectedItems.filter((i) => i !== item));
  //     } else {
  //       // Nếu item chưa được chọn
  //       if (selectedItems.length < 2) {
  //         setSelectedItems([...selectedItems, item]);
  //       }

  //       // Khi chọn đủ 2 đối tượng
  //       if (selectedItems.length === 1) {
  //         const [firstItem] = selectedItems;

  //         // Nếu 2 đối tượng có cùng id
  //         if (firstItem.id === item.id) {
  //           //   Alert.alert("Kết quả", "Hai mục có cùng id, sẽ bị ẩn!");

  //           // Ẩn các mục có cùng id và cập nhật trạng thái
  //           setHiddenItems([...hiddenItems, firstItem, item]);
  //         } else {
  //           //   Alert.alert(
  //           //     "Kết quả",
  //           //     "Hai mục không có cùng id, sẽ bỏ chọn tất cả!"
  //           //   );

  //           // Đặt màu đỏ và reset danh sách chọn
  //           setTimeout(() => {
  //             setSelectedItems([]);
  //           }, 500);
  //         }
  //       }
  //     }
  //   };
  const handleSelectItem = (item) => {
    if (selectedItems.includes(item)) {
      // Nếu item đã được chọn trước đó, bỏ chọn nó
      setSelectedItems(selectedItems.filter((i) => i !== item));
    } else {
      // Nếu item chưa được chọn
      if (selectedItems.length < 2) {
        setSelectedItems([...selectedItems, item]);
      }

      // Khi chọn đủ 2 đối tượng
      if (selectedItems.length === 1) {
        const [firstItem] = selectedItems;

        // Nếu 2 đối tượng có cùng id
        if (firstItem.id === item.id) {
          // Ẩn các mục có cùng id và cập nhật trạng thái
          setHiddenItems([...hiddenItems, firstItem.id]);
        } else {
          // Đặt màu đỏ và reset danh sách chọn
          setTimeout(() => {
            setSelectedItems([]);
          }, 500);
        }
      }
    }
  };

  // Hàm kiểm tra xem item có được chọn hay không
  const isSelected = (item) => selectedItems.includes(item);

  // Hàm kiểm tra xem item có bị ẩn hay không
  const isHidden = (item) => hiddenItems.includes(item);

  // Sau khi ẩn hết, bỏ ẩn tất cả
  useEffect(() => {
    if (hiddenItems.length === shuffledData.length) {
      setTimeout(() => {
        // Alert.alert("Thông báo", "Tất cả đã bị ẩn, sẽ hiển thị lại tất cả!");
        setHiddenItems([]); // Bỏ ẩn tất cả
      }, 500);
    }
  }, [hiddenItems, shuffledData]);

  const renderVocabulary = ({ item }) => {
    // if (isHidden(item)) return null; // Ẩn mục nếu nó đã được chọn và có cùng id
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity
          style={{
            width: 125,
            height: 200,
            borderRadius: 12,
            marginHorizontal: 5,
            marginTop: 12,
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "gray",
          }}
          //   disabled={isHidden(item)} // Không cho phép nhấn vào mục đã bị ẩn
          //   onPress={() => handleSelectItem(item)}
        >
          {item.type == "en" ? (
            <Text style={{ fontSize: 16, color: "#2A7BD3", fontWeight: 500 }}>
              {item.value}
            </Text>
          ) : (
            <Text style={{ fontSize: 16 }}>{item.value}</Text>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <PaperProvider>
      <Appbar.Header style={{ backgroundColor: "#2A7BD3" }}>
        <View>
          <Appbar.BackAction
            color="white"
            onPress={() => navigation.goBack()}
          />
        </View>
        <View>
          <Appbar.BackAction
            color="white"
            onPress={() => navigation.goBack()}
          />
        </View>
      </Appbar.Header>

      <View style={{ flex: 1 }}>
        <FlatList
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderVocabulary}
          data={shuffledData}
          numColumns={3}
        />
      </View>
    </PaperProvider>
  );
};

export default GhepCap;
