import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Linking,
  Alert,
  TouchableOpacity,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import FixedButton from "../components/FixedButton";
import { useRouter } from "expo-router";

export default function QRScanner() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const router = useRouter();

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>We need your permission to use the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  const parseBankingInfo = (raw) => {
    const obj = {};

    // 1) Try JSON first
    try {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object") {
        if (parsed.name) obj.name = String(parsed.name).trim();
        if (parsed.account) obj.account = String(parsed.account).trim();
        if (parsed.bank) obj.bank = String(parsed.bank).trim();
        if (parsed.amount) obj.amount = String(parsed.amount).trim();
        return obj;
      }
    } catch (e) {}

    // 2) Try key:value or key=value pairs
    const pairDelim = /[;\n,]+/;
    if (raw.includes(":") || raw.includes("=")) {
      const pairs = raw.split(pairDelim);
      pairs.forEach((p) => {
        const kv = p.split(/[:=]/).map((s) => s.trim());
        if (kv.length >= 2) {
          const key = kv[0].toLowerCase();
          const value = kv.slice(1).join(":").trim();
          if (key.includes("name")) obj.name = value;
          if (key.includes("account") || key.includes("acct") || key.includes("acc"))
            obj.account = value;
          if (key.includes("bank")) obj.bank = value;
          if (key.includes("amount") || key.includes("amt")) obj.amount = value;
        }
      });
      if (obj.name || obj.account || obj.amount) return obj;
    }

    // 3) Loose regex fallback
    const accMatch = raw.match(/([0-9][0-9\-\s]{6,})/);
    if (accMatch) obj.account = accMatch[1].replace(/\s|-/g, "");
    const nameMatch = raw.match(/([A-Za-zÀ-ÖØ-öø-ÿ'`\.]+\s+[A-Za-zÀ-ÖØ-öø-ÿ'`\.]+)/);
    if (nameMatch) obj.name = nameMatch[1].trim();
    const amtMatch = raw.match(/([0-9]{1,3}(?:[.,][0-9]{3})*(?:\.[0-9]{1,2})?)/);
    if (amtMatch) obj.amount = amtMatch[1];

    return obj;
  };

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);

    if (data.startsWith("http://") || data.startsWith("https://")) {
      Linking.openURL(data).catch(() => {
        Alert.alert("Error", "Could not open the scanned URL.");
        setScanned(false);
      });
      return;
    }

    const info = parseBankingInfo(data || "");
    const name = info.name ?? "Not found";
    const account = info.account ?? "Not found";
    const bank = info.bank ?? null;
    const amount = info.amount ?? null;

    let message = `Name: ${name}\nAccount: ${account}`;
    if (bank) message += `\nBank: ${bank}`;
    if (amount) message += `\nAmount: ${amount}`;
    message += `\n\nRaw: ${data}`;

    Alert.alert(
      "Scanned Banking Info",
      message,
      [
        {
          text: "Use Info",
          onPress: () => {
            const qName = encodeURIComponent(info.name ?? "");
            const qAcc = encodeURIComponent(info.account ?? "");
            const qAmt = encodeURIComponent(info.amount ?? "");
            router.push(`QrPayment?name=${qName}&account=${qAcc}&amount=${qAmt}`);
          },
        },
        {
          text: "Scan Again",
          onPress: () => setScanned(false),
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="close" size={28} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>SCAN QR CODE</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* Camera */}
      <CameraView
        style={styles.camera}
        facing="back"
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
      />

      {/* Cancel Button */}
      <View style={styles.overlay}>
        <FixedButton
          title="Cancel"
          onPress={() => router.back()}
          containerStyle={{
            marginBottom: 0,
            marginTop: 5,
            backgroundColor: "transparent",
          }}
          buttonStyle={{ backgroundColor: "#003366" }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  camera: { flex: 1 },
  header: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 10,
    elevation: 10,
    pointerEvents: "box-none",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
    flex: 1,
    position: "absolute",
    left: 0,
    right: 0,
  },
  overlay: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    width: "100%",
  },
  text: {
    color: "#fff",
    fontSize: 16,
  },
});
