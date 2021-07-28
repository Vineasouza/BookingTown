import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableNativeFeedback,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import "moment/locale/pt-br";

import Circles from "../../components/styles/circles2";
import { Palette, Fonts } from "../../styles";
import Date from "../../components/Date";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function reservar({ route }) {
  let rippleColor: string, rippleOverflow: boolean, rippleRadius: number;
  const navigation = useNavigation();
  const [carregandoInformacoes, setCarregandoInformacoes] = useState(true);
  const [carregandoBotao, setCarregandoBotao] = useState(false);
  const [label, setLabel] = useState("");
  const [data, setData] = useState(moment());

  useEffect(() => {
    setLabel(route.params.label);
  });

  function navegarPara(route: string) {
    setCarregandoBotao(true);
    setTimeout(() => {
      navigation.navigate(route);
      setCarregandoBotao(false);
    }, 2000);
  }

  setTimeout(() => {
    setCarregandoInformacoes(false);
  }, 1000);

  return (
    <View style={styles.container}>
      <Circles />
      <View style={styles.headerContainer}>
        <Text style={styles.textoHeader}>Reservar</Text>
        <Text style={{ ...styles.textoHeader, textTransform: "capitalize" }}>
          {label}
        </Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.conteudoContainer}
      >
        {carregandoInformacoes ? (
          <ActivityIndicator
            size={24}
            color={Palette.green}
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: screenHeight / 2,
            }}
          />
        ) : (
          <>
            <View style={styles.itemsContainer}>
              <Text
                style={{ ...styles.textoConteudo, fontFamily: Fonts.lato_bold }}
              >
                Lotação Máxima:{" "}
              </Text>
              <Text style={styles.textoConteudo}> 00 </Text>
              <Text style={styles.textoConteudo}>pessoas</Text>
            </View>
            <View style={styles.itemsContainer}>
              <Text
                style={{ ...styles.textoConteudo, fontFamily: Fonts.lato_bold }}
              >
                Descrição:{" "}
              </Text>
              <Text style={styles.textoConteudo}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praesent bibendum ipsum sit amet mollis cursus. Nullam mauris
                purus, commodo efficitur maximus nec, placerat ac ante. Praesent
                justo eros, consequat ut ligula at, convallis faucibus orci.
              </Text>
            </View>
            <View style={styles.dataContainer}>
              <Text style={styles.textoTituloData}>
                Selecione a data de reserva
              </Text>
              <Date data={data} setData={setData} />
            </View>
            <TouchableNativeFeedback
              onPress={() => navegarPara("ReservaRealizada")}
              background={TouchableNativeFeedback.Ripple(
                (rippleColor = Palette.white),
                (rippleOverflow = false),
                (rippleRadius = 100)
              )}
            >
              <View style={styles.touchableConfirmar}>
                {carregandoBotao ? (
                  <ActivityIndicator color={Palette.white} />
                ) : (
                  <Text style={styles.botaoTextConfirmar}>
                    Confirmar reserva
                  </Text>
                )}
              </View>
            </TouchableNativeFeedback>
          </>
        )}
      </ScrollView>
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
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginTop: 5,
  },
  textoHeader: {
    fontFamily: Fonts.lato_bold,
    fontSize: 28,
    color: Palette.green,
  },

  conteudoContainer: {
    width: screenWidth,
    height: screenHeight / 5,
  },

  itemsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    width: screenWidth - 100,
    alignSelf: "center",
    margin: 5,
  },
  textoConteudo: {
    fontFamily: Fonts.lato_regular,
    fontSize: 18,
    color: Palette.black,
    textAlign: "center",
  },

  dataContainer: {
    width: screenWidth - 100,
    alignSelf: "center",
    marginTop: 20,
  },
  textoTituloData: {
    fontFamily: Fonts.lato_regular,
    fontSize: 24,
    color: Palette.green,
    textAlign: "center",
  },
  textoData: {
    fontFamily: Fonts.lato_bold,
    fontSize: 24,
    color: Palette.black,
  },

  botaoDataContainer: {
    width: screenWidth - 100,
    justifyContent: "center",
    flexDirection: "row",
    alignSelf: "center",
    margin: 20,
  },
  botaoData: {
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "rgba(58, 51, 53, 0.5)",
    width: 68,
    height: 44,
  },

  touchableConfirmar: {
    width: screenWidth - 100,
    height: 65,
    backgroundColor: Palette.green,
    borderRadius: 15,
    justifyContent: "center",
    alignSelf: "center",
  },
  botaoTextConfirmar: {
    fontFamily: Fonts.roboto_regular,
    fontSize: 24,
    color: Palette.white,
    alignSelf: "center",
    textTransform: "capitalize",
  },
});
