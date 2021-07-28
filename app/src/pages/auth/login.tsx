import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  TouchableNativeFeedback,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

import firebase from "firebase";
import {
  FirebsaeApiKey,
  FirebaseAuthDomain,
  FirebaseProjectId,
  FirebaseStorageBucket,
  FirebaseMessagingSenderId,
  FirebaseAppId,
  FirebaseMeasurementId,
} from "react-native-dotenv";

import { Fonts, Palette } from "../../styles";
import Circles from "../../components/styles/circles";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function login() {
  let rippleColor: string, rippleOverflow: boolean, rippleRadius: number;
  const navigation = useNavigation();

  const [ehVisivel, setEhVisivel] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [error, setError] = useState(false);
  const [dados, setDados] = useState({
    email: { value: "" },
    senha: { value: "" },
  });

  function mostrarSenha() {
    setEhVisivel(!ehVisivel);
  }

  function handleChange(field: string, text: string) {
    setDados((state) => ({ ...state, [field]: { value: text } }));
  }

  useEffect(() => {
    var firebaseConfig = {
      apiKey: FirebsaeApiKey,
      authDomain: FirebaseAuthDomain,
      projectId: FirebaseProjectId,
      storageBucket: FirebaseStorageBucket,
      messagingSenderId: FirebaseMessagingSenderId,
      appId: FirebaseAppId,
      measurementId: FirebaseMeasurementId,
    };
    // Initialize Firebase
    if (firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
    }
  }, []);

  async function aoSubmeter() {
    setCarregando(true);

    await firebase
      .auth()
      .signInWithEmailAndPassword(dados.email.value, dados.senha.value)
      .then((user) => {
        setCarregando(false);
        setError(false);
        console.log(user);
      })
      .catch((error) => {
        setCarregando(false);
        setError(true);
        console.log(error);
      });
  }

  return (
    <View style={styles.globalContainer}>
      <StatusBar style={"light"} />
      <Circles />
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Text style={styles.textLogo}>BookingTown</Text>
        </View>
        <View style={styles.content}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="E-mail"
              secureTextEntry={false}
              placeholderTextColor="rgba(58, 51, 53, 0.5)"
              style={styles.input}
              autoCompleteType="email"
              textContentType="emailAddress"
              keyboardType="email-address"
              onChangeText={(e) => handleChange("email", e)}
              value={dados.email.value}
              autoCapitalize="none"
            />
            <View style={styles.grid}>
              <TextInput
                placeholder="Senha"
                secureTextEntry={!ehVisivel}
                placeholderTextColor="rgba(58, 51, 53, 0.5)"
                style={styles.input}
                autoCompleteType="password"
                textContentType="password"
                onChangeText={(e) => handleChange("senha", e)}
                value={dados.senha.value}
                autoCapitalize="none"
              />
              <View style={styles.inputVisibleContainer}>
                <TouchableOpacity
                  onPress={mostrarSenha}
                  style={styles.inputVisible}
                >
                  {ehVisivel ? (
                    <AntDesign
                      name="eye"
                      size={24}
                      color="rgba(58, 51, 53, 0.5)"
                    />
                  ) : (
                    <AntDesign
                      name="eyeo"
                      size={24}
                      color="rgba(58, 51, 53, 0.5)"
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>
            {error && (
              <View style={styles.errorContainer}>
                <AntDesign name="warning" size={18} color={Palette.red} />
                <Text style={styles.errorText}>E-mail ou senha inválida.</Text>
              </View>
            )}
            <View style={styles.buttonContainer}>
              <TouchableNativeFeedback
                onPress={() => aoSubmeter()}
                background={TouchableNativeFeedback.Ripple(
                  (rippleColor = Palette.white),
                  (rippleOverflow = false),
                  (rippleRadius = 160)
                )}
              >
                <View style={styles.touchableEntrar}>
                  {carregando ? (
                    <ActivityIndicator color={Palette.white} />
                  ) : (
                    <Text style={styles.buttonTextEntrar}>Entrar</Text>
                  )}
                </View>
              </TouchableNativeFeedback>
              <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple(
                  (rippleColor = "rgba(58, 51, 53, 0.1)"),
                  (rippleOverflow = false),
                  (rippleRadius = 120)
                )}
                onPress={() => navigation.navigate("Cadastro")}
              >
                <View style={styles.touchableCadastrar}>
                  <Text style={styles.buttonTextCadastrar}>
                    Não tem conta? Cadastre-se!
                  </Text>
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  globalContainer: {
    flex: 1,
    backgroundColor: Palette.white,
  },
  container: {
    alignItems: "center",
    width: screenWidth,
    height: screenHeight + screenHeight,
  },

  /* LOGO */
  logoContainer: {
    width: screenWidth,
    height: screenHeight / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  textLogo: {
    fontFamily: Fonts.fugaz,
    fontSize: 48,
    color: Palette.white,
    marginTop: screenHeight / 5,
    marginBottom: screenHeight / 4,
  },
  content: {
    width: screenWidth,
    height: screenHeight / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  /* INPUTS */
  inputContainer: {},
  input: {
    borderWidth: 1,
    borderColor: "rgba(58, 51, 53, 0.5)",
    borderRadius: 4,

    width: screenWidth - 50,
    maxWidth: 600,
    height: 50,
    paddingHorizontal: 14,
    marginBottom: 16,

    textAlignVertical: "center",

    fontSize: 18,
    fontFamily: Fonts.lato_regular,
  },
  grid: {
    flexDirection: "row",
    maxWidth: 600,
  },
  inputVisibleContainer: {
    height: 50,
    paddingLeft: 10,
    marginBottom: 16,
    justifyContent: "center",
    position: "absolute",
    right: 15,
  },

  inputVisible: {},

  /*ERROR */
  errorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
  },
  errorText: {
    marginLeft: 8,
    fontFamily: Fonts.lato_bold,
    fontSize: 14,
    color: Palette.red,
  },

  /* BUTTONS */
  buttonContainer: {},
  buttonTextEntrar: {
    fontFamily: Fonts.roboto_regular,
    fontSize: 24,
    color: Palette.white,
    alignSelf: "center",
  },
  touchableEntrar: {
    width: screenWidth - 50,
    height: 65,
    backgroundColor: Palette.green,
    borderRadius: 15,
    justifyContent: "center",
  },
  buttonTextCadastrar: {
    fontFamily: Fonts.roboto_bold,
    fontSize: 18,
    color: Palette.green,
    alignSelf: "center",
  },
  touchableCadastrar: {
    width: screenWidth - 50,
    height: 65,
    marginTop: 4,
    borderRadius: 15,
    justifyContent: "center",
  },
});
