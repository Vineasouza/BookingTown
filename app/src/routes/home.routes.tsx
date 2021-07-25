import React from "react";
import { StatusBar } from "expo-status-bar";
import { createStackNavigator } from "@react-navigation/stack";

import { Home, Reservar, ReservaRealizada } from "../pages";

const HomeStack = createStackNavigator();

const HomeRoutes: React.FC = () => {
  return (
    <>
      <StatusBar />
      <HomeStack.Navigator>
        <HomeStack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Reservar"
          component={Reservar}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="ReservaRealizada"
          component={ReservaRealizada}
          options={{ headerShown: false }}
        />
      </HomeStack.Navigator>
    </>
  );
};

export default HomeRoutes;
