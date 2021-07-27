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
  TouchableNativeFeedback,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import { AntDesign } from "@expo/vector-icons";
import { FAB, Portal, Provider } from "react-native-paper";

import Circles from "../../components/styles/circles2";
import { Palette, Fonts } from "../../styles/";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    ambiente: "Churrasqueira",
    solicitante: "Jorginho",
    dataReserva: moment().format("DD" + "/MM" + "/YYYY"),
    status: "Reservado",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    ambiente: "Salão de festas",
    solicitante: "Alberto",
    dataReserva: moment().format("DD" + "/MM" + "/YYYY"),
    status: "Pendente",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    ambiente: "Salão Gourmet",
    solicitante: "Roberta",
    dataReserva: moment().format("DD" + "/MM" + "/YYYY"),
    status: "Cancelado",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d724",
    ambiente: "Churrasqueira",
    solicitante: "Rafaela",
    dataReserva: moment().format("DD" + "/MM" + "/YYYY"),
    status: "Concluído",
  },
];

function Status(status: string) {
  if (status === "Reservado") {
    return (
      <View style={{ ...styles.status, backgroundColor: Palette.green }}></View>
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
    if (status === "Concluído") {
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
  const [mostraOpcoes, setMostraOpcoes] = useState(true);
  const [filtro, setFiltro] = useState("");

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
            <TouchableOpacity style={styles.botaoModal}>
              <View
                style={{ ...styles.status, backgroundColor: Palette.green }}
              ></View>
              <Text style={styles.textoBotaoModal}>Pendente</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botaoModal}>
              <View
                style={{ ...styles.status, backgroundColor: Palette.orange }}
              ></View>
              <Text style={styles.textoBotaoModal}>Reservado</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botaoModal}>
              <View
                style={{ ...styles.status, backgroundColor: Palette.red }}
              ></View>
              <Text style={styles.textoBotaoModal}>Cancelado</Text>
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
        <View style={styles.filtroContainer}>
          <TouchableOpacity
            style={styles.botaoFiltro}
            onPress={() => setMostrarModalFiltros(true)}
          >
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
      <SafeAreaView style={styles.flatlistContainer}>
        {carregando ? (
          <ActivityIndicator size={36} color={Palette.green} />
        ) : (
          <FlatList
            data={DATA}
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
