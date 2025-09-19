import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import { Dimensions } from "react-native";
import { useRouter } from "expo-router";
import Header from "../components/BackButton";
const { width } = Dimensions.get("window");
import FixedButton from "../components/FixedButton";
import DetailRow from "../components/DetailRow";
import { useLocalSearchParams } from "expo-router";
import PinModal from "../components/PinModal";

const keyWidth = (width * 0.8 - 20) / 3; // kept from original

export default function ConfirmTransferScreen() {
  const { amount, accountNumber, clientNumber, receipientName, name } = useLocalSearchParams();
  const [modalVisible, setModalVisible] = useState(false);
  const redirect = useRouter();

  const proceedToNextPage = (enteredPin) => {
    console.log("PIN entered:", enteredPin);
    setModalVisible(false);

    redirect.push({
      pathname: "SendMoney",
      params: {
        amount,
        accountNumber,
        clientNumber,
        receipientName,
      },
    });
  };

  const formatAmount = (value) => {
    let numericValue = String(value).replace(/[^0-9.]/g, "");
    let parts = numericValue.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return parts.join(".");
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <Header title="Confirm Transfer" />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image source={require("../assets/images/receipt.png")} style={styles.icon} />
        <Text style={styles.confirmText}>Confirm Transfer</Text>
        <Text style={styles.amountText}>{Number(amount).toLocaleString()} Birr</Text>

        <Text style={styles.sectionTitle}>Transaction Details</Text>
        <View style={styles.detailsBox}>
          <DetailRow label="Sender Account:" value="Abebe Ayele Girma" />
          <DetailRow label="Recipient Account:" value={clientNumber} />
          <DetailRow label="Recipient Name:" value={receipientName} />
          <DetailRow label="Budget Type:" value={name} />
          <DetailRow label="Fee:" value="0.00 ETB" />
          <DetailRow label="Total:" value={`${formatAmount(amount)} ETB`} isTotal={true} />
        </View>

        <Text style={styles.reasonText}>Reason</Text>
        <View style={styles.cylinder}>
          <Text style={styles.cylinderText}>Transfer</Text>
        </View>
      </ScrollView>

      <PinModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={(pin) => proceedToNextPage(pin)}
        blurSource={require("../assets/images/blur.png")}
      />

      <View style={styles.buttonContainer}>
        <FixedButton
          title="Confirm"
          onPress={() => setModalVisible(true)}
          containerStyle={{ marginBottom: 0, marginTop: 5, backgroundColor: "transparent" }}
          buttonStyle={{ backgroundColor: "#003366" }}
        />

        <TouchableOpacity>
          <Text style={styles.cancelButton}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scrollContent: {
    paddingTop: 40,
    alignItems: "center",
    paddingHorizontal: 16,
  },
  icon: { width: 140, height: 140, resizeMode: "contain", marginBottom: 16 },
  confirmText: {
    fontSize: 20,
    fontWeight: "900",
    color: "#202226",
    marginBottom: 8,
  },
  amountText: {
    fontSize: 32,
    fontWeight: "900",
    color: "#131C66",
    marginBottom: 24,
  },
  sectionTitle: {
    alignSelf: "flex-start",
    fontSize: 14,
    fontWeight: "400",
    color: "#000",
    marginBottom: 8,
  },
  detailsBox: {
    width: "100%",
    borderRadius: 16,
    backgroundColor: "#F0F0F0",
    paddingVertical: 16,
    paddingHorizontal: 12,
    gap: 25,
    marginBottom: 16,
  },
  reasonText: {
    alignSelf: "flex-start",
    fontSize: 14,
    fontWeight: "400",
    color: "#000",
    marginBottom: 8,
  },
  closeBtn: {
    width: 30,
    height: 30,
    tintColor: "#131C66",
    marginLeft: "87%",
  },
  cylinder: {
    width: "100%",
    height: 56,
    borderRadius: 24,
    backgroundColor: "#F0F0F0",
    justifyContent: "center",
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  cylinderText: { fontSize: 16, fontWeight: "500", color: "#000" },
  buttonContainer: {
    padding: 16,
    borderTopColor: "#E0E0E0",
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  cancelButton: {
    fontSize: 16,
    fontWeight: "500",
    color: "#131C66",
    textAlign: "center",
    marginBottom: 5,
  },
  headerWrapper: {
    paddingBottom: 8,
    marginBottom: 8,
    marginTop: 30,
    marginLeft: 20,
  },
});