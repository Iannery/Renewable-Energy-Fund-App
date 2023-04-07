import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "../pages/Login";
import Signup from "../pages/Signup";

const Stack = createStackNavigator();

export default function LoginRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        title: "",
        headerStyle: {
          backgroundColor: "#FFFFFF",
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: "#F4F4F4",
        },
      }}
    >
      <Stack.Screen name="Login Page" component={Login} />
      {/* <Stack.Screen name="Signup Page" component={Signup} /> */}
    </Stack.Navigator>
  );
}
