import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const FundCard = ({ fund, navigation }) => {
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
        <Text style={styles.total}>{`$${calculateTotal(shares, price)}`}</Text>
        <View flexDirection={"row"} alignItems={"center"}>
          <MaterialCommunityIcons
            name={
              percentageChange > 0 ? "arrow-top-right" : "arrow-bottom-right"
            }
            size={16}
            color={percentageChange > 0 ? "#0FDF8F" : "#EE8688"}
          />

          <Text style={styles.percentageChange(percentageChange > 0)}>
            {percentageChange}%
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 150,
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
    fontFamily: "Sora_600SemiBold",
    marginVertical: 8,
  },
  graph: {
    width: "100%",
    height: 50,
    resizeMode: "contain",
  },
  total: {
    fontSize: 16,
    fontFamily: "Sora_400Regular",
  },
  percentageChange: (isPositive) => ({
    fontSize: 16,
    color: isPositive ? "#0FDF8F" : "#EE8688",
  }),
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
});

export default FundCard;
