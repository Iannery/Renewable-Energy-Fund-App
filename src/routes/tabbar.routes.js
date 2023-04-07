import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import Home from "../pages/Home";
import Trade from "../pages/Trade";
import Portfolio from "../pages/Portfolio";

const Tab = createBottomTabNavigator();

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
      <Tab.Screen name="Trade" component={Trade} />
      <Tab.Screen name="Portfolio" component={Portfolio} />
    </Tab.Navigator>
  );
};

export default TabBarRoutes;
