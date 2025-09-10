import { StyleSheet, Text, View } from "react-native";
import { React, useEffect } from "react";
import Onboarding from "../app/Onboarding";
import { useRouter } from "expo-router";
export default function firstTimeLogInCheck() {
  const redirect = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      redirect.replace("/(tabs)/Home");
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View>
      <Onboarding />
    </View>
  );
}

const styles = StyleSheet.create({});
