import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Circles from "../../components/styles/circles2";
import { Palette, Fonts } from "../../styles";

export default function historico() {
  return (
    <View style={styles.container}>
      <Circles />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Palette.white,
  },
});
