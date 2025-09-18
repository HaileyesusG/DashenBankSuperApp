import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import { useRouter } from "expo-router";
import Header from "../components/BackButton";
const { width } = Dimensions.get("window");
import FixedButton from "../components/FixedButton";
import DetailRow from "../components/DetailRow";
const keyWidth = (width * 0.8 - 20) / 3; // 80% of screen, minus small gaps
import { useLocalSearchParams } from "expo-router";

export default function ConfirmTransferScreen() {
  const { amount, accountNumber,clientNumber,receipientName,name } = useLocalSearchParams();
  const [modalVisible, setModalVisible] = useState(false);
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false); // 👈 NEW STATE
  const redirect = useRouter();


// Reusable function to redirect
const proceedToNextPage = () => {
  redirect.push({
    pathname: "/PinConfirmation",
    params: {
      amount,
      accountNumber,
      clientNumber,
      receipientName,
    },
  });
};

    const formatAmount = (value) => {
    let numericValue = value.replace(/[^0-9.]/g, "");
    let parts = numericValue.split(".");
    // 👇 use dot instead of comma
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return parts.join(".");
  };

  return (
    <View style={styles.container}>
      {/* Header */}
            <View style={styles.headerWrapper}>
              <Header title="Confirm Transfer" />
            </View>
      {/* Scrollable content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image
          source={require("../assets/images/ReceiptTick.png")}
          style={styles.icon}
        />
        <Text style={styles.confirmText}>Confirm Transfer</Text>
        <Text style={styles.amountText}>
  {Number(amount).toLocaleString()} Birr
</Text>

        <Text style={styles.sectionTitle}>Transaction Details</Text>
<View style={styles.detailsBox}>
  <DetailRow label="Sender Account:" value="Abebe Ayele Girma" />
  <DetailRow label="Recipient Account:" value={clientNumber} />
  <DetailRow label="Recipient Name:" value={receipientName} />
  <DetailRow label="Budget Type:" value={name} />
  <DetailRow label="Fee:" value="0.00 ETB" />
  <DetailRow
    label="Total:"
    value={`${formatAmount(amount)} ETB`}
    isTotal={true}
  />
</View>

        <Text style={styles.reasonText}>Reason</Text>
        <View style={styles.cylinder}>
          <Text style={styles.cylinderText}>Transfer</Text>
        </View>
      </ScrollView>

      
      {/* Sticky Buttons */}
      <View style={styles.buttonContainer}>
        <FixedButton
                  title="Confirm"
                  onPress={proceedToNextPage} // 👈 Open Tip Modal
                  containerStyle={{
                    marginBottom: 0,
                    marginTop: 5,
                    backgroundColor: "transparent",
                  }}
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
  row: { flexDirection: "row", justifyContent: "space-between" },
  label: { fontSize: 14, fontWeight: "400", color: "#505050" },
  label2: { fontSize: 14, fontWeight: "800", color: "#505050" },
  value: { fontSize: 16, fontWeight: "800", color: "#000" },
  reasonText: {
    alignSelf: "flex-start",
    fontSize: 14,
    fontWeight: "400",
    color: "#000",
    marginBottom: 8,
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
    marginBottom:10
  },
  confirmButton: {
    width: "100%",
    height: 56,
    borderRadius: 32,
    backgroundColor: "#012169",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  confirmButtonText: { color: "#fff", fontSize: 16, fontWeight: "700" },
  cancelButton: {
    fontSize: 16,
    fontWeight: "500",
    color: "#131C66",
    textAlign: "center",
    marginBottom: 5,
  },

  // Dim overlay on top of blur
  dimOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
  },

  // Modal
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalBox: {
    width: "100%",
    height: "92%",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: "#fff",
    alignSelf: "center",
  },
  closeBtn: {
    width: 30, height: 30, tintColor: '#131C66', marginLeft:"90%"
  },
  modalTitle: {
    fontSize: 30,
    fontWeight: "900",
    color: "#000",
    textAlign: "center",
    marginTop: 60,
  },
  modalSubtitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#00000066",
    textAlign: "center",
    marginVertical: 8,
  },

  pinRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginVertical: 12,
  },
  pinBox: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: "#F0F0F0",
    justifyContent: "center",
    alignItems: "center",
  },
  pinText: { fontSize: 20, fontWeight: "700", color: "#000" },
  showPin: {
    fontSize: 16,
    fontWeight: "800",
    color: "#012169",
    textAlign: "center",
    marginTop: 15,
  },
    headerWrapper: {
    paddingBottom: 8,
    marginBottom: 8,
    marginTop: 30,
    marginLeft: 20,
  },

  fingerprintBox: { alignItems: "center", marginVertical: 30 },

  keyboard: {
    width: "100%",
    height: "45%",
    backgroundColor: "#EFEFEF",
    alignItems: "center",
    paddingTop: 14.99,
    marginTop: 18,
  },

  keypadBox: {
    width: "auto",
    height: 200,
    justifyContent: "space-between",
    marginRight: 5,
  },
  keyRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 9.99,
  },

  keyBtn: {
    width: 118,
    height: 60,
    borderRadius: 7.49,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 1,
    marginHorizontal: 8,
  },
  keyText: { fontSize: 20, fontWeight: "700", color: "#000" },
  confirmKey: { backgroundColor: "#012169" },
  backKey: { backgroundColor: "#E7E7E7" },
});
