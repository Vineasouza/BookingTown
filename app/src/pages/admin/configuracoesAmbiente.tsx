import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableNativeFeedback,
  TextInput,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { ActivityIndicator, FAB } from "react-native-paper";

import Circles from "../../components/styles/circles2";
import { Palette, Fonts } from "../../styles/";
import { ScrollView } from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const ICON_SIZE = 28;

const DATA = [
  {
    id: "0",
    ambiente: "Churrasqueira 1",
    descricao:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.  Praesent bibendum ipsum sit amet mollis cursus. Nullam mauris purus, commodo efficitur maximus nec, placerat ac ante.",
    lotacaoMaxima: "40",
  },
  {
    id: "1",
    ambiente: "Salão de festas",
    descricao:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.  Praesent bibendum ipsum sit amet mollis cursus. Nullam mauris purus, commodo efficitur maximus nec, placerat ac ante.",
    lotacaoMaxima: "45",
  },
  {
    id: "2",
    ambiente: "Salão Gourmet",
    descricao:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.  Praesent bibendum ipsum sit amet mollis cursus. Nullam mauris purus, commodo efficitur maximus nec, placerat ac ante.",
    lotacaoMaxima: "20",
  },
  {
    id: "3",
    ambiente: "Churrasqueira 2",
    descricao:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.  Praesent bibendum ipsum sit amet mollis cursus. Nullam mauris purus, commodo efficitur maximus nec, placerat ac ante.",
    lotacaoMaxima: "30",
  },
];

const Item = ({ item, onPress }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item]}>
    <View style={styles.itemContainer}>
      <View style={styles.itemSquare}>
        <MaterialCommunityIcons name="party-popper" size={24} color="black" />
      </View>
      <Text style={{ ...styles.title }}>{item.ambiente}</Text>
      <AntDesign name="right" size={24} color={Palette.black} />
    </View>
  </TouchableOpacity>
);

export default function configuracoesAmbiente() {
  let rippleColor: string, rippleOverflow: boolean, rippleRadius: number;
  const navigation = useNavigation();

  const CASE_INICIAL = "inicial";
  const CASE_ADICIONAR = "adicionar";
  const CASE_MODIFICAR = "modificar";
  const CASE_MODIFICAR_INPUT = "modificar_input";
  const CASE_REMOVER = "remover";
  const CASE_REMOVER_APROVAR = "remover_aprovar";

  const [passo, setPasso] = useState<string>(CASE_INICIAL);
  const [carregando, setCarregando] = useState<boolean>(false);
  const [carregandoLista, setCarregandoLista] = useState<boolean>(false);
  const [errorAdicionar, setErrorAdicionar] = useState<boolean>(false);
  const [errorModificar, setErrorModificar] = useState<boolean>(false);
  const [novoAmbiente, setNovoAmbiente] = useState({
    nome: { value: "" as string },
    descricao: { value: "" as string },
    lotacaoMaxima: { value: "" as string },
  });
  const [modificarAmbiente, setModificarAmbiente] = useState({
    nome: { value: "" as string },
    descricao: { value: "" as string },
    lotacaoMaxima: { value: "" as string },
  });
  const [removerAmbiente, setRemoverAmbiente] = useState({
    nome: { value: "" as string },
    descricao: { value: "" as string },
    lotacaoMaxima: { value: "" as string },
  });
  const [selectedId, setSelectedId] = useState(null);

  /* ADICIONAR */
  function handleChangeAdicionar(field: string, text: string) {
    setNovoAmbiente((state) => ({ ...state, [field]: { value: text } }));
  }

  function handleSalvar() {
    setCarregando(true);
    setTimeout(() => {
      setPasso(CASE_INICIAL);
      setCarregando(false);
    }, 2000);
  }

  function verificaCampos() {
    const naoVazia = (text) => {
      const test = text.trim() !== "";
      return test;
    };

    let valid = [
      naoVazia(novoAmbiente.nome.value),
      naoVazia(novoAmbiente.descricao.value),
      naoVazia(novoAmbiente.lotacaoMaxima.value),
    ].every((e) => e === true);

    valid
      ? (handleSalvar(), setErrorAdicionar(false))
      : setErrorAdicionar(true);
  }

  /* MODIFICAR */
  function handleChangeModificar(field: string, text: string) {
    setModificarAmbiente((state) => ({ ...state, [field]: { value: text } }));
  }

  const renderItemModificar = ({ item }) => {
    return (
      <Item
        item={item}
        onPress={() => (
          setModificarAmbiente({
            nome: { value: item.ambiente },
            descricao: { value: item.descricao },
            lotacaoMaxima: { value: item.lotacaoMaxima },
          }),
          setPasso(CASE_MODIFICAR_INPUT)
        )}
      />
    );
  };

  function handleSalvarModificar() {
    setCarregando(true);
    setTimeout(() => {
      setPasso(CASE_INICIAL);
      setCarregando(false);
    }, 2000);
  }

  function verificaCamposModificar() {
    const naoVazia = (text) => {
      const test = text.trim() !== "";
      return test;
    };

    let valid = [
      naoVazia(modificarAmbiente.nome.value),
      naoVazia(modificarAmbiente.descricao.value),
      naoVazia(modificarAmbiente.lotacaoMaxima.value),
    ].every((e) => e === true);

    valid
      ? (handleSalvarModificar(), setErrorModificar(false))
      : setErrorModificar(true);
  }

  /* REMOVER */
  const renderItemRemover = ({ item }) => {
    return (
      <Item
        item={item}
        onPress={() => (
          setRemoverAmbiente({
            nome: { value: item.ambiente },
            descricao: { value: item.descricao },
            lotacaoMaxima: { value: item.lotacaoMaxima },
          }),
          setPasso(CASE_REMOVER_APROVAR)
        )}
      />
    );
  };

  function handleRemover() {
    setCarregando(true);
    setTimeout(() => {
      setPasso(CASE_INICIAL);
      setCarregando(false);
    }, 2000);
  }

  const renderizaPassos = () => {
    switch (passo) {
      case CASE_INICIAL:
        return (
          <>
            <View style={styles.headerContainer}>
              <Text style={styles.textoMaiorHeader}>
                Configurações de Amabiente
              </Text>
              <Text style={styles.textoMenorHeader}>Selecione uma ação</Text>
            </View>
            <ScrollView style={styles.scrollContainer}>
              <View style={styles.conteudoContainer}>
                <TouchableNativeFeedback
                  background={TouchableNativeFeedback.Ripple(
                    (rippleColor = "rgba(58, 51, 53, 0.1)"),
                    (rippleOverflow = false),
                    (rippleRadius = 120)
                  )}
                  onPress={() => setPasso(CASE_ADICIONAR)}
                >
                  <View style={styles.touchableAcao}>
                    <View style={styles.iconeAcaoContainer}>
                      <AntDesign
                        name="plus"
                        size={ICON_SIZE}
                        color={Palette.green}
                      />
                    </View>
                    <Text style={styles.textoBotaoAcao}>
                      Adicionar um ambiente
                    </Text>
                  </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback
                  background={TouchableNativeFeedback.Ripple(
                    (rippleColor = "rgba(58, 51, 53, 0.1)"),
                    (rippleOverflow = false),
                    (rippleRadius = 120)
                  )}
                  onPress={() => setPasso(CASE_MODIFICAR)}
                >
                  <View style={styles.touchableAcao}>
                    <View style={styles.iconeAcaoContainer}>
                      <AntDesign
                        name="setting"
                        size={ICON_SIZE}
                        color={Palette.orange}
                      />
                    </View>
                    <Text style={styles.textoBotaoAcao}>
                      Modificar um ambiente
                    </Text>
                  </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback
                  background={TouchableNativeFeedback.Ripple(
                    (rippleColor = "rgba(58, 51, 53, 0.1)"),
                    (rippleOverflow = false),
                    (rippleRadius = 120)
                  )}
                  onPress={() => setPasso(CASE_REMOVER)}
                >
                  <View style={styles.touchableAcao}>
                    <View style={styles.iconeAcaoContainer}>
                      <AntDesign
                        name="close"
                        size={ICON_SIZE}
                        color={Palette.red}
                      />
                    </View>
                    <Text style={styles.textoBotaoAcao}>
                      Remover um ambiente
                    </Text>
                  </View>
                </TouchableNativeFeedback>
              </View>
            </ScrollView>
          </>
        );
      case CASE_ADICIONAR:
        return (
          <>
            <FAB
              style={styles.fab}
              small
              icon={() => (
                <AntDesign name="arrowleft" size={24} color={Palette.green} />
              )}
              onPress={() => setPasso(CASE_INICIAL)}
              color={Palette.green}
            />
            <View style={styles.headerContainer}>
              <Text style={styles.textoMaiorHeader}>Adicionar ambiente</Text>
            </View>
            <ScrollView style={styles.scrollContainer}>
              <View style={styles.conteudoContainer}>
                <TextInput
                  placeholder="Nome do ambiente"
                  secureTextEntry={false}
                  placeholderTextColor="rgba(58, 51, 53, 0.5)"
                  style={styles.input}
                  autoCompleteType="off"
                  keyboardType="default"
                  onChangeText={(e) => handleChangeAdicionar("nome", e)}
                  value={novoAmbiente.nome.value}
                  autoCapitalize="words"
                />
                <TextInput
                  placeholder="Descrição"
                  secureTextEntry={false}
                  placeholderTextColor="rgba(58, 51, 53, 0.5)"
                  style={styles.input}
                  autoCompleteType="off"
                  keyboardType="default"
                  maxLength={100}
                  onChangeText={(e) => handleChangeAdicionar("descricao", e)}
                  value={novoAmbiente.descricao.value}
                  autoCapitalize="none"
                />
                <TextInput
                  placeholder="Lotação máxima"
                  secureTextEntry={false}
                  placeholderTextColor="rgba(58, 51, 53, 0.5)"
                  style={styles.input}
                  autoCompleteType="off"
                  keyboardType="numeric"
                  onChangeText={(e) =>
                    handleChangeAdicionar("lotacaoMaxima", e)
                  }
                  value={novoAmbiente.lotacaoMaxima.value}
                  autoCapitalize="none"
                />
                {errorAdicionar && (
                  <Text style={styles.textoErrorAdicionar}>
                    Preencha todos os campos!
                  </Text>
                )}
                <TouchableNativeFeedback
                  background={TouchableNativeFeedback.Ripple(
                    (rippleColor = "rgba(58, 51, 53, 0.1)"),
                    (rippleOverflow = false),
                    (rippleRadius = 120)
                  )}
                  onPress={() => verificaCampos()}
                >
                  <View style={styles.touchableSalvar}>
                    {carregando ? (
                      <ActivityIndicator size="small" color={Palette.white} />
                    ) : (
                      <Text style={styles.textoBotaoSalvar}>Salvar</Text>
                    )}
                  </View>
                </TouchableNativeFeedback>
              </View>
            </ScrollView>
          </>
        );

      case CASE_MODIFICAR:
        return (
          <>
            <FAB
              style={styles.fab}
              small
              icon={() => (
                <AntDesign name="arrowleft" size={24} color={Palette.green} />
              )}
              onPress={() => setPasso(CASE_INICIAL)}
              color={Palette.green}
            />
            <View style={styles.headerContainer}>
              <Text style={styles.textoMaiorHeader}>Modificar ambiente</Text>
              <Text style={styles.textoMenorHeader}>Selecione um ambiente</Text>
            </View>
            <SafeAreaView style={styles.flatlistContainer}>
              {carregandoLista ? (
                <ActivityIndicator size={36} color={Palette.green} />
              ) : (
                <FlatList
                  data={DATA}
                  renderItem={renderItemModificar}
                  keyExtractor={(item) => item.id}
                  extraData={selectedId}
                  showsVerticalScrollIndicator={false}
                />
              )}
            </SafeAreaView>
          </>
        );
      case CASE_MODIFICAR_INPUT:
        return (
          <>
            <FAB
              style={styles.fab}
              small
              icon={() => (
                <AntDesign name="arrowleft" size={24} color={Palette.green} />
              )}
              onPress={() => setPasso(CASE_INICIAL)}
              color={Palette.green}
            />
            <View style={styles.headerContainer}>
              <Text style={styles.textoMaiorHeader}>
                {"Modificar " + modificarAmbiente.nome.value}
              </Text>
            </View>
            <ScrollView style={styles.scrollContainer}>
              <View style={styles.conteudoContainer}>
                <Text style={styles.textoLabel}>Nome do ambiente</Text>
                <TextInput
                  placeholder="Nome do ambiente"
                  secureTextEntry={false}
                  placeholderTextColor="rgba(58, 51, 53, 0.5)"
                  style={styles.input}
                  autoCompleteType="off"
                  keyboardType="default"
                  onChangeText={(e) => handleChangeModificar("nome", e)}
                  value={modificarAmbiente.nome.value}
                  autoCapitalize="words"
                />
                <Text style={styles.textoLabel}>Descrição do ambiente</Text>
                <TextInput
                  placeholder="Descrição"
                  secureTextEntry={false}
                  placeholderTextColor="rgba(58, 51, 53, 0.5)"
                  style={styles.input}
                  autoCompleteType="off"
                  keyboardType="default"
                  maxLength={100}
                  onChangeText={(e) => handleChangeModificar("descricao", e)}
                  value={modificarAmbiente.descricao.value}
                  autoCapitalize="none"
                />
                <Text style={styles.textoLabel}>Lotação máxima</Text>
                <TextInput
                  placeholder="Lotação máxima"
                  secureTextEntry={false}
                  maxLength={3}
                  placeholderTextColor="rgba(58, 51, 53, 0.5)"
                  style={styles.input}
                  autoCompleteType="off"
                  keyboardType="numeric"
                  onChangeText={(e) =>
                    handleChangeModificar("lotacaoMaxima", e)
                  }
                  value={modificarAmbiente.lotacaoMaxima.value}
                  autoCapitalize="none"
                />
                {errorModificar && (
                  <Text style={styles.textoErrorAdicionar}>
                    Preencha todos os campos!
                  </Text>
                )}
                <TouchableNativeFeedback
                  background={TouchableNativeFeedback.Ripple(
                    (rippleColor = "rgba(58, 51, 53, 0.1)"),
                    (rippleOverflow = false),
                    (rippleRadius = 120)
                  )}
                  onPress={() => verificaCamposModificar()}
                >
                  <View style={styles.touchableSalvar}>
                    {carregando ? (
                      <ActivityIndicator size="small" color={Palette.white} />
                    ) : (
                      <Text style={styles.textoBotaoSalvar}>Salvar</Text>
                    )}
                  </View>
                </TouchableNativeFeedback>
              </View>
            </ScrollView>
          </>
        );
      case CASE_REMOVER:
        return (
          <>
            <FAB
              style={styles.fab}
              small
              icon={() => (
                <AntDesign name="arrowleft" size={24} color={Palette.green} />
              )}
              onPress={() => setPasso(CASE_INICIAL)}
              color={Palette.green}
            />
            <View style={styles.headerContainer}>
              <Text style={styles.textoMaiorHeader}>Remover ambiente</Text>
              <Text style={styles.textoMenorHeader}>Selecione um ambiente</Text>
            </View>
            <SafeAreaView style={styles.flatlistContainer}>
              {carregandoLista ? (
                <ActivityIndicator size={36} color={Palette.green} />
              ) : (
                <FlatList
                  data={DATA}
                  renderItem={renderItemRemover}
                  keyExtractor={(item) => item.id}
                  extraData={selectedId}
                  showsVerticalScrollIndicator={false}
                />
              )}
            </SafeAreaView>
          </>
        );
      case CASE_REMOVER_APROVAR:
        return (
          <>
            <FAB
              style={styles.fab}
              small
              icon={() => (
                <AntDesign name="arrowleft" size={24} color={Palette.green} />
              )}
              onPress={() => setPasso(CASE_INICIAL)}
              color={Palette.green}
            />
            <View style={styles.headerContainer}>
              <Text style={styles.textoMaiorHeader}>
                {"Remover " + removerAmbiente.nome.value}{" "}
              </Text>
            </View>
            <ScrollView style={styles.scrollContainer}>
              <View style={styles.conteudoContainer}>
                <View style={styles.conteudo}>
                  <Text style={styles.textoLabelConteudo}>Ambiente: </Text>
                  <Text style={styles.textoConteudo}>
                    {removerAmbiente.nome.value}
                  </Text>
                </View>
                <View style={styles.conteudo}>
                  <Text style={styles.textoLabelConteudo}>Descrição: </Text>
                  <Text style={styles.textoConteudo}>
                    {removerAmbiente.descricao.value}
                  </Text>
                </View>
                <View style={styles.conteudo}>
                  <Text style={styles.textoLabelConteudo}>
                    Lotação Máxima:{" "}
                  </Text>
                  <Text style={styles.textoConteudo}>
                    {removerAmbiente.lotacaoMaxima.value}
                  </Text>
                </View>
              </View>
              <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple(
                  (rippleColor = "rgba(58, 51, 53, 0.1)"),
                  (rippleOverflow = false),
                  (rippleRadius = 120)
                )}
                onPress={() => handleRemover()}
              >
                <View style={styles.touchableRemover}>
                  {carregando ? (
                    <ActivityIndicator size="small" color={Palette.white} />
                  ) : (
                    <Text style={styles.textoBotaoRemover}>
                      Remover ambiente
                    </Text>
                  )}
                </View>
              </TouchableNativeFeedback>
            </ScrollView>
          </>
        );
      default:
        return (
          <>
            <FAB
              style={styles.fab}
              small
              icon="close"
              onPress={() => setPasso(CASE_INICIAL)}
              color={Palette.green}
            />
            <View style={styles.headerContainer}>
              <Text style={styles.textoMaiorHeader}>Erro 🤣🤣🤣</Text>
            </View>
            <ScrollView style={styles.scrollContainer}>
              <View style={styles.conteudoContainer}></View>
            </ScrollView>
          </>
        );
    }
  };

  return (
    <View style={styles.container}>
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

  /* HEADER */
  headerContainer: {
    width: screenWidth,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  textoMaiorHeader: {
    fontFamily: Fonts.roboto_bold,
    fontSize: 28,
    color: Palette.green,
  },
  textoMenorHeader: {
    marginTop: 5,
    fontFamily: Fonts.roboto_regular,
    fontSize: 24,
    color: Palette.green,
  },

  /* CONTEUDO */
  scrollContainer: {
    width: screenWidth,
    height: screenHeight / 6,
    paddingVertical: 20,
    marginVertical: 5,
  },
  conteudoContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  conteudo: {
    width: screenWidth - 100,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginVertical: 15,
  },
  textoLabelConteudo: {
    fontFamily: Fonts.lato_bold,
    fontSize: 18,
    color: Palette.black,
  },
  textoConteudo: {
    textAlign: "center",
    fontFamily: Fonts.lato_regular,
    fontSize: 18,
    color: Palette.black,
  },

  /* FLATLIST */
  flatlistContainer: {
    width: screenWidth,
    height: screenHeight / 1.9,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginTop: 10,
  },

  /* BOTAO ACAO */
  touchableAcao: {
    width: screenWidth - 100,
    justifyContent: "space-around",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "rgba(58, 51, 53, 0.7)",
    marginVertical: 10,
    flexDirection: "row",
    paddingVertical: 15,
  },
  textoBotaoAcao: {
    fontFamily: Fonts.lato_regular,
    fontSize: 19,
  },
  iconeAcaoContainer: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "rgba(58, 51, 53, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },

  /* BOTAO SALVAR */
  touchableSalvar: {
    width: screenWidth - 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: Palette.green,
    marginVertical: 10,
    flexDirection: "row",
    paddingVertical: 18,
  },
  textoBotaoSalvar: {
    fontFamily: Fonts.lato_bold,
    fontSize: 28,
    color: Palette.white,
  },

  /* BOTÃO REMOVER */
  touchableRemover: {
    width: screenWidth - 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: Palette.red,
    marginVertical: 10,
    flexDirection: "row",
    paddingVertical: 18,
    alignSelf: "center",
  },
  textoBotaoRemover: {
    fontFamily: Fonts.lato_bold,
    fontSize: 28,
    color: Palette.white,
  },

  /* INPUT */
  input: {
    width: screenWidth - 100,
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "rgba(58, 51, 53, 0.7)",
    marginVertical: 15,
    paddingHorizontal: 10,

    fontFamily: Fonts.lato_bold,
    color: Palette.black,
  },
  textoLabel: {
    fontFamily: Fonts.lato_bold,
    fontSize: 16,
    textAlign: "left",
    color: Palette.green,
  },

  /* FAB */
  fab: {
    position: "absolute",
    margin: 25,
    left: 0,
    top: 50,
    backgroundColor: Palette.white,
  },

  /* Error */
  textoErrorAdicionar: {
    fontFamily: Fonts.lato_bold,
    fontSize: 16,
    color: Palette.red,
  },

  /* ITEM */
  item: {
    padding: 10,
    marginVertical: 8,
    borderWidth: 1,
    borderRadius: 10,
    width: screenWidth - 100,
  },
  itemSquare: {
    width: 44,
    height: 44,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: Fonts.lato_regular,
    fontSize: 18,
    color: Palette.black,
  },
});
