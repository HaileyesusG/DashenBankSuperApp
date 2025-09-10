import React, { useState } from "react";
import { View, Text, StyleSheet, Button, Linking, Alert } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

export default function QRScanner() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>We need your permission to use the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);

    // Check if scanned data is a valid URL
    if (data.startsWith("http://") || data.startsWith("https://")) {
      Linking.openURL(data).catch(() => {
        Alert.alert("Error", "Could not open the scanned URL.");
      });
    } else {
      Alert.alert("Scanned Data", data, [
        { text: "Scan Again", onPress: () => setScanned(false) },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing="back"
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"], // Only scan QR codes
        }}
      />
      <View style={styles.overlay}>
        <Text style={styles.text}>Scan a QR Code</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1 },
  overlay: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
    borderRadius: 8,
  },
  text: {
    color: "#fff",
    fontSize: 16,
  },
});
