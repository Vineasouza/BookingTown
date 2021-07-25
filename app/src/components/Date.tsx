import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableNativeFeedback,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import "moment/locale/pt-br";

import { Palette, Fonts } from "../styles";

interface DateProps {
  data: any;
  setData: any;
}

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function Date({ data, setData }: DateProps) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dateDisplay, setDateDisplay] = useState(moment(data).clone());
  const navigation = useNavigation();
  let rippleColor: string, rippleOverflow: boolean, rippleRadius: number;

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: any) => {
    setDateDisplay(date);
    setData(date);
    hideDatePicker();
  };

  return (
    <View style={styles.container}>
      {/* WARNING ISSUE https://github.com/mmazzarolo/react-native-modal-datetime-picker/issues/502 */}
      <TouchableNativeFeedback
        onPress={() => showDatePicker()}
        background={TouchableNativeFeedback.Ripple(
          (rippleColor = "rgba(58, 51, 53, 0.1)"),
          (rippleOverflow = false),
          (rippleRadius = 100)
        )}
      >
        <View style={styles.botaoDataContainer}>
          <View style={styles.botaoData}>
            <Text style={styles.textoData}>
              {moment(dateDisplay).format("DD")}
            </Text>
          </View>
          <View style={styles.botaoData}>
            <Text style={{ ...styles.textoData, textTransform: "capitalize" }}>
              {moment(dateDisplay).format("MMM")}
            </Text>
          </View>
          <View style={styles.botaoData}>
            <Text style={styles.textoData}>
              {moment(dateDisplay).format("YYYY")}
            </Text>
          </View>
        </View>
      </TouchableNativeFeedback>
      <DateTimePickerModal
        mode="date"
        isVisible={isDatePickerVisible}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        onDateChange={setData}
        // minimumDate={new Date()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},

  textoData: {
    fontFamily: Fonts.lato_bold,
    fontSize: 24,
    color: Palette.black,
  },

  botaoDataContainer: {
    width: screenWidth - 100,
    justifyContent: "center",
    flexDirection: "row",
    alignSelf: "center",
    margin: 20,
  },
  botaoData: {
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "rgba(58, 51, 53, 0.5)",
    width: 68,
    height: 44,
  },
});
