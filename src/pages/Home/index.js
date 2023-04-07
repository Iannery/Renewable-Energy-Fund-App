import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import Header from "../../components/Header";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Feather } from "@expo/vector-icons";

import { useAtom } from "jotai";
import { userAtom } from "../Login";
import { Nature, Sun, Wind } from "../../assets/svg";
import FundCard from "../../components/FundCard";

export default function Home() {
  // const [user] = useAtom(userAtom);
  const user = {
    email: "ian@ian.com",
    firstName: "Ian",
    lastName: "Bandeira",
    balance: 1457.23,
    portfolio: [
      {
        symbol: "Wind",
        name: "Wind Fund",
        icon: () => <Feather name="wind" size={14} color="#4A88D0" />,
        graph: () => <Wind />,
        shares: 10,
        price: 120.0,
        percentageChange: 3.51,
      },
      {
        symbol: "Solar",
        name: "Solar Fund",
        icon: () => <Feather name="sun" size={14} color="#F0A719" />,
        graph: () => <Sun />,
        shares: 20,
        price: 200.0,
        percentageChange: -2.51,
      },
      {
        symbol: "Nature",
        name: "Nature Fund",
        icon: () => (
          <Ionicons name="ios-leaf-outline" size={14} color="#0FDF8F" />
        ),
        graph: () => <Nature />,
        shares: 5,
        price: 500.0,
        percentageChange: 1.51,
      },
    ],
  };

  return (
    <>
      <Header user={user} />
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Funds</Text>
        <FlatList
          style={styles.fundsList}
          horizontal
          data={user.portfolio}
          keyExtractor={(item) => item.symbol}
          ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
          renderItem={({ item }) => <FundCard key={item.symbol} fund={item} />}
        />
        <TouchableOpacity style={styles.learnMoreButton}>
          <Ionicons
            name="information-circle-outline"
            size={48}
            color="white"
            style={styles.learnMoreIcon}
          />
          <View style={styles.learnMoreTextContainer}>
            <Text style={styles.learnMoreText}>
              Learn more about{"\n"}carbon credits
            </Text>
            <Text style={styles.learnMoreSubText}>Check out our top tips!</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <Text style={styles.cardText}>Why should you invest here?</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardText}>Reasons to trust our funds</Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  fundsList: {
    marginBottom: 16,
  },
  fundItem: {
    backgroundColor: "#F4F4F4",
    borderRadius: 4,
    padding: 8,
    marginRight: 16,
  },
  fundItemText: {
    fontSize: 14,
    fontWeight: "500",
  },
  learnMoreButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4CAF50",
    borderRadius: 4,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  learnMoreIcon: {
    height: 87,
    marginRight: 16,
  },
  learnMoreTextContainer: {
    flex: 1,
  },
  learnMoreText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  learnMoreSubText: {
    fontSize: 14,
    color: "white",
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    flex: 1,
    backgroundColor: "#F4F4F4",
    borderRadius: 4,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 4,
  },
  cardText: {
    fontSize: 14,
    fontWeight: "500",
  },
});
