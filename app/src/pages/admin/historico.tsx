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

import { useDispatch, useSelector } from "react-redux";
import { listarTodasReservas } from "../../actions/reservasActions";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const STATUS_RESERVADO = "Reservado";
const STATUS_PENDENTE = "Pendente";
const STATUS_CANCELADO = "Cancelado";
const STATUS_CONCLUIDO = "Concluído";

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
          <Text style={{ ...styles.title }}>{item.nomeAmbiente}</Text>
        </View>
        <View style={styles.conteudoItem}>
          <Text style={{ ...styles.title, fontFamily: Fonts.lato_bold }}>
            Solicitante:{" "}
          </Text>
          <Text style={{ ...styles.title }}>{item.nomeMorador}</Text>
          <Text style={{ ...styles.title, fontFamily: Fonts.lato_bold }}>
            {"\t"}Apt:{" "}
          </Text>
          <Text style={{ ...styles.title }}>{item.aptMorador}</Text>
        </View>
        <View style={styles.conteudoItem}>
          <Text style={{ ...styles.title, fontFamily: Fonts.lato_bold }}>
            Data da reserva:{" "}
          </Text>
          <Text style={{ ...styles.title }}>{item.data}</Text>
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

  const dispatch = useDispatch();
  const reservas = useSelector((state: any) => state.reservas);

  const carregarReservas = async () => {
    setCarregando(true);
    await dispatch(listarTodasReservas());
    setCarregando(false);
  };

  useEffect(() => {
    carregarReservas();
  }, []);

  function filtroItems() {
    const dadosFiltrados: any[] = [];

    reservas.map(function (item: any) {
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
