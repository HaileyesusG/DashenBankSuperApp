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
const { width } = Dimensions.get("window");
const keyWidth = (width * 0.8 - 20) / 3; // 80% of screen, minus small gaps
import { useLocalSearchParams } from "expo-router";

export default function ConfirmTransferScreen() {
  const { amount, accountNumber,clientNumber,receipientName } = useLocalSearchParams();
  const [modalVisible, setModalVisible] = useState(false);
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false); // 👈 NEW STATE
  const redirect = useRouter();

  const handleKeyPress = (val) => {
    if (val === "back") {
      setPin(pin.slice(0, -1));
    } else if (val === "confirm") {
      console.log("PIN entered:", pin);
      setModalVisible(false);
      setPin("");

      redirect.push({
      pathname: "SendMoney",
      params: {
        amount:amount,
        accountNumber:accountNumber,
        clientNumber:clientNumber,
        receipientName:receipientName
      },
    })
    } else {
      if (pin.length < 6) {
        setPin(pin + val);
      }
    }
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
      {/* Scrollable content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image
          source={require("../assets/images/receipt.png")}
          style={styles.icon}
        />
        <Text style={styles.confirmText}>Confirm Transfer</Text>
        <Text style={styles.amountText}>
  {Number(amount).toLocaleString()} Birr
</Text>

        <Text style={styles.sectionTitle}>Transaction Details</Text>
        <View style={styles.detailsBox}>
          <View style={styles.row}>
            <Text style={styles.label}>Sender Account:</Text>
            <Text style={styles.value}>Abebe Ayele Girma</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Recipient Account:</Text>
            <Text style={styles.value}>{clientNumber}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Recipient Name:</Text>
            <Text style={styles.value}>{receipientName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Budget Type:</Text>
            <Text style={styles.value}>Off Budget</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Fee:</Text>
            <Text style={styles.value}>0.00 ETB</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label2}>Total:</Text>
            <Text style={styles.value}>{formatAmount(amount)} ETB</Text>
          </View>
        </View>

        <Text style={styles.reasonText}>Reason</Text>
        <View style={styles.cylinder}>
          <Text style={styles.cylinderText}>Transfer</Text>
        </View>
      </ScrollView>

      {/* Sticky Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.confirmButtonText}>Confirm</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.cancelButton}>Cancel</Text>
        </TouchableOpacity>
      </View>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        {/* Background blur image */}
        <ImageBackground
          source={require("../assets/images/blur.png")}
          style={StyleSheet.absoluteFill}
          resizeMode="cover"
        >
          {/* Optional dim overlay */}
          <View style={styles.dimOverlay} />

          {/* Modal content */}
          <View style={styles.modalOverlay}>
            <View style={styles.modalBox}>
              {/* Close Button */}
              
                <TouchableOpacity
  
  onPress={() => setModalVisible(false)}
>
    <Image
    source={require('../assets/images/Close.png')} // local image
    style={styles.closeBtn} 
    resizeMode="contain"
  />
</TouchableOpacity>
              
             

              {/* Title */}
              <Text style={styles.modalTitle}>Please Verify!</Text>
              <Text style={styles.modalSubtitle}>
                Enter Your PIN to confirm the transfer.
              </Text>

              {/* PIN Fields */}
              <View style={styles.pinRow}>
                {[...Array(6)].map((_, i) => (
                  <View key={i} style={styles.pinBox}>
                    <Text style={styles.pinText}>
                      {pin[i] ? (showPin ? pin[i] : "•") : ""}
                    </Text>
                  </View>
                ))}
              </View>

              {/* Toggle Show/Hide PIN */}
              <TouchableOpacity onPress={() => setShowPin(!showPin)}>
                <Text style={styles.showPin}>
                  {showPin ? "Hide PIN" : "Show PIN"}
                </Text>
              </TouchableOpacity>

              {/* Fingerprint */}
<View style={styles.fingerprintBox}>
  <Image
    source={require('../assets/images/Finger.png')} // local image
    style={{ width: 44, height: 44, tintColor: '#131C66' }} 
    resizeMode="contain"
  />
</View>


              {/* Keyboard */}
              <View style={styles.keyboard}>
                <View style={styles.keypadBox}>
                  {[
                    ["1", "2", "3"],
                    ["4", "5", "6"],
                    ["7", "8", "9"],
                    ["back", "0", "confirm"],
                  ].map((row, idx) => (
                    <View key={idx} style={styles.keyRow}>
                      {row.map((key) => (
                        <TouchableOpacity
                          key={key}
                          style={[
                            styles.keyBtn,
                            key === "confirm" && styles.confirmKey,
                            key === "back" && styles.backKey,
                          ]}
                          onPress={() => handleKeyPress(key)}
                        >
                          {key === "confirm" ? (
                            <Ionicons
                              name="arrow-forward"
                              size={28}
                              color="#fff"
                            />
                          ) : key === "back" ? (
                            <Image
  source={require("../assets/images/Back.png")} // replace with your image path
  style={{ width: 28, height: 28, tintColor: "#000" }} // keep same size and color if needed
  resizeMode="contain"
/>
                          ) : (
                            <Text style={styles.keyText}>{key}</Text>
                          )}
                        </TouchableOpacity>
                      ))}
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
      </Modal>
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
  closeBtn: {
    width: 30, height: 30, tintColor: '#131C66'
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
    height: "85%",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: "#fff",
    alignSelf: "center",
  },
  closeBtn: { position: "absolute", top: 30, right: 20 },
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
