import React, { useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { Fonts, Palette } from "../styles";

import AuthRoutes from "./auth.routes";
import AdminRoutes from "./admin.routes";
import UserRoutes from "./user.routes";

const Routes: React.FC = () => {
  const [signed, setSigned] = useState(true);
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

  return signed ? <AdminRoutes /> : <AuthRoutes />;
};

export default Routes;
