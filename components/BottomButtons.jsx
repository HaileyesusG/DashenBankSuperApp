import Button from "../components/Button";
import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function BottomButtons() {
  const router = useRouter();

  return (
    <View style={styles.bottomButtons}>
      <Button
        title="Register"
        style={styles.registerBtn}
        onPress={() => router.push("SignUp")}
      />
      <Button
        title="Login"
        style={styles.loginBtn}
        textStyle={styles.loginText}
        onPress={() => router.push("Login")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  bottomButtons: {
    marginHorizontal: 20,
    marginBottom:10
  },
  registerBtn: {
    backgroundColor: "#003366",
    paddingVertical: 15,
    borderRadius: 50,
    marginBottom: 12,
  },
  loginBtn: {
    backgroundColor: "#fff",
    paddingVertical: 15,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#003366",
    marginBottom: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  loginText: {
    color: "#003366",
    fontSize: 16,
    fontWeight: "600",
  },
});
