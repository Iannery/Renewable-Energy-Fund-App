import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "../pages/Login";

const Stack = createStackNavigator();

export default function LoginRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen name="Login Page" component={Login} />
      {/* <Stack.Screen name="Signup Page" component={Signup} /> */}
    </Stack.Navigator>
  );
}
