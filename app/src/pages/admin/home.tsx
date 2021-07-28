import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import { AntDesign } from "@expo/vector-icons";
import { FAB, Portal, Provider } from "react-native-paper";

import Circles from "../../components/styles/circles2";
import { Palette, Fonts } from "../../styles/";
import { ScrollView } from "react-native-gesture-handler";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const STATUS_RESERVADO = "Reservado";
const STATUS_PENDENTE = "Pendente";
const STATUS_CANCELADO = "Cancelado";
const STATUS_CONCLUIDO = "Concluído";
const FILTRO_STATUS = "status";
const FILTRO_HOJE = "hoje";
const FILTRO_AMANHA = "amanha";
const FILTRO_DEFAULT = "default";
const DATA_HOJE = moment().format("DD" + "/MM" + "/YYYY");
const DATA_AMANHA = moment()
  .add("1", "day")
  .format("DD" + "/MM" + "/YYYY");

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    ambiente: "Churrasqueira",
    solicitante: "Jorginho",
    nApartamento: 121,
    dataReserva: moment().format("DD" + "/MM" + "/YYYY"),
    status: STATUS_RESERVADO,
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    ambiente: "Salão de festas",
    solicitante: "Alberto",
    nApartamento: 122,
    dataReserva: moment().format("DD" + "/MM" + "/YYYY"),
    status: STATUS_PENDENTE,
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    ambiente: "Salão Gourmet",
    solicitante: "Roberta",
    nApartamento: 123,
    dataReserva: moment().format("DD" + "/MM" + "/YYYY"),
    status: STATUS_PENDENTE,
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d724",
    ambiente: "Churrasqueira",
    solicitante: "Rafaela",
    nApartamento: 124,
    dataReserva: moment()
      .add("1", "day")
      .format("DD" + "/MM" + "/YYYY"),
    status: STATUS_PENDENTE,
  },
];

function Status(status: string) {
  if (status === STATUS_RESERVADO) {
    return (
      <View style={{ ...styles.status, backgroundColor: Palette.green }}></View>
    );
  } else if (status === STATUS_PENDENTE) {
    return (
      <View
        style={{ ...styles.status, backgroundColor: Palette.orange }}
      ></View>
    );
  } else if (status === STATUS_CANCELADO) {
    return (
      <View style={{ ...styles.status, backgroundColor: Palette.red }}></View>
    );
  } else if (status === STATUS_CONCLUIDO) {
    return (
      <View style={{ ...styles.status, backgroundColor: Palette.black }}></View>
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

function cardAtivo(status: string) {
  {
    if (status === STATUS_CONCLUIDO) {
      return true;
    } else {
      return false;
    }
  }
}

const Item = ({ item, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.item]}
    disabled={cardAtivo(item.status)}
  >
    <View
      style={{
        flexDirection: "row",
        alignItems: "baseline",
        justifyContent: "space-between",
        paddingHorizontal: 10,
      }}
    >
      <View style={styles.itemContainer}>
        <View style={styles.conteudoItem}>
          <Text style={{ ...styles.title, fontFamily: Fonts.lato_bold }}>
            Ambiente:{" "}
          </Text>
          <Text style={{ ...styles.title }}>{item.ambiente}</Text>
        </View>
        <View style={styles.conteudoItem}>
          <Text style={{ ...styles.title, fontFamily: Fonts.lato_bold }}>
            Solicitante:{" "}
          </Text>
          <Text style={{ ...styles.title }}>{item.solicitante}</Text>
          <Text style={{ ...styles.title, fontFamily: Fonts.lato_bold }}>
            {"\t"}Apt:{" "}
          </Text>
          <Text style={{ ...styles.title }}>{item.nApartamento}</Text>
        </View>
        <View style={styles.conteudoItem}>
          <Text style={{ ...styles.title, fontFamily: Fonts.lato_bold }}>
            Data da reserva:{" "}
          </Text>
          <Text style={{ ...styles.title }}>{item.dataReserva}</Text>
        </View>
        <View style={styles.conteudoItem}>
          <Text style={{ ...styles.title, fontFamily: Fonts.lato_bold }}>
            Status:{" "}
          </Text>
          <Text style={{ ...styles.title }}>{item.status}</Text>
          {Status(item.status)}
        </View>
      </View>
      {!cardAtivo(item.status) && (
        <AntDesign
          name="right"
          size={24}
          color={Palette.black}
          style={{ alignSelf: "center" }}
        />
      )}
    </View>
  </TouchableOpacity>
);

export default function home() {
  let rippleColor: string, rippleOverflow: boolean, rippleRadius: number;
  const navigation = useNavigation();
  const [selectedId, setSelectedId] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [mostrarModalFiltros, setMostrarModalFiltros] = useState(false);
  const [filtro, setFiltro] = useState({
    type: FILTRO_DEFAULT,
    value: "",
  });

  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
        onPress={() =>
          navigation.navigate("AdminAprovacaoReserva", { item: item })
        }
      />
    );
  };

  function filtroRetornDados(type: string, value: string) {
    const dadosFiltrados: any[] = [];
    if (type === FILTRO_STATUS) {
      DATA.map(function (item) {
        if (item.status === value) {
          dadosFiltrados.push(item);
        }
      });
    } else if (type === FILTRO_HOJE) {
      DATA.map(function (item) {
        if (item.dataReserva === value) {
          dadosFiltrados.push(item);
        }
      });
    } else if (type === FILTRO_AMANHA) {
      DATA.map(function (item) {
        if (item.dataReserva === value) {
          dadosFiltrados.push(item);
        }
      });
    } else if (type === FILTRO_DEFAULT) {
      DATA.map(function (item) {
        dadosFiltrados.push(item);
      });
    }
    return dadosFiltrados;
  }

  function defineFiltro(type: string, value: string, modal: boolean) {
    if (modal) {
      setFiltro({ type: type, value: value });
      setMostrarModalFiltros(false);
    } else {
      setFiltro({ type: type, value: value });
    }
  }

  setTimeout(() => {
    setCarregando(false);
  }, 1000);

  return (
    <View style={styles.container}>
      <Circles />
      <Modal
        animationType="slide"
        transparent={true}
        visible={mostrarModalFiltros}
      >
        <View style={styles.modalContainer}>
          <View style={styles.conteudoModalContainer}>
            <TouchableOpacity
              style={styles.botaoFecharModal}
              onPress={() => setMostrarModalFiltros(false)}
            >
              <AntDesign name="close" size={24} color={Palette.black} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.botaoModal}
              key={0}
              onPress={() =>
                defineFiltro(FILTRO_STATUS, STATUS_RESERVADO, true)
              }
            >
              <View
                style={{ ...styles.status, backgroundColor: Palette.green }}
              ></View>
              <Text style={styles.textoBotaoModal}>Reservado</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.botaoModal}
              key={1}
              onPress={() => defineFiltro(FILTRO_STATUS, STATUS_PENDENTE, true)}
            >
              <View
                style={{ ...styles.status, backgroundColor: Palette.orange }}
              ></View>
              <Text style={styles.textoBotaoModal}>Pendente</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <FAB
        style={styles.fab}
        small
        icon="plus"
        onPress={() => console.log("Pressed")}
        color={Palette.green}
      />

      <View style={styles.headerContainer}>
        <Text style={styles.textoHeader}>Solicitações de Reserva</Text>
        <ScrollView
          style={styles.scrollContainer}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          <View style={styles.filtroContainer}>
            <TouchableOpacity
              style={styles.botaoFiltro}
              onPress={() => setMostrarModalFiltros(true)}
            >
              <Text style={styles.textoBotaoFiltro}>Status</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.botaoFiltro}
              onPress={() => defineFiltro(FILTRO_HOJE, DATA_HOJE, false)}
            >
              <Text style={styles.textoBotaoFiltro}>Hoje</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.botaoFiltro}
              onPress={() => defineFiltro(FILTRO_AMANHA, DATA_AMANHA, false)}
            >
              <Text style={styles.textoBotaoFiltro}>Amanhã</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.botaoFiltro}
              onPress={() => defineFiltro(FILTRO_DEFAULT, "", false)}
            >
              <Text style={styles.textoBotaoFiltro}>Limpar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      <SafeAreaView style={styles.flatlistContainer}>
        {carregando ? (
          <ActivityIndicator size={36} color={Palette.green} />
        ) : (
          <FlatList
            data={filtroRetornDados(filtro.type, filtro.value)}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            extraData={selectedId}
            showsVerticalScrollIndicator={false}
          />
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Palette.white,
    position: "relative",
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
  textoHeader: {
    fontFamily: Fonts.lato_bold,
    fontSize: 22,
    color: Palette.green,
    marginVertical: 10,
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

  /* FILTRO */
  scrollContainer: {
    width: screenWidth - 50,
  },
  filtroContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  botaoFiltro: {
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: 30,
    marginHorizontal: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "rgba(58, 51, 53, 0.5)",
  },
  textoBotaoFiltro: {
    fontFamily: Fonts.lato_bold,
    fontSize: 16,
    color: "rgba(58, 51, 53, 0.7)",
  },
  botaoFiltroSelecionado: {
    backgroundColor: Palette.green,
    color: Palette.white,
  },

  /* Item */
  item: {
    width: screenWidth - 100,
    padding: 10,
    marginVertical: 8,
    borderWidth: 1,
    borderRadius: 10,
  },
  itemContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  conteudoItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
  },
  title: {
    fontFamily: Fonts.lato_regular,
    fontSize: 18,
    color: Palette.black,
  },
  status: {
    width: 12,
    height: 12,
    marginLeft: 10,
    borderRadius: 10,
  },

  /* Modal */
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    position: "relative",
  },
  conteudoModalContainer: {
    width: screenWidth,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Palette.white,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 40,
    position: "absolute",
    bottom: 0,
  },
  botaoModal: {
    flexDirection: "row",
    width: screenWidth - 150,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 4,
  },
  textoBotaoModal: {
    fontFamily: Fonts.lato_bold,
    fontSize: 18,
    marginHorizontal: 20,
    color: Palette.black,
  },
  botaoFecharModal: {
    position: "absolute",
    top: 0,
    right: 0,
    padding: 20,
  },

  fab: {
    position: "absolute",
    margin: 25,
    right: 0,
    top: 50,
    backgroundColor: Palette.white,
  },
});
