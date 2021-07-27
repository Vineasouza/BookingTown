import React from "react";
import { StatusBar } from "expo-status-bar";
import { createStackNavigator } from "@react-navigation/stack";

import { AdminHome, AdminAprovacaoReserva } from "../pages";

const AdminHomeStack = createStackNavigator();

const AdminHomeRoutes: React.FC = () => {
  return (
    <>
      <StatusBar />
      <AdminHomeStack.Navigator>
        <AdminHomeStack.Screen
          name="AdminHome"
          component={AdminHome}
          options={{ headerShown: false }}
        />
        <AdminHomeStack.Screen
          name="AdminAprovacaoReserva"
          component={AdminAprovacaoReserva}
          options={{ headerShown: false }}
        />
      </AdminHomeStack.Navigator>
    </>
  );
};

export default AdminHomeRoutes;
