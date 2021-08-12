import React, { useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { Fonts, Palette } from "../styles";
import { useSelector } from "react-redux";

import AuthRoutes from "./auth.routes";
import AdminRoutes from "./admin.routes";
import UserRoutes from "./user.routes";
import MainRoutes from "./main.routes";

const Routes: React.FC = () => {
  const user = useSelector((state: any) => state.user);

  const [signed, setSigned] = useState(false);
  const [loading, setLoading] = useState(false);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: Palette.white,
        }}
      >
        <ActivityIndicator size="large" color={Palette.green} />
      </View>
    );
  }

  return <MainRoutes />;
};

export default Routes;
