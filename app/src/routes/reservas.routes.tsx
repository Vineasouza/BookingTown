import React from "react";
import { StatusBar } from "expo-status-bar";
import { createStackNavigator } from "@react-navigation/stack";

import { Reservas, DetalhesReserva, ReservaCancelada } from "../pages";

const ReservasStack = createStackNavigator();

const ReservasRoutes: React.FC = () => {
  return (
    <>
      <StatusBar />
      <ReservasStack.Navigator>
        <ReservasStack.Screen
          name="Reservas"
          component={Reservas}
          options={{ headerShown: false }}
        />
        <ReservasStack.Screen
          name="DetalhesReserva"
          component={DetalhesReserva}
          options={{ headerShown: false }}
        />
        <ReservasStack.Screen
          name="ReservaCancelada"
          component={ReservaCancelada}
          options={{ headerShown: false }}
        />
      </ReservasStack.Navigator>
    </>
  );
};

export default ReservasRoutes;
