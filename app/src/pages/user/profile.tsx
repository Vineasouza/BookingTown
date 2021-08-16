import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  ActivityIndicator,
  TouchableNativeFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { fazerLogout } from "../../actions";
import Circles from "../../components/styles/circles2";
import { Palette, Fonts } from "../../styles";
import { useDispatch, useSelector } from "react-redux";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
import firebase from "firebase";
import { useNavigation } from "@react-navigation/native";

export default function profile() {
  const navigation = useNavigation();
  const usuario = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  let rippleColor: string, rippleOverflow: boolean, rippleRadius: number;
  const [carregando, setCarregando] = useState(true);
  const [carregandoBotao, setCarregandoBotao] = useState(false);

  setTimeout(() => {
    setCarregando(false);
  }, 1000);

  const desconectar = () => {
    setCarregandoBotao(true);
    (dispatch(fazerLogout()) as unknown as Promise<firebase.database.Reference>)
      .then(() => {
        navigation.navigate("Login");
      })
      .finally(() => setCarregandoBotao(false));
  };

  const siglas = (name: string) => {
    const initials = name
      .split(" ")
      .map((n) => n[0])
      .filter((w) => w !== undefined);
    if (!initials[0]) return "";
    if (!initials[1]) return initials[0].toUpperCase();
    return (
      initials[0].toUpperCase() + initials[initials.length - 1].toUpperCase()
    );
  };

  const Icon = ({ initials }) => {
    return (
      <View style={styles.iconContainer}>
        <Text style={styles.siglaIcon}>{initials}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Circles />
      {carregando ? (
        <ActivityIndicator
          size={36}
          color={Palette.green}
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: screenHeight / 1.5,
          }}
        />
      ) : (
        <>
          <View style={styles.headerContainer}>
            <Icon initials={siglas(usuario?.nome)} />
            <Text
              style={{
                ...styles.textoIcon,
                color: Palette.green,
                textTransform: "capitalize",
              }}
            >
              {usuario?.nome}
            </Text>
          </View>
          <View style={styles.conteudoContainer}>
            <View style={styles.conteudo}>
              <Text style={styles.textoConteudoPrincipal}>Email: </Text>
              <Text style={styles.textoConteudo}>{usuario?.email}</Text>
            </View>
            <View style={styles.conteudo}>
              <Text style={styles.textoConteudoPrincipal}>Apartamento: </Text>
              <Text style={styles.textoConteudo}>{usuario?.n_apartamento}</Text>
            </View>
            <TouchableNativeFeedback
              onPress={() => desconectar()}
              background={TouchableNativeFeedback.Ripple(
                (rippleColor = Palette.white),
                (rippleOverflow = false),
                (rippleRadius = 80)
              )}
            >
              <View style={styles.touchableSair}>
                {carregandoBotao ? (
                  <ActivityIndicator color={Palette.white} />
                ) : (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: screenWidth / 3.5,
                    }}
                  >
                    <Ionicons
                      name="ios-exit-outline"
                      size={24}
                      color={Palette.white}
                    />
                    <Text style={styles.botaoTextoSair}>Desconectar</Text>
                  </View>
                )}
              </View>
            </TouchableNativeFeedback>
          </View>
        </>
      )}
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
    height: screenHeight / 4,
    justifyContent: "center",
    alignItems: "center",
  },

  /* CONTEUDO */
  conteudoContainer: {
    width: screenWidth,
    height: screenHeight / 2.5,
    justifyContent: "center",
    alignItems: "center",
  },
  conteudo: {
    flexDirection: "row",
  },
  textoConteudoPrincipal: {
    fontFamily: Fonts.lato_bold,
    fontSize: 18,
    color: Palette.black,
  },
  textoConteudo: {
    fontFamily: Fonts.lato_regular,
    fontSize: 18,
    color: Palette.black,
  },

  /* ICON */
  iconContainer: {
    backgroundColor: Palette.green,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100 / 2,
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  textoIcon: {
    fontFamily: Fonts.lato_bold,
    fontSize: 24,
    color: Palette.green,
  },
  siglaIcon: {
    fontFamily: Fonts.lato_bold,
    fontSize: 28,
    color: Palette.white,
  },

  /* BOTAO */
  touchableSair: {
    backgroundColor: Palette.green,
    width: screenWidth / 2,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginVertical: 40,
  },
  botaoTextoSair: {
    fontFamily: Fonts.lato_bold,
    fontSize: 18,
    color: Palette.white,
  },
});
