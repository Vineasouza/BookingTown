import React, { useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { Fonts, Palette } from "../styles";

import AuthRoutes from "./auth.routes";
import TabRoutes from "./tab.routes";

const Routes: React.FC = () => {
  //   const { signed, loading } = useAuth();
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

  return signed ? <TabRoutes /> : <AuthRoutes />;
};

export default Routes;
