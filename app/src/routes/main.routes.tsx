import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { createStackNavigator } from "@react-navigation/stack";

import userRoutes from "./user.routes";
import authRoutes from "./auth.routes";
import adminRoutes from "./admin.routes";

const MainStack = createStackNavigator();

const MainRoutes: React.FC = () => {
  return (
    <>
      <StatusBar />
      <MainStack.Navigator initialRouteName="Auth">
        <MainStack.Screen
          name="User"
          component={userRoutes}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="Auth"
          component={authRoutes}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="Admin"
          component={adminRoutes}
          options={{ headerShown: false }}
        />
      </MainStack.Navigator>
    </>
  );
};

export default MainRoutes;

const styles = StyleSheet.create({});
