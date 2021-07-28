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
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  Ionicons,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

import { Fonts, Palette } from "../../styles";
import Circles from "../../components/styles/circles";

export default function cadastro() {
  let rippleColor: string, rippleOverflow: boolean, rippleRadius: number;
  const navigation = useNavigation();
  const [passo, setPasso] = useState<string>("nome");
  const [mensagemErro, setMensagemErro] = useState<string>("");
  const [carregando, setCarregando] = useState<boolean>(false);
  const [campoRequerido, setCampoRequerido] = useState<boolean>(false);

  const [dados, setDados] = useState({
    nome: { value: "", error: "" },
    n_apartamento: { value: "", error: "" },
    email: { value: "", error: "" },
    senha: { value: "", error: "" },
    confirmasenha: { value: "", error: "" },
  });

  function handleChange(field, text) {
    setDados((state) => ({ ...state, [field]: { value: text, error: "" } }));
  }

  /* VISIBILIDADE SENHA */
  const [ehVisivel, setEhVisivel] = useState(true);
  function showPassword() {
    setEhVisivel(!ehVisivel);
  }

  function paraPasso(passo: string) {
    setPasso(passo);
  }

  const naoVazia = (text) => {
    const test = text.trim() !== "";
    !test && setMensagemErro("Campo requerido!");
    return test;
  };

  /* **************************  Validação Nome ************************************* */
  const apenasLetras = (text) => {
    const test = /^[a-zA-Z\u00C0-\u017F\s]+$/.test(text.trim());
    dados.nome.error = "Digite apenas letras, maiúsculas ou minúsculas!";
    !test && setMensagemErro(dados.nome.error);
    return test;
  };
  function validaNome() {
    let valid = [
      apenasLetras(dados.nome.value), // ! Apenas letras
      naoVazia(dados.nome.value), // ! Não permite vazio
    ].every((e) => e === true);

    valid
      ? (paraPasso("apto"), setCampoRequerido(false))
      : setCampoRequerido(true);
  }
  /* ******************************************************************************** */

  /****************************  Validação Apto ************************************* */
  const apenasNumeros = (text) => {
    const test = /^[0-9]{3,3}/.test(text.trim());
    dados.n_apartamento.error = "Digite apenas números, no mínimo 3";
    !test && setMensagemErro(dados.n_apartamento.error);
    return test;
  };
  function validaApto() {
    let valid = [
      apenasNumeros(dados.n_apartamento.value), // ! Apenas números
      naoVazia(dados.n_apartamento.value), // ! Não permite vazio
    ].every((e) => e === true);

    valid
      ? (paraPasso("email"), setCampoRequerido(false))
      : setCampoRequerido(true);
  }
  /* ******************************************************************************** */

  /****************************  Validação Email ************************************ */
  const validaTextoEmail = (text) => {
    const test = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(text.trim());
    dados.email.error = "Digite um email válido!";
    !test && setMensagemErro(dados.email.error);
    return test;
  };
  function validaEmail() {
    let valid = [
      validaTextoEmail(dados.email.value), // ! Permite apenas entradas com xxx@xxx.xxx
      naoVazia(dados.email.value), // ! Não permite vazio
    ].every((e) => e === true);

    valid
      ? (paraPasso("senha"), setCampoRequerido(false))
      : setCampoRequerido(true);
  }
  /* ******************************************************************************** */

  /****************************  Validação Senha ************************************ */
  const validaTextoSenha = (text) => {
    const test = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})[\S]+$/.test(
      text.trim()
    );
    dados.senha.error =
      "A senha deve conter, no mínimo:\n\t• Um número.\n\t• Uma letra maiúscula.\n\t• Uma letra minúscula.\n\t• Oito caracteres.";
    !test && setMensagemErro(dados.senha.error);
    return test;
  };
  const compSenha = (textSenha, textConfSenha) => {
    if (textSenha.normalize() === textConfSenha.normalize()) return true;
    else {
      dados.senha.error = "As senhas devem ser iguais";
      setMensagemErro(dados.senha.error);
      return false;
    }
  };
  function validaSenha() {
    let valid = [
      validaTextoSenha(dados.senha.value),
      naoVazia(dados.senha.value), // ! Não permite vazio
      compSenha(dados.senha.value, dados.confirmasenha.value), // ! verifica se as senhas estão iguais
    ].every((e) => e === true);

    valid
      ? (paraPasso("sucesso"), setCampoRequerido(false))
      : setCampoRequerido(true);
  }
  /* ******************************************************************************** */

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
              {campoRequerido && (
                <View style={styles.errorContainer}>
                  <AntDesign
                    name="exclamationcircleo"
                    size={18}
                    color={Palette.red}
                  />
                  <Text style={styles.errorText}>{mensagemErro}</Text>
                </View>
              )}
              <TouchableNativeFeedback
                onPress={() => validaNome()}
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
              onPress={() => (paraPasso("nome"), setCampoRequerido(false))}
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
              {campoRequerido && (
                <View style={styles.errorContainer}>
                  <AntDesign
                    name="exclamationcircleo"
                    size={18}
                    color={Palette.red}
                  />
                  <Text style={styles.errorText}>{mensagemErro}</Text>
                </View>
              )}
              <TouchableNativeFeedback
                onPress={() => validaApto()}
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
              onPress={() => (paraPasso("apto"), setCampoRequerido(false))}
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
              {campoRequerido && (
                <View style={styles.errorContainer}>
                  <AntDesign
                    name="exclamationcircleo"
                    size={18}
                    color={Palette.red}
                  />
                  <Text style={styles.errorText}>{mensagemErro}</Text>
                </View>
              )}
              <TouchableNativeFeedback
                onPress={() => validaEmail()}
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
              onPress={() => (paraPasso("email"), setCampoRequerido(false))}
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
                placeholder="Digite uma senha"
                secureTextEntry={ehVisivel}
                autoCompleteType="password"
                textContentType="password"
                placeholderTextColor="rgba(58, 51, 53, 0.5)"
                style={styles.input}
                onChangeText={(e) => handleChange("senha", e)}
                value={dados.senha.value}
                maxLength={20}
              />
              <TextInput
                placeholder="Confirme a senha"
                secureTextEntry={ehVisivel}
                autoCompleteType="password"
                textContentType="password"
                placeholderTextColor="rgba(58, 51, 53, 0.5)"
                style={styles.input}
                onChangeText={(e) => handleChange("confirmasenha", e)}
                value={dados.confirmasenha.value}
                maxLength={20}
              />
              <View style={styles.inputVisibleContainer}>
                <TouchableOpacity
                  onPress={showPassword}
                  style={styles.inputVisible}
                >
                  {ehVisivel ? (
                    <View style={styles.grid}>
                      <MaterialCommunityIcons
                        name="checkbox-blank-outline"
                        size={24}
                        color={Palette.black}
                        style={{ marginRight: 5 }}
                      />
                      <Text style={styles.inputVisibleText}>Mostrar senha</Text>
                    </View>
                  ) : (
                    <View style={styles.grid}>
                      <MaterialCommunityIcons
                        name="checkbox-marked"
                        size={24}
                        color={Palette.green}
                        style={{ marginRight: 5 }}
                      />
                      <Text style={styles.inputVisibleText}>
                        Esconder senha
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              </View>

              {campoRequerido && (
                <View style={styles.errorContainer}>
                  <AntDesign
                    name="exclamationcircleo"
                    size={18}
                    color={Palette.red}
                  />
                  <Text style={styles.errorText}>{mensagemErro}</Text>
                </View>
              )}
              <TouchableNativeFeedback
                onPress={() => validaSenha()}
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
        return (
          <>
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple(
                (rippleColor = Palette.white),
                (rippleOverflow = false),
                (rippleRadius = 120)
              )}
              onPress={() => (paraPasso("senha"), setCampoRequerido(false))}
            >
              <View style={styles.botaoVoltar}>
                <Ionicons name="chevron-back" size={28} color={Palette.white} />
                <Text style={styles.textoBotaoVoltar}>Voltar</Text>
              </View>
            </TouchableNativeFeedback>
            <View style={styles.headerContainer}>
              <Text
                style={{
                  ...styles.textoMaiorHeader,
                  maxWidth: 300,
                  textAlign: "center",
                }}
              >
                Cadastro realizado com sucesso!
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <AntDesign
                  name="checkcircleo"
                  size={60}
                  color={Palette.green}
                />
              </View>
              <TouchableNativeFeedback
                onPress={() => paraPasso("erro")}
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
                    <Text style={styles.textoBotaoProximo}>
                      Voltar ao login
                    </Text>
                  )}
                </View>
              </TouchableNativeFeedback>
            </View>
          </>
        );
      case "erro":
        return (
          <>
            <View style={styles.headerContainer}>
              <Text
                style={{
                  ...styles.textoMaiorHeader,
                  maxWidth: 300,
                  textAlign: "center",
                }}
              >
                Erro no cadastro!
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <AntDesign name="closecircleo" size={60} color={Palette.red} />
              </View>
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
                    <Text style={styles.textoBotaoProximo}>
                      Tentar novamente
                    </Text>
                  )}
                </View>
              </TouchableNativeFeedback>
              <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple(
                  (rippleColor = "rgba(58, 51, 53, 0.1)"),
                  (rippleOverflow = false),
                  (rippleRadius = 120)
                )}
                onPress={() => navigation.navigate("Login")}
              >
                <View style={styles.touchableVoltarLogin}>
                  <Text style={styles.buttonTextVoltarLogin}>
                    Voltar para o login
                  </Text>
                </View>
              </TouchableNativeFeedback>
            </View>
          </>
        );
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

  /* Checkbox Senha */
  inputVisibleContainer: {
    display: "flex",
    flexDirection: "row",
    height: 50,
    marginBottom: 5,
    fontSize: 16,
    fontFamily: Fonts.lato_regular,
    fontStyle: "normal",
    alignItems: "center",
  },
  inputVisible: {
    maxWidth: 600,
  },
  inputVisibleText: {
    fontSize: 14,
    fontFamily: Fonts.lato_regular,
    fontStyle: "normal",
    textAlign: "right",
    textTransform: "uppercase",
    color: Palette.black,
  },
  grid: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
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

  iconContainer: {
    width: screenWidth,
    height: screenHeight / 5,
    alignItems: "center",
    justifyContent: "center",
  },

  touchableVoltarLogin: {
    width: screenWidth - 50,
    height: 65,
    marginTop: 4,
    borderRadius: 15,
    justifyContent: "center",
  },
  buttonTextVoltarLogin: {
    fontFamily: Fonts.roboto_bold,
    fontSize: 18,
    color: Palette.green,
    alignSelf: "center",
  },
});
