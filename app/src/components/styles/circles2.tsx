import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";

import { Fonts, Palette } from "../../styles";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function circles2() {
  return (
    <View style={styles.circleContainer}>
      <View style={styles.circle1}></View>
      <View style={styles.circle2}></View>
      <View style={styles.circle3}></View>
      <View style={styles.header}>
        <Text style={styles.texto}>BookingTown</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  circleContainer: {
    flex: 1,
    zIndex: -1,
    elevation: -1,
    alignItems: "center",
    backgroundColor: Palette.white,
  },
  circle1: {
    position: "absolute",
    top: -120,
    width: screenWidth + 50,
    height: screenWidth - 50,
    backgroundColor: Palette.green,
    borderBottomLeftRadius: screenWidth * 2,
    borderBottomRightRadius: screenWidth * 2,
  },
  circle2: {
    position: "absolute",
    top: -105,
    width: screenWidth + 50,
    height: screenWidth - 50,
    backgroundColor: Palette.green,
    borderBottomLeftRadius: screenWidth * 2,
    borderBottomRightRadius: screenWidth * 2,
    opacity: 0.5,
  },
  circle3: {
    position: "absolute",
    top: -90,
    width: screenWidth + 50,
    height: screenWidth - 50,
    backgroundColor: Palette.green,
    borderBottomLeftRadius: screenWidth * 2,
    borderBottomRightRadius: screenWidth * 2,
    opacity: 0.25,
  },
  header: {
    width: screenWidth,
    height: screenHeight / 3,
    justifyContent: "center",
    alignItems: "center",
  },
  texto: {
    fontFamily: Fonts.fugaz,
    fontSize: 24,
    color: Palette.white,
  },
});
