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
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import firebase from "firebase";
import { atualizarReserva } from "../../actions/reservasActions";

import Circles from "../../components/styles/circles2";
import { Palette, Fonts } from "../../styles";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function detalhesReserva({ route }) {
  const dispatch = useDispatch();
  let rippleColor: string, rippleOverflow: boolean, rippleRadius: number;
  const navigation = useNavigation();
  const [carregando, setCarregando] = useState(true);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [carregandoBotao, setCarregandoBotao] = useState(false);
  const [dados, setDados] = useState({
    id: "" as string,
    idMorador: "" as string,
    idAmbiente: "" as string,
    nomeAmbiente: "" as string,
    nomeMorador: "" as string,
    aptMorador: 0 as number,
    data: "" as string,
    status: "" as string,
  });

  function cancelarReserva() {
    setCarregandoBotao(true);
    const reservaAtualizada = {
      ...dados,
      status: "Cancelado",
    };

    (
      dispatch(
        atualizarReserva(reservaAtualizada)
      ) as unknown as Promise<firebase.database.Reference>
    )
      .then(() => navigation.navigate("ReservaCancelada"))
      .catch((err) => console.log(err));

    setCarregandoBotao(false);
  }

  // console.log(route.params.item);
  console.log(dados);

  const lorem =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.  Praesent bibendum ipsum sit amet mollis cursus. Nullam mauris purus, commodo efficitur maximus nec, placerat ac ante. Praesent justo eros, consequat ut ligula at, convallis faucibus orci.";

  useEffect(() => {
    setDados({
      id: route.params.item.id,
      idMorador: route.params.item.idMorador,
      idAmbiente: route.params.item.idAmbiente,
      nomeAmbiente: route.params.item.nomeAmbiente,
      nomeMorador: route.params.item.nomeMorador,
      aptMorador: route.params.item.aptMorador,
      data: route.params.item.data,
      status: route.params.item.status,
    });
  }, []);

  setTimeout(() => {
    setCarregando(false);
  }, 1000);

  function navegar() {
    setCarregandoBotao(true);
    setTimeout(() => {
      navigation.navigate("ReservaCancelada");
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
    } else if (status === "Conclu??do") {
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

  function cancelarAtivo(status: string) {
    {
      if (status === "Conclu??do" || status === "Cancelado") {
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
                  <Text style={styles.textoModal}>N??o</Text>
                </View>
              </TouchableNativeFeedback>
              <TouchableNativeFeedback
                onPress={() => cancelarReserva()}
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
        <Text style={styles.textoHeader}>
          {"Reserva " + dados.nomeAmbiente}
        </Text>
      </View>
      {carregando ? (
        <ActivityIndicator
          size={36}
          color={Palette.green}
          style={{ ...styles.conteudoContainer, height: screenHeight / 2 }}
        />
      ) : (
        <ScrollView style={styles.conteudoContainer}>
          <View style={styles.conteudo}>
            <Text style={styles.textoConteudoPrincipal}>Ambiente: </Text>
            <Text style={styles.textoConteudo}>{dados.nomeAmbiente}</Text>
          </View>
          {/* <View style={styles.conteudo}>
            <Text style={styles.textoConteudoPrincipal}>Descri????o: </Text>
            <Text style={styles.textoConteudo}>{dados.descricao}</Text>
          </View> */}
          {/* <View style={styles.conteudo}>
            <Text style={styles.textoConteudoPrincipal}>Lota????o M??xima: </Text>
            <Text style={styles.textoConteudo}>{dados.lotacao + " "}</Text>
            <Text style={styles.textoConteudo}>Pessoas</Text>
          </View> */}
          <View style={styles.conteudo}>
            <Text style={styles.textoConteudoPrincipal}>Dia da reserva: </Text>
            <Text style={styles.textoConteudo}>{dados.data}</Text>
          </View>
          <View style={styles.conteudo}>
            <Text style={styles.textoConteudoPrincipal}>Status: </Text>
            <Text style={styles.textoConteudo}>{dados.status}</Text>
            {Status(dados.status)}
          </View>
          <View style={{ ...styles.conteudo, marginTop: 15 }}>
            <TouchableNativeFeedback
              onPress={() => navigation.goBack()}
              background={TouchableNativeFeedback.Ripple(
                (rippleColor = Palette.white),
                (rippleOverflow = false),
                (rippleRadius = 120)
              )}
            >
              <View style={styles.touchableVoltar}>
                <Text style={styles.botaoTextoVoltar}>
                  Voltar para as reservas
                </Text>
              </View>
            </TouchableNativeFeedback>
          </View>
          {!cancelarAtivo(dados.status) && (
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
          )}
        </ScrollView>
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
    height: screenHeight / 4,
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
