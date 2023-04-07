import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Portfolio() {
  return (
    <View style={styles.container}>
      <Text>Portfolio Screen</Text>
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
