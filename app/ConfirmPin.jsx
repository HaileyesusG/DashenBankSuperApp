import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Header from "../components/BackButton";
const VerifyPhoneScreen = () => {
  const redirect = useRouter();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [activeIndex, setActiveIndex] = useState(0);

  // Handle digit input
  const handleKeyPress = (digit) => {
    if (activeIndex < 6) {
      const newOtp = [...otp];
      newOtp[activeIndex] = digit;
      setOtp(newOtp);
      if (activeIndex < 5) setActiveIndex(activeIndex + 1);
    }
  };

  // Handle backspace
  const handleBackspace = () => {
    if (activeIndex > 0 || otp[activeIndex] !== "") {
      const newOtp = [...otp];
      const newIndex = otp[activeIndex] ? activeIndex : activeIndex - 1;
      if (newIndex >= 0) {
        newOtp[newIndex] = "";
        setOtp(newOtp);
        setActiveIndex(newIndex);
      }
    }
  };

  // Handle submit
  const handleSubmit = () => {
    console.log("PIN entered:", otp.join(""));
    redirect.push("/(tabs)/Home");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
     
      {/* Header */}
      <Header title="Confirm PIN"/>

      {/* Intro text */}
      <View style={styles.textStart}>
        <Text style={styles.firstText}>You are almost finished</Text>
      </View>
      <View style={styles.textStart}>
        <Text>
          You're just one step away! Set up your secure PIN to complete the
          setup and access your account.
        </Text>
      </View>

      {/* Logo */}
      <Image
        source={require("../assets/images/Dashen Logo.png")}
        style={styles.logo}
      />

      {/* Title */}
      <Text style={styles.verificationTitle}>Confirm PIN</Text>
      <Text style={styles.subText}>
        Re-enter your PIN to confirm and ensure it's correct.
      </Text>

      {/* OTP display */}
      <View style={[styles.otpRow, { gap: 10 }]}>
        {otp.map((digit, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.otpBox,
              activeIndex === index && styles.activeOtpBox,
            ]}
            onPress={() => setActiveIndex(index)}
          >
            <Text style={styles.otpText}>{digit ? "*" : ""}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Lock info */}
      <View style={styles.infoRow}>
        <Ionicons name="lock-closed-outline" size={18} color="#003366" />
        <Text style={styles.infoText}>
          A 6-digit PIN that is secure and easy to remember
        </Text>
      </View>

      {/* Custom Keyboard */}
      <View style={styles.keyboard}>
        {[
          ["1", "2", "3"],
          ["4", "5", "6"],
          ["7", "8", "9"],
        ].map((row, i) => (
          <View style={styles.keyRow} key={i}>
            {row.map((num) => (
              <TouchableOpacity
                key={num}
                style={styles.key}
                onPress={() => handleKeyPress(num)}
              >
                <Text style={styles.keyText}>{num}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}

        {/* Last row with backspace, 0, and arrow */}
        <View style={styles.keyRow}>
          <TouchableOpacity style={styles.key} onPress={handleBackspace}>
            <Ionicons name="backspace-outline" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.key}
            onPress={() => handleKeyPress("0")}
          >
            <Text style={styles.keyText}>0</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.arrowKey} onPress={handleSubmit}>
            <Ionicons name="arrow-forward" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default VerifyPhoneScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#003366",
    marginLeft: 8,
  },
  firstText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  textStart: {
    alignSelf: "flex-start",
    marginBottom: 5,
  },
  logo: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  Icon: {
    width: 45,
    height: 45,
    marginVertical: 20,
  },
  verificationTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subText: {
    fontSize: 14,
    color: "gray",
    marginBottom: 10,
    textAlign: "center",
  },
  otpRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 20,
  },
  otpBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    width: 45,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
  },
  activeOtpBox: {
    borderColor: "#003366",
    borderWidth: 2,
  },
  otpText: {
    fontSize: 20,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  infoText: {
    fontSize: 14,
    color: "gray",
    marginLeft: 6,
    flexShrink: 1,
  },
  keyboard: {
    marginTop: 70,
    width: "100%",
  },
  keyRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  key: {
    flex: 1,
    height: 60,
    marginHorizontal: 5,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  keyText: {
    fontSize: 22,
    fontWeight: "bold",
  },
  arrowKey: {
    flex: 1,
    height: 60,
    marginHorizontal: 5,
    backgroundColor: "#003366",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  continueButton: {
    backgroundColor: "#003366",
    paddingVertical: 14,
    width: "100%",
    borderRadius: 30,
    alignItems: "center",
    position: "absolute",
    bottom: 20,
  },
  continueText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  smartPayContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20, // some gap after "Confirm PIN"
  },
  smartPayTextContainer: {
    marginLeft: 8,
  },
  smartPayTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#003366",
  },
  smartPaySubtitle: {
    fontSize: 12,
    color: "gray",
  },
});
