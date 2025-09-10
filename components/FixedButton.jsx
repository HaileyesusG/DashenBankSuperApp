import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function FixedButton({ title, onPress, containerStyle, buttonStyle, textStyle }) {
  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
        <Text style={[styles.text, textStyle]}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderColor: "#eee",
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#003366",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
