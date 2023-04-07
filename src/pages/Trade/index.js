import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Trade() {
  return (
    <View style={styles.container}>
      <Text>Trade Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
});
