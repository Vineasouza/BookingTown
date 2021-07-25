import React from "react";
import { StatusBar } from "expo-status-bar";
import { createStackNavigator } from "@react-navigation/stack";

import { Profile } from "../pages";

const ProfileStack = createStackNavigator();

const ProfileRoutes: React.FC = () => {
  return (
    <>
      <StatusBar />
      <ProfileStack.Navigator>
        <ProfileStack.Screen
          name="Profile"
          component={Profile}
          options={{ headerShown: false }}
        />
      </ProfileStack.Navigator>
    </>
  );
};

export default ProfileRoutes;
