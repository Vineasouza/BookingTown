import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableNativeFeedback,
  StatusBar,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, AntDesign } from "@expo/vector-icons";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

import { Fonts, Palette } from "../styles";
import Circles from "../components/styles/circles";

export default function cadastro() {
  let rippleColor: string, rippleOverflow: boolean, rippleRadius: number;
  const navigation = useNavigation();
  const [passo, setPasso] = useState<string>("nome");
  const [error, setError] = useState<boolean>(false);
  const [carregando, setCarregando] = useState<boolean>(false);

  const [dados, setDados] = useState({
    nome: { value: "", error: "" },
    n_apartamento: { value: "", error: "" },
    email: { value: "", error: "" },
    senha: { value: "", error: "" },
  });

  function handleChange(field, text) {
    setDados((state) => ({ ...state, [field]: { value: text, error: "" } }));
  }

  function paraPasso(passo: string) {
    setPasso(passo);
  }

  const renderizaPassos = () => {
    switch (passo) {
      case "nome":
        return (
          <>
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple(
                (rippleColor = Palette.white),
                (rippleOverflow = false),
                (rippleRadius = 120)
              )}
              onPress={() => navigation.goBack()}
            >
              <View style={styles.botaoVoltar}>
                <Ionicons name="chevron-back" size={28} color={Palette.white} />
                <Text style={styles.textoBotaoVoltar}>Voltar</Text>
              </View>
            </TouchableNativeFeedback>
            <View style={styles.headerContainer}>
              <Text style={styles.textoMaiorHeader}>
                Qual é seu nome completo?
              </Text>
              <Text style={styles.textoMenorHeader}>Passo 1 de 4</Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Insira seu nome completo"
                secureTextEntry={false}
                placeholderTextColor="rgba(58, 51, 53, 0.5)"
                style={styles.input}
                autoCompleteType="name"
                textContentType="name"
                keyboardType="default"
                onChangeText={(e) => handleChange("nome", e)}
                value={dados.nome.value}
                autoCapitalize="sentences"
              />
              {error && (
                <View style={styles.errorContainer}>
                  <AntDesign
                    name="exclamationcircleo"
                    size={18}
                    color={Palette.red}
                  />
                  <Text style={styles.errorText}>{dados.nome.error}</Text>
                </View>
              )}
              <TouchableNativeFeedback
                onPress={() => paraPasso("apto")}
                background={TouchableNativeFeedback.Ripple(
                  (rippleColor = Palette.white),
                  (rippleOverflow = false),
                  (rippleRadius = 160)
                )}
              >
                <View style={styles.botaoProximo}>
                  {carregando ? (
                    <ActivityIndicator color={Palette.white} />
                  ) : (
                    <Text style={styles.textoBotaoProximo}>Próximo</Text>
                  )}
                </View>
              </TouchableNativeFeedback>
            </View>
          </>
        );
      case "apto":
        return (
          <>
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple(
                (rippleColor = Palette.white),
                (rippleOverflow = false),
                (rippleRadius = 120)
              )}
              onPress={() => paraPasso("nome")}
            >
              <View style={styles.botaoVoltar}>
                <Ionicons name="chevron-back" size={28} color={Palette.white} />
                <Text style={styles.textoBotaoVoltar}>Voltar</Text>
              </View>
            </TouchableNativeFeedback>
            <View style={styles.headerContainer}>
              <Text style={styles.textoMaiorHeader}>
                Qual é o número do apartamento?
              </Text>
              <Text style={styles.textoMenorHeader}>Passo 2 de 4</Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Insira o número do apartamento"
                secureTextEntry={false}
                placeholderTextColor="rgba(58, 51, 53, 0.5)"
                style={styles.input}
                autoCompleteType="cc-number"
                textContentType="none"
                keyboardType="numeric"
                onChangeText={(e) => handleChange("n_apartamento", e)}
                value={dados.n_apartamento.value}
                maxLength={3}
                autoCapitalize="none"
              />
              {error && (
                <View style={styles.errorContainer}>
                  <AntDesign
                    name="exclamationcircleo"
                    size={18}
                    color={Palette.red}
                  />
                  <Text style={styles.errorText}>
                    {dados.n_apartamento.error}
                  </Text>
                </View>
              )}
              <TouchableNativeFeedback
                onPress={() => paraPasso("email")}
                background={TouchableNativeFeedback.Ripple(
                  (rippleColor = Palette.white),
                  (rippleOverflow = false),
                  (rippleRadius = 160)
                )}
              >
                <View style={styles.botaoProximo}>
                  {carregando ? (
                    <ActivityIndicator color={Palette.white} />
                  ) : (
                    <Text style={styles.textoBotaoProximo}>Próximo</Text>
                  )}
                </View>
              </TouchableNativeFeedback>
            </View>
          </>
        );
      case "email":
        return (
          <>
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple(
                (rippleColor = Palette.white),
                (rippleOverflow = false),
                (rippleRadius = 120)
              )}
              onPress={() => paraPasso("apto")}
            >
              <View style={styles.botaoVoltar}>
                <Ionicons name="chevron-back" size={28} color={Palette.white} />
                <Text style={styles.textoBotaoVoltar}>Voltar</Text>
              </View>
            </TouchableNativeFeedback>
            <View style={styles.headerContainer}>
              <Text style={styles.textoMaiorHeader}>Qual é seu e-mail?</Text>
              <Text style={styles.textoMenorHeader}>Passo 3 de 4</Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Insira seu email"
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
              {error && (
                <View style={styles.errorContainer}>
                  <AntDesign
                    name="exclamationcircleo"
                    size={18}
                    color={Palette.red}
                  />
                  <Text style={styles.errorText}>
                    {dados.n_apartamento.error}
                  </Text>
                </View>
              )}
              <TouchableNativeFeedback
                onPress={() => paraPasso("senha")}
                background={TouchableNativeFeedback.Ripple(
                  (rippleColor = Palette.white),
                  (rippleOverflow = false),
                  (rippleRadius = 160)
                )}
              >
                <View style={styles.botaoProximo}>
                  {carregando ? (
                    <ActivityIndicator color={Palette.white} />
                  ) : (
                    <Text style={styles.textoBotaoProximo}>Próximo</Text>
                  )}
                </View>
              </TouchableNativeFeedback>
            </View>
          </>
        );
      case "senha":
        return (
          <>
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple(
                (rippleColor = Palette.white),
                (rippleOverflow = false),
                (rippleRadius = 120)
              )}
              onPress={() => paraPasso("email")}
            >
              <View style={styles.botaoVoltar}>
                <Ionicons name="chevron-back" size={28} color={Palette.white} />
                <Text style={styles.textoBotaoVoltar}>Voltar</Text>
              </View>
            </TouchableNativeFeedback>
            <View style={styles.headerContainer}>
              <Text style={styles.textoMaiorHeader}>Insira uma senha</Text>
              <Text style={styles.textoMenorHeader}>Passo 4 de 4</Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Senha"
                // secureTextEntry={!ehVisivel}
                placeholderTextColor="rgba(58, 51, 53, 0.5)"
                style={styles.input}
                autoCompleteType="password"
                textContentType="password"
                onChangeText={(e) => handleChange("senha", e)}
                value={dados.senha.value}
                autoCapitalize="none"
              />
              {error && (
                <View style={styles.errorContainer}>
                  <AntDesign
                    name="exclamationcircleo"
                    size={18}
                    color={Palette.red}
                  />
                  <Text style={styles.errorText}>{dados.senha.error}</Text>
                </View>
              )}
              <TouchableNativeFeedback
                onPress={() => paraPasso("nome")}
                background={TouchableNativeFeedback.Ripple(
                  (rippleColor = Palette.white),
                  (rippleOverflow = false),
                  (rippleRadius = 160)
                )}
              >
                <View style={styles.botaoProximo}>
                  {carregando ? (
                    <ActivityIndicator color={Palette.white} />
                  ) : (
                    <Text style={styles.textoBotaoProximo}>Próximo</Text>
                  )}
                </View>
              </TouchableNativeFeedback>
            </View>
          </>
        );
      case "sucesso":
        return <></>;
      case "erro":
        return <></>;
      default:
        return (
          <View>
            <Text>Default</Text>
          </View>
        );
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      <Circles />
      {renderizaPassos()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Palette.white,
  },
  botaoVoltar: {
    position: "absolute",
    top: screenHeight / 15,
    left: 5,
    width: 75,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  textoBotaoVoltar: {
    fontFamily: Fonts.lato_regular,
    fontSize: 14,
    color: Palette.white,
  },

  /* HEADER */
  headerContainer: {
    width: screenWidth,
    height: screenHeight / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  textoMaiorHeader: {
    fontFamily: Fonts.roboto_bold,
    fontSize: 28,
    color: Palette.white,
  },
  textoMenorHeader: {
    fontFamily: Fonts.roboto_regular,
    fontSize: 24,
    color: Palette.white,
  },

  /* INPUT */
  inputContainer: {
    width: screenWidth,
    height: screenHeight / 2,
    justifyContent: "center",
    alignItems: "center",
  },
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

  /* ERROR */
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

  /* Botão Proximo */
  textoBotaoProximo: {
    fontFamily: Fonts.roboto_regular,
    fontSize: 24,
    color: Palette.white,
    alignSelf: "center",
  },
  botaoProximo: {
    marginTop: 20,
    width: screenWidth - 50,
    height: 65,
    backgroundColor: Palette.green,
    borderRadius: 15,
    justifyContent: "center",
  },
});
