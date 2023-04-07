import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Header from "../../components/Header";
import { useAtom } from "jotai";
import { userAtom } from "../Login";

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
        shares: 10,
        price: 120.0,
      },
      {
        symbol: "Solar",
        shares: 20,
        price: 200.0,
      },
      {
        symbol: "Nature",
        shares: 5,
        price: 500.0,
      },
    ],
  };

  return (
    <>
      <Header user={user} />
      <View style={styles.container}>
        <Text>Home Screen</Text>
      </View>
    </>
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
