import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import firebase from "firebase";
import { listarAmbiente } from "../../actions";

import Circles from "../../components/styles/circles2";
import { Palette, Fonts } from "../../styles";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const Item = ({ item, onPress }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item]}>
    <View style={styles.itemContainer}>
      <View style={styles.itemSquare}>
        <MaterialCommunityIcons name="party-popper" size={24} color="black" />
      </View>
      <Text style={{ ...styles.title }}>{item.nome}</Text>
      <AntDesign name="right" size={24} color={Palette.black} />
    </View>
  </TouchableOpacity>
);

export default function home() {
  const dispatch = useDispatch();
  /* Renderiza lista de ambientes */
  const ambientes = useSelector((state: any) => state.ambiente);
  const carregarListaDeEspacos = async () => {
    setCarregando(true);
    await dispatch(listarAmbiente());
    setCarregando(false);
  };

  useEffect(() => {
    carregarListaDeEspacos();
  }, []);

  const navigation = useNavigation();
  const [selectedId, setSelectedId] = useState(null);
  const [carregando, setCarregando] = useState(true);

  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
        onPress={() => navigation.navigate("Reservar", { label: item })}
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
        <Text style={styles.textoHeader}>Qual ambiente deseja reservar?</Text>
      </View>
      <SafeAreaView style={styles.flatListContainer}>
        {carregando ? (
          <ActivityIndicator size={36} color={Palette.green} />
        ) : (
          <FlatList
            data={ambientes}
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
