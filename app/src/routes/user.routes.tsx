import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";

import { Fonts, Palette } from "../styles";

import Home from "./home.routes";
import Reservas from "./reservas.routes";
import Profile from "./profile.routes";

// https://reactnavigation.org/docs/bottom-tab-navigator
const TabStack = createBottomTabNavigator();

const AppRoutes: React.FC = () => {
  return (
    <>
      <StatusBar />
      <TabStack.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = "home";
            } else if (route.name === "Reservas") {
              iconName = "profile";
            } else if (route.name === "Profile") {
              iconName = "user";
            }
            // You can return any component that you like here!
            return <AntDesign name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: Palette.green,
          inactiveTintColor: Palette.black,
          labelStyle: { fontFamily: Fonts.fugaz, fontSize: 10 },
          allowFontScaling: true,
          keyboardHidesTabBar: true,
          tabStyle: {
            backgroundColor: Palette.white,
            borderTopColor: "rgba(58, 51, 53, 0.5)",
            borderTopWidth: 0.5,
          },
        }}
      >
        <TabStack.Screen name="Reservas" component={Reservas} />
        <TabStack.Screen name="Home" component={Home} />
        <TabStack.Screen name="Profile" component={Profile} />
      </TabStack.Navigator>
    </>
  );
};

export default AppRoutes;

const styles = StyleSheet.create({});
