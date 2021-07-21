import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Home } from "../pages";

// https://reactnavigation.org/docs/bottom-tab-navigator
const TabStack = createBottomTabNavigator();

const AppRoutes: React.FC = () => {
  return (
    <>
      <StatusBar />
      <TabStack.Navigator initialRouteName="Home">
        <TabStack.Screen name="Histórico" component={Home} />
        <TabStack.Screen name="Home" component={Home} />
        <TabStack.Screen name="Profile" component={Home} />
      </TabStack.Navigator>
    </>
  );
};

export default AppRoutes;

const styles = StyleSheet.create({});
