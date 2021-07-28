import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  TouchableNativeFeedback,
  Modal,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

import Circles from "../../components/styles/circles2";
import { Palette, Fonts } from "../../styles/";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function aprovacaoReserva({ route }) {
  let rippleColor: string, rippleOverflow: boolean, rippleRadius: number;
  const navigation = useNavigation();
  const [carregando, setCarregando] = useState(true);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [carregandoBotao, setCarregandoBotao] = useState(false);
  const [dados, setDados] = useState({
    id: "" as string,
    ambiente: "" as string,
    descricao: "" as string,
    solicitante: "" as string,
    nApartamento: 0 as number,
    dataReserva: "" as string,
    lotacao: 0 as number,
    status: "" as string,
  });

  const lorem =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.  Praesent bibendum ipsum sit amet mollis cursus. Nullam mauris purus, commodo efficitur maximus nec, placerat ac ante.";
  useEffect(() => {
    setDados({
      id: route.params.item.id,
      ambiente: route.params.item.ambiente,
      descricao: lorem,
      solicitante: route.params.item.solicitante,
      nApartamento: route.params.item.nApartamento,
      lotacao: 10,
      dataReserva: route.params.item.dataReserva,
      status: route.params.item.status,
    });
  }, []);

  setTimeout(() => {
    setCarregando(false);
  }, 1000);

  function navegar(route: string) {
    setCarregandoBotao(true);
    setTimeout(() => {
      navigation.navigate(route);
      setMostrarModal(false);
      setCarregandoBotao(false);
    }, 1500);
  }

  function Status(status: string) {
    if (status === "Reservado") {
      return (
        <View
          style={{ ...styles.status, backgroundColor: Palette.green }}
        ></View>
      );
    } else if (status === "Pendente") {
      return (
        <View
          style={{ ...styles.status, backgroundColor: Palette.orange }}
        ></View>
      );
    } else if (status === "Cancelado") {
      return (
        <View style={{ ...styles.status, backgroundColor: Palette.red }}></View>
      );
    } else if (status === "Concluído") {
      return (
        <View
          style={{ ...styles.status, backgroundColor: Palette.black }}
        ></View>
      );
    } else {
      return (
        <AntDesign
          name="warning"
          size={10}
          color={Palette.red}
          style={styles.status}
        />
      );
    }
  }

  function tipoStatus(status: string) {
    {
      if (status === "Pendente") {
        return true;
      } else {
        return false;
      }
    }
  }

  return (
    <View style={styles.container}>
      <Circles />
      <Modal animationType="fade" transparent={true} visible={mostrarModal}>
        <View style={styles.modalContainer}>
          <View style={styles.conteudoModalContainer}>
            <Text style={{ ...styles.textoModal, fontSize: 20 }}>
              Deseja cancelar a reserva?
            </Text>
            <View style={styles.botaoModalContainer}>
              <TouchableNativeFeedback
                onPress={() => setMostrarModal(false)}
                background={TouchableNativeFeedback.Ripple(
                  (rippleColor = "rgba(58, 51, 53, 0.1)"),
                  (rippleOverflow = true),
                  (rippleRadius = 40)
                )}
              >
                <View style={styles.botaoNaoModal}>
                  <Text style={styles.textoModal}>Não</Text>
                </View>
              </TouchableNativeFeedback>
              <TouchableNativeFeedback
                onPress={() => navegar("AdminReservaCancelada")}
                background={TouchableNativeFeedback.Ripple(
                  (rippleColor = "rgba(235, 87, 87, 0.1)"),
                  (rippleOverflow = true),
                  (rippleRadius = 40)
                )}
              >
                <View style={styles.botaoSimModal}>
                  {carregandoBotao ? (
                    <ActivityIndicator color={Palette.red} size={15} />
                  ) : (
                    <Text
                      style={{
                        ...styles.textoModal,
                        color: Palette.red,
                      }}
                    >
                      Sim
                    </Text>
                  )}
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.headerContainer}>
        <Text style={styles.textoHeader}>{"Reserva " + dados.ambiente}</Text>
      </View>
      {carregando ? (
        <ActivityIndicator
          size={36}
          color={Palette.green}
          style={{ ...styles.conteudoContainer, height: screenHeight / 2 }}
        />
      ) : (
        <SafeAreaView style={styles.conteudoContainer}>
          <ScrollView showsVerticalScrollIndicator={true}>
            <View style={styles.conteudo}>
              <Text style={styles.textoConteudoPrincipal}>Ambiente: </Text>
              <Text style={styles.textoConteudo}>{dados.ambiente}</Text>
            </View>
            <View style={styles.conteudo}>
              <Text style={styles.textoConteudoPrincipal}>Descrição: </Text>
              <Text style={styles.textoConteudo}>{dados.descricao}</Text>
            </View>
            <View style={styles.conteudo}>
              <Text style={styles.textoConteudoPrincipal}>Solicitante: </Text>
              <Text style={styles.textoConteudo}>{dados.solicitante}</Text>
              <Text style={styles.textoConteudoPrincipal}>{"\t"}Apt: </Text>
              <Text style={styles.textoConteudo}>{dados.nApartamento}</Text>
            </View>
            <View style={styles.conteudo}>
              <Text style={styles.textoConteudoPrincipal}>
                Lotação Máxima:{" "}
              </Text>
              <Text style={styles.textoConteudo}>{dados.lotacao + " "}</Text>
              <Text style={styles.textoConteudo}>Pessoas</Text>
            </View>
            <View style={styles.conteudo}>
              <Text style={styles.textoConteudoPrincipal}>
                Dia da reserva:{" "}
              </Text>
              <Text style={styles.textoConteudo}>{dados.dataReserva}</Text>
            </View>
            <View style={styles.conteudo}>
              <Text style={styles.textoConteudoPrincipal}>Status: </Text>
              <Text style={styles.textoConteudo}>{dados.status}</Text>
              {Status(dados.status)}
            </View>
            {tipoStatus(dados.status) && (
              <View style={{ ...styles.conteudo, marginTop: 15 }}>
                <TouchableNativeFeedback
                  onPress={() => navegar("AdminReservaConfirmada")}
                  background={TouchableNativeFeedback.Ripple(
                    (rippleColor = Palette.white),
                    (rippleOverflow = false),
                    (rippleRadius = 120)
                  )}
                >
                  <View style={styles.touchableVoltar}>
                    {carregandoBotao ? (
                      <ActivityIndicator color={Palette.white} size={24} />
                    ) : (
                      <Text style={styles.botaoTextoVoltar}>
                        Confirmar reserva
                      </Text>
                    )}
                  </View>
                </TouchableNativeFeedback>
              </View>
            )}

            <View style={{ ...styles.conteudo, marginTop: 0 }}>
              <TouchableNativeFeedback
                onPress={() => setMostrarModal(true)}
                background={TouchableNativeFeedback.Ripple(
                  (rippleColor = "rgba(235, 87, 87, 0.1)"),
                  (rippleOverflow = true),
                  (rippleRadius = 60)
                )}
              >
                <View style={styles.touchableCancelar}>
                  <Text style={styles.botaoTextoCancelar}>
                    Cancelar reserva
                  </Text>
                </View>
              </TouchableNativeFeedback>
            </View>
          </ScrollView>
        </SafeAreaView>
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

  /* HEADER */
  headerContainer: {
    width: screenWidth,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginTop: 5,
  },
  textoHeader: {
    fontFamily: Fonts.lato_bold,
    fontSize: 28,
    color: Palette.green,
    flexWrap: "wrap",
  },

  /* CONTEUDO */
  conteudoContainer: {
    width: screenWidth,
    height: screenHeight / 1.65,
    paddingVertical: 30,
    textAlign: "center",
  },
  conteudo: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    width: screenWidth - 100,
    marginVertical: 10,
    alignSelf: "center",
  },
  textoConteudoPrincipal: {
    fontFamily: Fonts.lato_bold,
    fontSize: 18,
    color: Palette.black,
    textAlign: "center",
  },
  textoConteudo: {
    fontFamily: Fonts.lato_regular,
    fontSize: 18,
    color: Palette.black,
    textAlign: "center",
  },

  /* Status component */
  status: {
    width: 12,
    height: 12,
    marginLeft: 10,
    borderRadius: 10,
  },

  /* Botao Voltar */
  touchableVoltar: {
    backgroundColor: Palette.green,
    justifyContent: "center",
    alignItems: "center",
    width: screenWidth - 100,
    height: 55,
    borderRadius: 10,
  },
  botaoTextoVoltar: {
    fontFamily: Fonts.lato_bold,
    fontSize: 22,
    color: Palette.white,
  },

  /* Botao Cancelar */
  touchableCancelar: {
    justifyContent: "center",
    alignItems: "center",
    width: screenWidth - 100,
    height: 40,
    marginTop: 15,
  },
  botaoTextoCancelar: {
    fontFamily: Fonts.lato_bold,
    fontSize: 18,
    color: Palette.red,
  },

  /* Modal */
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.65)",
  },

  conteudoModalContainer: {
    width: screenWidth - 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Palette.white,
    borderRadius: 10,
    padding: 30,
  },
  textoModal: {
    fontFamily: Fonts.lato_bold,
    fontSize: 18,
  },

  botaoModalContainer: {
    width: screenWidth - 200,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  botaoSimModal: {
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Palette.red,
  },
  botaoNaoModal: {
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
