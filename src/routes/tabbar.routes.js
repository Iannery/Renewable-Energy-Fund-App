import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Home from "../pages/Home";
import Trade from "../pages/Trade";
import Portfolio from "../pages/Portfolio";

const Tab = createBottomTabNavigator();

const CustomHeader = ({ name, symbol }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backIcon}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.symbol}>{symbol}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  backIcon: {
    padding: 10,
    position: "absolute",
    left: 0,
    zIndex: 10,
  },

  textContainer: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontFamily: "Sora_600SemiBold",
  },
  symbol: {
    fontSize: 14,
    fontFamily: "Sora_400Regular",
  },
});

const renderTabBarIcon = (routeName, focused, color, size) => {
  let iconName;

  if (routeName === "Home") {
    iconName = focused ? "home" : "home-outline";
  } else if (routeName === "Trade") {
    iconName = focused ? "swap-horizontal" : "swap-horizontal-outline";
  } else if (routeName === "Portfolio") {
    iconName = focused ? "pie-chart" : "pie-chart-outline";
  }

  return <Ionicons name={iconName} size={size} color={color} />;
};

const TabBarRoutes = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 10,
          fontFamily: "Sora_700Bold",
          marginTop: 0,
          paddingTop: 0,
        },
        tabBarActiveTintColor: "#770FDF",
        tabBarInactiveTintColor: "#000000",
        tabBarIcon: ({ focused, color, size }) =>
          renderTabBarIcon(route.name, focused, color, size),
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen
        name="Trade"
        component={Trade}
        options={({ route, navigation }) => ({
          headerShown: true,
          headerTitle: () => (
            <CustomHeader
              name={route.params ? route.params.name : "Wind Fund"}
              symbol={route.params ? route.params.symbol : "WFND"}
            />
          ),
          headerTitleContainerStyle: {
            width: "100%",
          },
        })}
      />
      <Tab.Screen name="Portfolio" component={Portfolio} />
    </Tab.Navigator>
  );
};

export default TabBarRoutes;
