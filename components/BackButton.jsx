import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Header({ title, showBack = true, onBackPress }) {
  const router = useRouter();

  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  return (
    <View style={styles.headerRow}>
      {showBack && (
        <TouchableOpacity onPress={handleBack}>
                  <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
      )}
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginBottom: 20,
    marginTop:10
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "400",
    marginLeft: 10,
  },
});
