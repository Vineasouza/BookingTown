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
import moment from "moment";
import { AntDesign } from "@expo/vector-icons";

import Circles from "../../components/styles/circles2";
import { Palette, Fonts } from "../../styles/";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const STATUS_RESERVADO = "Reservado";
const STATUS_PENDENTE = "Pendente";
const STATUS_CANCELADO = "Cancelado";
const STATUS_CONCLUIDO = "Concluído";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    ambiente: "Churrasqueira",
    solicitante: "Jorginho",
    nApartamento: 121,
    dataReserva: moment().format("DD" + "/MM" + "/YYYY"),
    status: STATUS_CANCELADO,
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    ambiente: "Salão de festas",
    solicitante: "Alberto",
    nApartamento: 122,
    dataReserva: moment().format("DD" + "/MM" + "/YYYY"),
    status: STATUS_CONCLUIDO,
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    ambiente: "Salão Gourmet",
    solicitante: "Roberta",
    nApartamento: 123,
    dataReserva: moment().format("DD" + "/MM" + "/YYYY"),
    status: STATUS_CONCLUIDO,
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d724",
    ambiente: "Churrasqueira",
    solicitante: "Rafaela",
    nApartamento: 124,
    dataReserva: moment()
      .add("1", "day")
      .format("DD" + "/MM" + "/YYYY"),
    status: STATUS_CANCELADO,
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
    if (status === STATUS_CONCLUIDO || status === STATUS_CANCELADO) {
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
    </View>
  </TouchableOpacity>
);

export default function historico() {
  const [carregando, setCarregando] = useState(true);
  const [selectedId, setSelectedId] = useState(null);

  function filtroItems() {
    const dadosFiltrados: any[] = [];

    DATA.map(function (item) {
      if (
        item.status === STATUS_CANCELADO ||
        item.status === STATUS_CONCLUIDO
      ) {
        dadosFiltrados.push(item);
      }
    });

    return dadosFiltrados;
  }

  const renderItem = ({ item }) => {
    return <Item item={item} onPress={() => null} />;
  };

  setTimeout(() => {
    setCarregando(false);
  }, 1000);

  return (
    <View style={styles.container}>
      <Circles />
      <View style={styles.headerContainer}>
        <Text style={styles.textoHeader}>Histórico de Reserva</Text>
      </View>
      <SafeAreaView style={styles.flatlistContainer}>
        {carregando ? (
          <ActivityIndicator size={36} color={Palette.green} />
        ) : (
          <FlatList
            data={filtroItems()}
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
    height: screenHeight / 1.85,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginTop: 10,
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
});
