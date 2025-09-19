// components/PinModal.js
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ModalWrapper from "./ModalWrapper";

/**
 * PinModal
 * Props:
 * - visible: boolean
 * - onClose: () => void
 * - onConfirm: (pin: string) => void
 * - title, subtitle: optional strings
 * - maxLength: number (default 6)
 * - blurSource: image source for the background blur
 *
 * Behavior:
 * - keeps PIN state internally
 * - auto-calls onConfirm(pin) when the pin length reaches maxLength
 * - also calls onConfirm(pin) when user taps the confirm key
 * - resets internal pin when modal closes
 */
export default function PinModal({
  visible,
  onClose,
  onConfirm,
  title = "Please Verify!",
  subtitle = "Enter Your PIN to confirm the transfer.",
  maxLength = 6,
  blurSource,
}) {
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);

  useEffect(() => {
    if (!visible) {
      setPin("");
      setShowPin(false);
    }
  }, [visible]);

  const handleKeyPress = (val) => {
    if (val === "back") {
      setPin((p) => p.slice(0, -1));
    } else if (val === "confirm") {
      onConfirm?.(pin);
      onClose?.();
      setPin("");
    } else {
      if (pin.length < maxLength) {
        const newPin = pin + val;
        setPin(newPin);
        if (newPin.length === maxLength) {
          // auto submit when full
          onConfirm?.(newPin);
          onClose?.();
          setPin("");
        }
      }
    }
  };

  return (
    <ModalWrapper visible={visible} onRequestClose={onClose} blurSource={blurSource}>
      <View style={styles.modalBox}>
        <View style={{ marginTop: "auto" }}>
          <TouchableOpacity onPress={onClose} style={{ alignItems: "flex-end", paddingHorizontal: 16 }}>
            <Image source={require("../assets/images/Close.png")} style={styles.closeBtn} resizeMode="contain" />
          </TouchableOpacity>
        </View>

        <Text style={styles.modalTitle}>{title}</Text>
        <Text style={styles.modalSubtitle}>{subtitle}</Text>

        <View style={styles.pinRow}>
          {[...Array(maxLength)].map((_, i) => (
            <View key={i} style={styles.pinBox}>
              <Text style={styles.pinText}>{pin[i] ? (showPin ? pin[i] : "•") : ""}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity onPress={() => setShowPin((s) => !s)}>
          <Text style={styles.showPin}>{showPin ? "Hide PIN" : "Show PIN"}</Text>
        </TouchableOpacity>

        <View style={styles.fingerprintBox}>
          <Image source={require("../assets/images/Finger.png")} style={{ width: 44, height: 44, tintColor: "#131C66" }} resizeMode="contain" />
        </View>

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
                      <Ionicons name="arrow-forward" size={28} color="#fff" />
                    ) : key === "back" ? (
                      <Image source={require("../assets/images/Back.png")} style={{ width: 28, height: 28, tintColor: "#000" }} resizeMode="contain" />
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
    </ModalWrapper>
  );
}

const styles = StyleSheet.create({
  modalBox: {
    width: "100%",
    height: "92%",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: "#fff",
    alignSelf: "center",
  },
  closeBtn: {
    width: 30,
    height: 30,
    tintColor: "#131C66",
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