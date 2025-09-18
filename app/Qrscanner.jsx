import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  TouchableOpacity,
  Dimensions,
  Animated,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import FixedButton from "../components/FixedButton";
import { useRouter } from "expo-router";
import Svg, { Rect, Defs, Mask } from "react-native-svg"; // 🔹 SVG import

const { width, height } = Dimensions.get("window");
const CLEAR_BOX_SIZE = 330; // square cutout

export default function QRScanner() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const router = useRouter();

  // 🔹 Animated scan line
  const animation = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: CLEAR_BOX_SIZE - 4,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

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
      Alert.alert("Invalid QR Code", "This scanner only works for banking QR codes.", [
        { text: "Scan Again", onPress: () => setScanned(false) },
      ]);
      return;
    }

    const info = parseBankingInfo(data || "");
    const name = info.name ?? null;
    const account = info.account ?? null;
    const bank = info.bank ?? null;
    const amount = info.amount ?? null;

    if (!name || !account || !amount) {
      Alert.alert(
        "Invalid QR Code",
        "The scanned QR code does not contain valid banking information.",
        [{ text: "Scan Again", onPress: () => setScanned(false) }]
      );
      return;
    }

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
            const qName = encodeURIComponent(name);
            const qAcc = encodeURIComponent(account);
            const qAmt = encodeURIComponent(amount);
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
      {/* Camera */}
      <CameraView
        style={styles.camera}
        facing="back"
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
      />

      {/* SVG Overlay with Transparent Rounded Cutout */}
      <Svg height={height} width={width} style={StyleSheet.absoluteFill}>
        <Defs>
          <Mask id="mask">
            {/* Full screen opaque */}
            <Rect x="0" y="0" width={width} height={height} fill="white" />
            {/* Transparent cutout in center */}
            <Rect
              x={(width - CLEAR_BOX_SIZE) / 2}
              y={(height - CLEAR_BOX_SIZE) / 2}
              width={CLEAR_BOX_SIZE}
              height={CLEAR_BOX_SIZE}
              rx={8} // 🔹 border radius
              ry={8}
              fill="black"
            />
          </Mask>
        </Defs>

        {/* Dim background with mask applied */}
        <Rect
          x="0"
          y="0"
          width={width}
          height={height}
          fill="rgba(0,0,0,0.6)"
          mask="url(#mask)"
        />
      </Svg>

      {/* White border around the cutout */}
      <View
        style={[
          styles.clearBox,
          {
            top: (height - CLEAR_BOX_SIZE) / 2,
            left: (width - CLEAR_BOX_SIZE) / 2,
            width: CLEAR_BOX_SIZE,
            height: CLEAR_BOX_SIZE,
          },
        ]}
      >
        {/* Animated scan line */}
        <Animated.View
          style={[
            styles.scanLine,
            { transform: [{ translateY: animation }] },
          ]}
        />
      </View>

      {/* Action Buttons under clear space */}
<View
  style={[
    styles.actionButtonsContainer,
    {
      top: (height + CLEAR_BOX_SIZE) / 2 + 20, // 🔹 below clear space
    },
  ]}
>
  {/* Scan From Gallery Button */}
  <TouchableOpacity style={styles.actionButton}>
    <Text style={styles.actionButtonText}>Scan From Gallery</Text>
    <Ionicons name="images-outline" size={24} color="#FFFFFF" style={styles.icon} />
  </TouchableOpacity>

  {/* Light Button */}
  <TouchableOpacity style={styles.actionButton}>
    <Text style={styles.actionButtonText}>Light</Text>
    <Ionicons name="flashlight-outline" size={24} color="#FFFFFF" style={styles.icon} />
  </TouchableOpacity>
</View>


      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="close" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>SCAN QR CODE</Text>
        <View style={{ width: 28 }} />
      </View>

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

  clearBox: {
    position: "absolute",
    borderRadius: 8,
    borderWidth: 3,
    borderColor: "transparent",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  scanLine: {
    width: "100%",
    height: 3,
    backgroundColor: "limegreen",
  },

  header: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 10,
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
  bottomButton: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    alignSelf: "center",
    backgroundColor:"red"
  },
  text: {
    color: "#fff",
    fontSize: 16,
  },
  actionButtonsContainer: {
  position: "absolute",
  left: 0,
  right: 0,
  flexDirection: "row",
  justifyContent: "space-evenly",
  alignItems: "center",
},

actionButton: {
  flexDirection: "row", // 🔹 keeps text + icon in a row
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "rgba(255,255,255,0.15)", // subtle bg, adjust as needed
  width: "auto",
  height: 44,
  borderRadius: 8,
  paddingVertical: 10,
  paddingHorizontal: 24,
},

icon: {
  marginLeft: 8, // 🔹 spacing between text and icon
  borderRadius: 4,
},

actionButtonText: {
  fontSize: 16,
  fontWeight: "400",
  color: "#FFFFFF",
},
  overlay: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    width: "100%",
  },
});
