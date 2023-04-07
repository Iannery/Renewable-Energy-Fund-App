import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginRoutes from "./routes/login.routes";
import TabBarRoutes from "./routes/tabbar.routes";

const Stack = createStackNavigator();
const Routes = () => {
  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}
      initialRouteName="TabBar"
    >
      <Stack.Screen name="Login" component={LoginRoutes} />
      <Stack.Screen name="TabBar" component={TabBarRoutes} />
    </Stack.Navigator>
  );
};

export default Routes;
