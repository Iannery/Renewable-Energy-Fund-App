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
import { BusinessStatistics, Nature, Sun, Wind } from "../../assets/svg";
import FundCard from "../../components/FundCard";

export default function Home({ navigation }) {
  const [user] = useAtom(userAtom);
  // const user = {
  //   email: "ian@ian.com",
  //   firstName: "Ian",
  //   lastName: "Bandeira",
  //   balance: 1457.23,
  //   portfolio: [
  //     {
  //       symbol: "WFND",
  //       name: "Wind Fund",
  //       icon: () => <Feather name="wind" size={14} color="#4A88D0" />,
  //       graph: () => <Wind />,
  //       shares: 10,
  //       price: 120.5,
  //       percentageChange: 3.51,
  //     },
  //     {
  //       symbol: "SFND",
  //       name: "Solar Fund",
  //       icon: () => <Feather name="sun" size={14} color="#F0A719" />,
  //       graph: () => <Sun />,
  //       shares: 20,
  //       price: 16.0,
  //       percentageChange: -2.51,
  //     },
  //     {
  //       symbol: "NFND",
  //       name: "Nature Fund",
  //       icon: () => (
  //         <Ionicons name="ios-leaf-outline" size={14} color="#0FDF8F" />
  //       ),
  //       graph: () => <Nature />,
  //       shares: 5,
  //       price: 500.3,
  //       percentageChange: 1.51,
  //     },
  //   ],
  // };

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
          contentContainerStyle={{ gap: 16 }}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <FundCard key={item.symbol} fund={item} />}
        />
        <TouchableOpacity style={styles.learnMoreButton}>
          <View style={styles.learnMoreTextContainer}>
            <Text style={styles.learnMoreText}>
              Learn more about{"\n"}carbon credits
            </Text>
            <Text style={styles.learnMoreSubText}>Check out our top tips!</Text>
          </View>
          <BusinessStatistics />
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
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: "Sora_600SemiBold",
    marginBottom: 20,
  },
  fundsList: {
    marginBottom: 20,
  },
  learnMoreButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#770FDF",
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  learnMoreIcon: {
    height: 87,
    marginRight: 16,
  },
  learnMoreTextContainer: {
    flex: 1,
    gap: 10,
  },
  learnMoreText: {
    fontSize: 18,
    fontFamily: "Sora_600SemiBold",
    color: "white",
  },
  learnMoreSubText: {
    fontSize: 14,
    color: "white",
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    height: 350,
    gap: 16,
  },
  card: {
    flex: 1,
    backgroundColor: "#F4F4F4",
    borderRadius: 4,
    paddingTop: 20,
    paddingHorizontal: 12,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  cardText: {
    fontSize: 14,
    fontFamily: "Sora_500Medium",
  },
});
