import React from "react";
import { View, Text } from "react-native";
import Translate from "./Translate";

const Abc = ({ route }) => {
  const { data } = route.params;

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {data.content.map((item, index) => (
        <View
          key={index}
          style={{
            width: "100%",
            borderBottomWidth: 1,
            marginVertical: 10,
            padding: 10,
          }}
        >
          {/* Hiển thị văn bản gốc tiếng Anh */}
          <Text style={{ fontSize: 16 }}>{item.text}</Text>

          <Translate text={item.text} />
        </View>
      ))}
    </View>
  );
};

export default Abc;
