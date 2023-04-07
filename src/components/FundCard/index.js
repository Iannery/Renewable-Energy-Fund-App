import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const FundCard = ({ fund }) => {
  const { icon, name, graph, shares, price, percentageChange } = fund;

  const calculateTotal = (shares, price) => {
    return (shares * price).toFixed(2);
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <View style={styles.iconContainer}>{icon()}</View>
      </View>
      <Text style={styles.name}>{name}</Text>
      {graph()}
      <View style={styles.row}>
        <Text style={styles.total}>{calculateTotal(shares, price)}</Text>
        <Text style={styles.percentageChange}>{percentageChange}%</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 130,
    height: 150,
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
    borderColor: "#E5E5E5",
    borderWidth: 1,
    padding: 12,
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  iconContainer: {
    backgroundColor: "#FFFFFF",
  },
  name: {
    fontSize: 14,
    fontWeight: "600",
    marginVertical: 8,
  },
  graph: {
    width: "100%",
    height: 50,
    resizeMode: "contain",
  },
  total: {
    fontSize: 18,
    fontWeight: "bold",
  },
  percentageChange: {
    fontSize: 14,
    color: "green",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
});

export default FundCard;
