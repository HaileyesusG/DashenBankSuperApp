import React from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Share,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Redirect, useLocalSearchParams } from "expo-router";
import * as Print from "expo-print";
import { useRouter } from "expo-router";
export default function SuccessScreen() {
  const redirect = useRouter();
  const { amount, accountNumber, clientNumber, receipientName } =
    useLocalSearchParams();
  const formatAmount = (value) => {
    let numericValue = value.replace(/[^0-9.]/g, "");
    let parts = numericValue.split(".");
    // 👇 use dot instead of comma
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return parts.join(".");
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: "Transfer successful! Amount: 50.010.00 ETB",
      });
    } catch (error) {
      console.log("Error sharing:", error);
    }
  };

  const handlePrint = async () => {
    try {
      await Print.printAsync({
        html: `
        <html>
          <body>
            <h2>Transfer Receipt</h2>
            <p><strong>Amount:</strong> 50.010.00 ETB</p>
            <p><strong>Status:</strong> Successful</p>
          </body>
        </html>
      `,
      });
    } catch (error) {
      console.log("Error printing:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Background Image with all contents inside */}
      <ImageBackground
        source={require("../assets/images/Frame.png")}
        style={styles.backgroundImage}
        resizeMode="contain"
      >
        {/* Tick Image */}
        <Image
          source={require("../assets/images/Tick.png")}
          style={styles.tickImage}
          resizeMode="contain"
        />

        {/* Success Message */}
        <Text style={styles.successText}>Money Successfully Sent!</Text>

        {/* Sub Message */}
        <Text style={styles.subText}>
          You have successfully sent money! Thank you for using our service.
        </Text>

        {/* Amount + Currency */}
        <View style={styles.amountRow}>
          <Text style={styles.amountText}>
            {Number(amount).toLocaleString()}
          </Text>
          <Text style={styles.currencyText}>(ETB)</Text>
        </View>
      </ImageBackground>

      {/* Transaction Details */}
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Sender Account:</Text>
          <Text style={styles.value}>Abebe Ayele Girma</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Recipient Account:</Text>
          <Text style={styles.value}>{clientNumber}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Recipient Name:</Text>
          <Text style={styles.value}>{receipientName}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Transaction ID:</Text>
          <Text style={styles.value}>FT328098MNH6</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Transaction Reference:</Text>
          <Text style={styles.value}>101204954873844</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Fee:</Text>
          <Text style={styles.value}>0.00 ETB</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Total Amount:</Text>
          <Text style={styles.value}>{formatAmount(amount)} ETB</Text>
        </View>

        {/* Status Row */}
        <View style={styles.detailRow}>
          <Text style={styles.label}>Status:</Text>
          <View style={styles.statusBox}>
            <Ionicons name="checkmark" size={14} color="#11B22B" />
            <Text style={styles.statusText}>Success</Text>
          </View>
        </View>
      </View>

      {/* Action Buttons Row */}
      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
          <Ionicons name="share-social" size={24} color="#131C66" />
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={handlePrint}>
          <Ionicons name="print" size={24} color="#131C66" />
          <Text style={styles.actionText}>Print</Text>
        </TouchableOpacity>
      </View>

      {/* Back to Home Button */}
      <TouchableOpacity style={styles.homeButton} onPress={()=>redirect.replace("/(tabs)/Home")}>
        <Text style={styles.homeButtonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 15,
  },
  backgroundImage: {
    width: "96%",
    height: 390,
    alignItems: "center",
    marginLeft: 15,
  },
  tickImage: {
    width: 171,
    height: 171,
    marginTop: 30, // gap from top inside background
  },
  successText: {
    fontSize: 28,
    fontWeight: "900",
    color: "#000000",
    textAlign: "center",
    marginTop: 2,
  },
  subText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#515151",
    textAlign: "center",
    marginTop: 3,
    paddingHorizontal: 20,
  },
  amountRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginTop: 10,
  },
  amountText: {
    fontSize: 36,
    fontWeight: "800",
    color: "#000000",
    textAlign: "right",
  },
  currencyText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#000000",
    marginLeft: 5,
    textAlign: "left",
  },
  detailsContainer: {
    paddingHorizontal: 20,
    marginTop: -30,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#505050",
  },
  value: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000000",
  },
  statusBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#09EE652E",
    borderRadius: 42,
    paddingHorizontal: 12,
    paddingVertical: 4,
    gap: 6,
  },
  statusText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#11B22B",
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 10,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    width: 172,
    height: 56,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DDDDDD",
    paddingHorizontal: 12,
    justifyContent: "center",
    gap: 10,
  },
  actionText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#131C66",
  },
  homeButton: {
    marginTop: 25,
    backgroundColor: "#131C66",
    height: 56,
    borderRadius: 32,
    marginHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  homeButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
