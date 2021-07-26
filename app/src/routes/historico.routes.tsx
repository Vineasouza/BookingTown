import React from "react";
import { StatusBar } from "expo-status-bar";
import { createStackNavigator } from "@react-navigation/stack";

import { Historico, DetalhesReserva, ReservaCancelada } from "../pages";

const HistoricoStack = createStackNavigator();

const HistoricoRoutes: React.FC = () => {
  return (
    <>
      <StatusBar />
      <HistoricoStack.Navigator>
        <HistoricoStack.Screen
          name="Historico"
          component={Historico}
          options={{ headerShown: false }}
        />
        <HistoricoStack.Screen
          name="DetalhesReserva"
          component={DetalhesReserva}
          options={{ headerShown: false }}
        />
        <HistoricoStack.Screen
          name="ReservaCancelada"
          component={ReservaCancelada}
          options={{ headerShown: false }}
        />
      </HistoricoStack.Navigator>
    </>
  );
};

export default HistoricoRoutes;
