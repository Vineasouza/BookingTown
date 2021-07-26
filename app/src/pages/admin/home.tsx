import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import Circles from "../../components/styles/circles2";
import { Palette, Fonts } from "../../styles/";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function home() {
  const navigation = useNavigation();
  const [selectedId, setSelectedId] = useState(null);
  const [carregando, setCarregando] = useState(true);
  return (
    <View style={styles.container}>
      <Circles />
      <View style={styles.headerContainer}>
        <Text>Solicitações de Reserva</Text>
        <View style={styles.filtroContainer}>
          <TouchableOpacity style={styles.botaoFiltro}>
            <Text>Status</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botaoFiltro}>
            <Text>Hoje</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botaoFiltro}>
            <Text>Amanhã</Text>
          </TouchableOpacity>
        </View>
      </View>
      <SafeAreaView style={styles.flatlistContainer}>{}</SafeAreaView>
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

  /* HEADER */
  headerContainer: {
    width: screenWidth,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginTop: 5,
  },

  /* FLATLIST */
  flatlistContainer: {
    width: screenWidth,
    height: screenHeight / 1.9,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },

  /* FILTRO */
  filtroContainer: {
    flexDirection: "row",
    marginVertical: 10,
  },
  botaoFiltro: {
    justifyContent: "center",
    alignItems: "center",
    width: 90,
    height: 30,
    marginHorizontal: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "rgba(58, 51, 53, 0.5)",
  },
});
