import React, { useRef, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
} from "react-native";
import Header from "../components/BackButton";
import { useLocalSearchParams } from "expo-router";
const { width: SCREEN_WIDTH } = Dimensions.get("window");
import { useRouter } from "expo-router";
export default function PinConfirmation() {
  const { amount, accountNumber, clientNumber, receipientName } =
    useLocalSearchParams();
  const [pin, setPin] = useState(["", "", "", ""]);
  const inputsRef = [useRef(null), useRef(null), useRef(null), useRef(null)];
 const redirect = useRouter();
  const onKeyPress = (key) => {
    if (key === "back") {
      const idx = pin.findIndex((p) => p === "");
      let target = idx === -1 ? 3 : Math.max(0, idx - 1);
      const newPin = [...pin];
      newPin[target] = "";
      setPin(newPin);
      inputsRef[target].current?.focus?.();
      return;
    }

    if (key === ".-") return;

    const firstEmpty = pin.findIndex((p) => p === "");
    if (firstEmpty === -1) return;
    const newPin = [...pin];
    newPin[firstEmpty] = String(key).slice(0, 1);
    setPin(newPin);
    const next = Math.min(3, firstEmpty + 1);
    inputsRef[next].current?.focus?.();
  };

  const onChangeTextAt = (text, idx) => {
    const value = text.slice(-1);
    const newPin = [...pin];
    newPin[idx] = value;
    setPin(newPin);
    if (value !== "") {
      const next = Math.min(3, idx + 1);
      inputsRef[next].current?.focus?.();
    }
  };

  const handleBoxPress = (idx) => {
    inputsRef[idx].current?.focus?.();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      {/* Header */}
                  <View style={styles.headerWrapper}>
                    <Header title="PIN Confirmation" />
                  </View>

      <View style={{ height: 18 }} />

      <View style={styles.logoWrap}>
        <Image source={require("../assets/images/Lock.png")} style={styles.logo} resizeMode="contain" />
      </View>

      <View style={styles.instructionWrap}>
        <Text style={styles.instructionText}>
          {"Please enter your "}
          <Text style={styles.pinHighlight}>{"PIN"}</Text>
          {" for confirmation"}
        </Text>
      </View>

      <View style={styles.amountWrap}>
        <Text style={styles.amountText}>
          <Text style={styles.amountWhiteSpace}>{" "}</Text>
          {amount+" ETB"}
        </Text>
      </View>

      <View style={styles.pinRow}>
        {pin.map((p, idx) => (
          <TouchableOpacity key={idx} onPress={() => handleBoxPress(idx)} activeOpacity={0.8}>
            <View style={styles.pinBox}>
              <Text style={styles.pinBoxText}>{p === "" ? "-" : p}</Text>
            </View>
            <TextInput
  ref={inputsRef[idx]}
  style={styles.hiddenInput}
  keyboardType="number-pad"
  maxLength={1}
  onChangeText={(text) => onChangeTextAt(text, idx)}
  value={pin[idx]}
  caretHidden={true}
  placeholder={"-"}
  placeholderTextColor="#000"
  showSoftInputOnFocus={false} // 🚀 prevents system keyboard
/>

          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.keyboardArea}>
        <View style={styles.keypadGrid}>
          {/* 1-9 arranged in rows */}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n, index) => (
            <TouchableOpacity key={n} style={styles.key} onPress={() => onKeyPress(n)}>
              <Text style={styles.keyText}>{String(n)}</Text>
            </TouchableOpacity>
          ))}

          {/* .- , 0 , back */}
          <TouchableOpacity style={[styles.key, styles.keyGray]} onPress={() => onKeyPress('.-')}>
            <Text style={styles.keyText}>{".-"}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.key} onPress={() => onKeyPress(0)}>
            <Text style={styles.keyText}>{"0"}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.key, styles.keyGray]} onPress={() => onKeyPress('back')}>
            <Text style={styles.keyText}>{"⌫"}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.confirmButton} activeOpacity={0.8} onPress={()=>  redirect.push({
    pathname: "SendMoney",
    params: {
      amount,
      accountNumber,
      clientNumber,
      receipientName,
    },
  })}>
          <Text style={styles.confirmButtonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  backButton: {
    padding: 8,
  },
  backArrow: {
    fontSize: 20,
    color: "#000",
  },
  headerTitle: {
    fontSize: 18,
    marginLeft: 12,
    fontWeight: "700",
  },
  logoWrap: {
    alignItems: "center",
    marginTop: 8,
  },
  logo: {
    width: 148,
    height: 148,
  },
  instructionWrap: {
    marginTop: 12,
    alignItems: "center",
  },
  instructionText: {
    width: 288,
    height: 19,
    fontSize: 14,
    fontWeight: "350",
    fontStyle: "normal",
    textAlign: "center",
    color: "#000000",
  },
      headerWrapper: {
    paddingBottom: 8,
    marginBottom: 8,
    marginTop: 30,
    marginLeft: 20,
  },
  pinHighlight: {
    fontWeight: "800",
    fontSize: 14,
    color: "#012169",
  },
  amountWrap: {
    marginTop: 8,
    alignItems: "center",
  },
  amountText: {
    width: "auto",
    height: 38,
    fontSize: 32,
    fontWeight: "900",
    color: "#131C66",
    textAlign: "center",
  },
  amountWhiteSpace: {
    fontWeight: "700",
    fontSize: 32,
  },
  pinRow: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
  },
  pinBox: {
    width: 60,
    height: 57,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DDDDDD",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: "#fff",
  },
  pinBoxText: {
    fontSize: 24,
    fontWeight: "800",
    height: 33,
    width: 15,
    color: "#000000",
    textAlign: "center",
  },
  hiddenInput: {
    position: "absolute",
    width: 1,
    height: 1,
    opacity: 0,
  },
  keyboardArea: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "40%",
    backgroundColor: "#EFEFEF",
    flexDirection: "row",
    paddingTop: 15,
    paddingHorizontal: 16,
  },
  keypadGrid: {
    width: 265,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginLeft:-4
  },
  key: {
    width: 85,
    height: 60,
    borderRadius: 7.49,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
    // shadow for iOS
    shadowColor: "#00000040",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  keyGray: {
    backgroundColor: "#E7E7E7",
  },
  keyText: {
    fontSize: 20,
    fontWeight: "700",
  },
  confirmButton: {
    width: "27%",
    height: 269,
    marginLeft: 8,
    borderRadius: 8,
    backgroundColor: "#012169",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 22,
    marginTop:8
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#FFFFFF",
    textAlign: "center",
  },
});
