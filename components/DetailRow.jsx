// DetailRow.js
import { View, Text, StyleSheet } from "react-native";

export default function DetailRow({ label, value, isTotal }) {
  return (
    <View style={styles.row}>
      <Text style={isTotal ? styles.label2 : styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", justifyContent: "space-between" },
  label: { fontSize: 14, fontWeight: "400", color: "#505050" },
  label2: { fontSize: 14, fontWeight: "800", color: "#505050" },
  value: { fontSize: 16, fontWeight: "800", color: "#000" },
});
