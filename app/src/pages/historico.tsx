import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

import Circles from "../components/styles/circles2";
import { Palette, Fonts } from "../styles/";
import moment from "moment";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    ambiente: "Churrasqueira",
    dataReserva: moment().format("DD" + "/MM" + "/YYYY"),
    status: "Reservado",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    ambiente: "Salão de festas",
    dataReserva: moment().format("DD" + "/MM" + "/YYYY"),
    status: "Pendente",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    ambiente: "Salão Gourmet",
    dataReserva: moment().format("DD" + "/MM" + "/YYYY"),
    status: "Cancelado",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d724",
    ambiente: "Churrasqueira",
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

export default function historico() {
  const navigation = useNavigation();
  const [selectedId, setSelectedId] = useState(null);
  const [carregando, setCarregando] = useState(true);

  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
        onPress={() => navigation.navigate("DetalhesReserva", { item: item })}
      />
    );
  };

  setTimeout(() => {
    setCarregando(false);
  }, 1000);

  return (
    <View style={styles.container}>
      <Circles />
      <View style={styles.headerContainer}>
        <Text style={styles.textoHeader}>Reservas</Text>
      </View>
      <SafeAreaView style={styles.flatListContainer}>
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
  },
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
    fontSize: 28,
    color: Palette.green,
  },
  flatListContainer: {
    width: screenWidth,
    height: screenHeight / 1.8,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },

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
