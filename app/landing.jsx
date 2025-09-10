import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import BottomButtons from "../components/BottomButtons";
const { width } = Dimensions.get("window");

export default function WelcomeScreen() {
  const redirect = useRouter();
  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        {/* Menu Icon */}
        <TouchableOpacity>
          <Ionicons name="menu" size={28} color="#003366" />
        </TouchableOpacity>

        {/* Feedback Button */}
        <TouchableOpacity style={styles.feedbackBtn}>
          <MaterialIcons name="feedback" size={20} color="#003366" />
          <Text style={styles.feedbackText}>Feedbacks</Text>
        </TouchableOpacity>

        {/* Language Selector */}
        <TouchableOpacity style={styles.languageBtn}>
          <FontAwesome5 name="globe" size={18} color="#003366" />
          <Text style={styles.languageText}>English</Text>
        </TouchableOpacity>
      </View>

      {/* Center Content */}
      <View style={styles.centerContent}>
        <Image
          source={require("../assets/images/Dashen Logo.png")} 
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Welcome to Dashen Super App</Text>
        <Text style={styles.title2} >
          Experience advanced banking and lifestyle services—all in one Super
          App. Sign up or log in to access secure, smart, and seamless features
          designed for every part of your life.
        </Text>
      </View>

      {/* Bottom Buttons */}
     
      <BottomButtons />
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    justifyContent: "space-between",
  },
  /* 🔹 Top Bar */
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 15,
    paddingTop: 40, // safe area
    paddingBottom: 10,
  },
  feedbackBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 50,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginLeft: 110,
    borderWidth: 1,
    borderColor: "#003366",
  },
  feedbackText: {
    marginLeft: 6,
    fontSize: 14,
    color: "#003366",
    fontWeight: "600",
  },
  languageBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    borderWidth: 1,
    borderRadius: 50,
    paddingVertical: 6,
    paddingHorizontal: 6,
  },
  languageText: {
    marginLeft: 6,
    fontSize: 14,
    color: "#003366",
    fontWeight: "600",
  },

  /* 🔹 Center Logo & Text */
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: width * 0.3,
    height: width * 0.3,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0D1B2A",
    
  },
   title2: {
    fontSize: 15,
    fontWeight: "",
    color: "#757575",
    marginTop:20,
    alignItems:"center",
    width: width * 0.9,
  },

  /* 🔹 Bottom Buttons */
  bottomButtons: {
    width: "100%",
    padding: 20,
  },
  registerBtn: {
    backgroundColor: "#003366",
    paddingVertical: 15,
    borderRadius: 50,
    marginBottom: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  registerText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginBtn: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 15,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#003366",
  },
  loginText: {
    color: "#003366",
    fontSize: 16,
    fontWeight: "bold",
  },
});
