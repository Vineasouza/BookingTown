import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableNativeFeedback,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

import Circles from "../../components/styles/circles";
import { Palette, Fonts } from "../../styles";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function reservaConfirmada() {
  const navigation = useNavigation();
  let rippleColor: string, rippleOverflow: boolean, rippleRadius: number;

  return (
    <View style={styles.container}>
      <Circles />
      <View style={styles.headerContainer}>
        <Text
          style={{
            ...styles.textoHeader,
            maxWidth: 300,
            textAlign: "center",
          }}
        >
          Reserva Confirmada!
        </Text>
      </View>
      <View style={styles.conteudoContainer}>
        <View style={styles.iconContainer}>
          <AntDesign name="checkcircleo" size={60} color={Palette.green} />
        </View>
        <TouchableNativeFeedback
          onPress={() => navigation.navigate("AdminHome")}
          background={TouchableNativeFeedback.Ripple(
            (rippleColor = "rgba(58, 51, 53, 0.1)"),
            (rippleOverflow = false),
            (rippleRadius = 100)
          )}
        >
          <View style={styles.touchableInicio}>
            <Text style={styles.botaoTextoInicio}>Voltar para o início</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
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

  headerContainer: {
    width: screenWidth,
    height: screenHeight / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  textoHeader: {
    fontFamily: Fonts.roboto_bold,
    fontSize: 28,
    color: Palette.white,
  },

  conteudoContainer: {
    width: screenWidth,
    height: screenHeight / 2,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#eee",
  },

  iconContainer: {
    width: screenWidth,
    height: screenHeight / 3,
    alignItems: "center",
    justifyContent: "center",
  },

  touchableInicio: {
    width: screenWidth - 100,
    height: 65,
    backgroundColor: Palette.green,
    borderRadius: 15,
    justifyContent: "center",
    alignSelf: "center",
  },
  botaoTextoInicio: {
    fontFamily: Fonts.roboto_regular,
    fontSize: 24,
    color: Palette.white,
    alignSelf: "center",
    textTransform: "capitalize",
  },
});
