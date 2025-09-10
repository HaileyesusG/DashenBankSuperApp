import Checkbox from "expo-checkbox";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import Header from "../components/BackButton";
import FixedButton from "../components/FixedButton";
export default function SignUpScreen() {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [referral, setReferral] = useState("");
  const [isChecked, setChecked] = useState(false);
  const redirect = useRouter();

  const handleSubmit = () => {
    if (!fullName || fullName.trim().length < 3) {
      Alert.alert("Validation Error", "Please enter your full name (min 3 characters).");
      return;
    }
    const phoneRegex = /^9\d{8}$/;
    if (!phoneRegex.test(phoneNumber)) {
      Alert.alert(
        "Validation Error",
        "Please enter a valid Ethiopian phone number (e.g., 9XXXXXXXX)."
      );
      return;
    }
    if (!isChecked) {
      Alert.alert("Validation Error", "You must agree to the Terms and Conditions.");
      return;
    }

    const payload = {
      fullName,
      phoneNumber:` +251${phoneNumber}`,
      referral: referral || null,
    };

    console.log("Sending payload:", payload);
    redirect.push("VerifyOtp");
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // iOS uses padding, Android works better with height
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0} // adjust offset for header
    >
      <View style={{ flex: 1 }}>
        {/* Scrollable form content */}
        <ScrollView contentContainerStyle={styles.container}>
          {/* Back Arrow + Title */}
          <Header title="Create Super App Account"/>

          {/* Logo */}
          <Image
            source={require("../assets/images/Dashen Logo.png")}
            style={styles.logo}
          />

          {/* Register Text */}
          <Text style={styles.register}>Register</Text>

          {/* Subtext */}
          <Text style={styles.subText}>
            Create Dashen Bank Super App account and be part of the digital banking system
          </Text>
<View className="mt-10">
{/* Full Name */}
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            placeholder="Enter Full Name"
            style={styles.input}
            value={fullName}
            onChangeText={setFullName}
          />

          {/* Phone Number */}
          <Text style={styles.label}>Phone Number</Text>
          <View style={styles.phoneInputContainer}>
            <Image
              source={{ uri: "https://flagcdn.com/w80/et.png" }}
              style={styles.flag}
            />
            <Text style={styles.prefix}>+251</Text>
            <TextInput
              placeholder="9 (0000) (0000)"
              style={styles.phoneInput}
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              maxLength={9}
            />
          </View>

          {/* Referral */}
          <Text style={styles.label}>Referral (Optional)</Text>
          <TextInput
            placeholder="Enter Referral Code"
            style={styles.input}
            value={referral}
            onChangeText={setReferral}
          />

          {/* Terms and Conditions Checkbox */}
          <View style={styles.checkboxContainer}>
            <Checkbox
              value={isChecked}
              onValueChange={setChecked}
              color={isChecked ? "#003366" : undefined}
            />
            <Text style={styles.checkboxText}>
              I have agreed to the{" "}
              <Text style={styles.link}>Terms and Conditions</Text>
            </Text>
          </View>
</View>
          
        </ScrollView>

        {/* Fixed Continue Button */}
        <FixedButton
        title="Continue"
        onPress={handleSubmit}
      />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
    marginTop:10
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  logo: {
    width: 60,
    height: 60,
    alignSelf: "center",
    marginBottom: 20,
    resizeMode: "contain",
  },
  register: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
  },
  subText: {
    fontSize: 14,
    color: "gray",
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
    fontSize: 14,
  },
  phoneInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  flag: {
    width: 28,
    height: 20,
    marginRight: 8,
    borderRadius: 3,
  },
  prefix: {
    fontSize: 14,
    marginRight: 5,
  },
  phoneInput: {
    flex: 1,
    padding: 10,
    fontSize: 14,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkboxText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#333",
    flexShrink: 1,
  },
  link: {
    color: "#003366",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  bottomButtonContainer: {
    padding: 20,
    borderColor: "#eee",
    backgroundColor: "#fff",
    marginBottom:20
  },
  button: {
    backgroundColor: "#003366",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});