import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";

export default function FixedButton({
  title,
  onPress,
  containerStyle,
  buttonStyle,
  textStyle,
  loading = false,
  disabled = false,
}) {
  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        style={[
          styles.button,
          buttonStyle,
          (disabled || loading) && { backgroundColor: "#ccc" },
        ]}
        onPress={onPress}
        disabled={disabled || loading}
      >
        {loading ? (
          <>
            <ActivityIndicator size="small" color="#fff" style={{ marginRight: 8 }} />
            <Text style={[styles.text, textStyle]}>{title}</Text>
          </>
        ) : (
          <Text style={[styles.text, textStyle]}>{title}</Text>
        )}
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
    flexDirection: "row",   // 👈 allows spinner + text in a row
    justifyContent: "center",
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
