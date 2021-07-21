import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { createStackNavigator } from "@react-navigation/stack";

import { Login, Cadastro } from "../pages";

const AuthStack = createStackNavigator();

const AuthRoutes: React.FC = () => {
  return (
    <>
      <StatusBar />
      <AuthStack.Navigator>
        <AuthStack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <AuthStack.Screen
          name="Cadastro"
          component={Cadastro}
          options={{ headerShown: false }}
        />
      </AuthStack.Navigator>
    </>
  );
};

export default AuthRoutes;

const styles = StyleSheet.create({});
