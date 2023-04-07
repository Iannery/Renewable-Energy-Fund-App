import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Header = ({ user }) => {
  const onUserIconPress = () => {
    // Display user information
    alert(
      `User Information:\n\nName: ${user.firstName} ${user.lastName}\nEmail: ${user.email}`
    );
  };

  const onNotificationIconPress = () => {
    // Handle notification icon press
    alert("Notification icon pressed");
  };

  const insets = useSafeAreaInsets();
  const formattedBalance = new Intl.NumberFormat("en-US").format(user.balance);
  const portfolioValue = user.portfolio.reduce(
    (total, stock) => total + stock.shares * stock.price,
    0
  );
  const formattedPortfolioValue = new Intl.NumberFormat("en-US").format(
    portfolioValue
  );

  // Mock percentage
  const percentage = "+2.34%";

  return (
    <View style={{ paddingTop: insets.top, backgroundColor: "#FFFFFF" }}>
      <View style={styles.container}>
        <View style={styles.topRow}>
          <TouchableOpacity onPress={onUserIconPress} style={styles.iconButton}>
            <Ionicons name="person-circle-outline" size={24} color="black" />
          </TouchableOpacity>
          <Text
            style={styles.balanceText}
          >{`Account: $${formattedBalance}`}</Text>
          <TouchableOpacity
            onPress={onNotificationIconPress}
            style={styles.iconButton}
          >
            <Ionicons name="notifications-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.bottomRow}>
          <View>
            <Text style={styles.portfolioTitle}>Portfolio</Text>
            <View style={styles.portfolioRow}>
              <Text
                style={styles.portfolioText}
              >{`$${formattedPortfolioValue}`}</Text>
              <MaterialCommunityIcons
                name="arrow-top-right"
                size={14}
                color="#0FDF8F"
              />
              <Text style={styles.percentageText}>{percentage}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.rewardsButton}>
            <Ionicons name="star-outline" size={14} color="#770FDF" />
            <Text style={styles.rewardsText}>Earn Rewards</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 24,
    backgroundColor: "#FFFFFF",
    borderBottomColor: "#E5E5E5",
    borderBottomWidth: 1,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  iconButton: {
    padding: 8,
  },
  balanceText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  portfolioRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  portfolioTitle: {
    fontSize: 14,
    fontWeight: "400",
  },
  portfolioText: {
    fontSize: 28,
    fontWeight: "500",
    marginRight: 4,
  },
  arrowIcon: {
    transform: [{ rotate: "45deg" }],
  },
  percentageText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#0FDF8F",
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  rewardsButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    paddingHorizontal: 9,
    borderRadius: 4,
    backgroundColor: "#F7EFFF",
  },
  rewardsText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#770FDF",
    marginLeft: 4,
  },
});

export default Header;
