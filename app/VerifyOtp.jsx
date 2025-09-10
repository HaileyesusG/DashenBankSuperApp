import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Header from "../components/BackButton";
import FixedButton from "../components/FixedButton";
const VerifyPhoneScreen = () => {
  const [timeLeft, setTimeLeft] = useState(59);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputs = useRef([]);
  const redirect = useRouter();
  // Countdown effect
  useEffect(() => {
    if (timeLeft === 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleChange = (text, index) => {
    if (/^\d$/.test(text)) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);
      if (index < 5 && text) {
        inputs.current[index + 1].focus();
      }
    } else if (text === "") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && otp[index] === "" && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleContinue = () => {
    const otpCode = otp.join(""); // join digits into string

    if (otpCode.length === 6) {
      // ✅ send OTP to backend
      Alert.alert("OTP Entered", `Your code is: ${otpCode}`);
      // Example: call API
      // fetch("https://your-api.com/verify", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ otp: otpCode, phone: "+251912345678" }),
      // });
      redirect.push("CreatePin");
    } else {
      Alert.alert("Error", "Please enter all 6 digits of the code");
    }
  };

  const isOtpComplete = otp.every((digit) => digit !== "");

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#fff" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        {/* Back Arrow + Title */}

       <Header title="Verify Phone Number" />
       
        

        {/* Logo */}
        <Image
          source={require("../assets/images/Dashen Logo.png")}
          style={styles.logo}
        />

        {/* Verification Title */}
        <Text style={styles.verificationTitle}>Verification Code</Text>

        {/* Sub Text */}
        <Text style={styles.subText}>
          We have sent you a verification code to
        </Text>

        {/* Phone Number + Change */}
        <View style={styles.phoneRow}>
          <Text style={styles.phoneText}>+251 912 345 678</Text>
          <TouchableOpacity>
            <Text style={styles.changeText}>Change</Text>
          </TouchableOpacity>
        </View>

        {/* Countdown */}
        <Text style={styles.countdown}>
          00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft} Sec
        </Text>

        {/* OTP Inputs */}
        <View style={[styles.otpRow, { gap: 10 }]}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputs.current[index] = ref)}
              style={styles.otpBox}
              keyboardType="phone-pad"
              maxLength={1}
              value={digit ? "*" : ""} // Show * instead of digit
              onChangeText={(text) => handleChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
            />
          ))}
        </View>

        {/* Resend SMS */}
        <TouchableOpacity>
          <Text style={styles.resendText}>Resend SMS Code</Text>
        </TouchableOpacity>
      </View>

      {/* Continue Button fixed at bottom */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            { backgroundColor: isOtpComplete ? "#003366" : "#ccc" },
          ]}
          onPress={handleContinue}
          disabled={!isOtpComplete}
        >
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default VerifyPhoneScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#003366",
    marginLeft: 8,
  },
  logo: {
    width: 60,
    height: 60,
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
    marginBottom: 5,
    textAlign: "center",
  },
  phoneRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  phoneText: {
    fontSize: 16,
    fontWeight: "600",
  },
  changeText: {
    fontSize: 16,
    color: "#003366",
    marginLeft: 10,
  },
  countdown: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
  },
  otpRow: {
    flexDirection: "row",
    justifyContent: "center",
    width: "80%",
    marginBottom: 20,
  },
  otpBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    fontSize: 20,
    textAlign: "center",
    padding: 10,
    width: 45,
    height: 55,
  },
  resendText: {
    fontSize: 16,
    color: "#003366",
    marginBottom: 30,
  },
  footer: {
    padding: 20,
  },
  continueButton: {
    paddingVertical: 16,
    borderRadius: 30,
    width: "100%",
    alignItems: "center",
  },
  continueText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
