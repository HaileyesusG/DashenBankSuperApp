
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import Header from "../components/BackButton";
import FixedButton from "../components/FixedButton";
import { TipModal, BudgetModal, AccountSelectionModal } from "../components/Modals";

const budgetName = "Off Budget";
export default function QrPayment() {
  const redirect = useRouter();
  const { name, account, amount } = useLocalSearchParams();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);

  const [tipModalVisible, setTipModalVisible] = useState(false);
  const [isTipEnabled, setIsTipEnabled] = useState(false);
  const [customTip, setCustomTip] = useState("");

  const [budgetModalVisible, setBudgetModalVisible] = useState(false);

  const accounts = [
    { id: 1, number: "1234873648236", icon: require("../assets/images/BankImage.png") },
    { id: 2, number: "1234873648236", icon: require("../assets/images/BankImage.png") },
    { id: 3, number: "567873648236", icon: require("../assets/images/BankImage.png") },
  ];

  const budgets = [
    { id: 1, name: "House ", amount: "10,000 ETB", icon: require("../assets/images/House.png") },
    { id: 2, name: "Loan", amount: "5,000 ETB", icon: require("../assets/images/Loan.png") },
    { id: 3, name: "Groceries", amount: "2,000 ETB", icon: require("../assets/images/Grocerry.png") },
    { id: 4, name: "Food", amount: "6,000 ETB", icon: require("../assets/images/Food.png") },
    { id: 5, name: "Transport", amount: "1,500 ETB", icon: require("../assets/images/Transport.png") },
    { id: 6, name: "Other", amount: "1,000 ETB", icon: require("../assets/images/Transport (1).png") },
    { id: 7, name: "Food", amount: "6,000 ETB", icon: require("../assets/images/Food.png") },
    { id: 8, name: "Transport", amount: "1,500 ETB", icon: require("../assets/images/Transport.png") },
    { id: 9, name: "Other", amount: "1,000 ETB", icon: require("../assets/images/Transport (1).png") },
  ];

  const getNumericAmount = () => {
    if (!amount) return 0;
    return parseFloat(amount.replace(/,/g, ""));
  };

  const handleSend = (budgetNameParam) => {
    setBudgetModalVisible(false);
    const chosenAccountNumber = accounts.find((a) => a.id === selectedAccount)?.number;

    redirect.push({
      pathname: "ConfirmTransfer",
      params: {
        amount: getNumericAmount(),
        accountNumber: chosenAccountNumber,
        clientNumber: account,
        receipientName: name,
        name: budgetNameParam,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerWrapper}>
        <Header title="Qr Payment" />
      </View>

      <View style={styles.body}>
        <Text style={styles.selectAccount}>Select Account</Text>
        <Text style={styles.subText}>Select your account and confirm payment</Text>

        <Text style={styles.accountNumberLabel}>Account Number</Text>
        <TouchableOpacity style={styles.accountCylinder} onPress={() => setModalVisible(true)}>
          <Text style={styles.placeholderText}>
            {selectedAccount ? accounts.find((a) => a.id === selectedAccount)?.number : "-select"}
          </Text>
          <Ionicons name="chevron-down" size={24} color="#00000080" />
        </TouchableOpacity>

        <Text style={styles.amount}>{amount} Birr</Text>
        <Text style={styles.availableBalance}>
          Available in Main Account: <Text style={styles.balanceHighlight}>ETB 20,000.00</Text>
        </Text>
      </View>

      <View style={styles.footer}>
        <FixedButton
          title="Next"
          onPress={() => setTipModalVisible(true)}
          containerStyle={{ marginBottom: 0, marginTop: 5, backgroundColor: "transparent" }}
          buttonStyle={{ backgroundColor: "#003366" }}
        />
      </View>

      {/* Tip modal component */}
      <TipModal
        visible={tipModalVisible}
        onClose={() => setTipModalVisible(false)}
        onSkip={() => {
          setTipModalVisible(false);
          setBudgetModalVisible(true);
        }}
        onDone={({ isTipEnabled: enabled, customTip: tip }) => {
          setIsTipEnabled(enabled);
          setCustomTip(tip);
          setTipModalVisible(false);
          setBudgetModalVisible(true);
        }}
      />

      {/* Budget modal component */}
      <BudgetModal
        visible={budgetModalVisible}
        onClose={() => setBudgetModalVisible(false)}
        budgets={budgets}
        onSkip={() => handleSend(budgetName)}
        onSelectBudget={(budgetNameParam) => handleSend(budgetNameParam)}
      />

      {/* Account selection component */}
      <AccountSelectionModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        accounts={accounts}
        selectedAccount={selectedAccount}
        onConfirm={(id) => {
          setSelectedAccount(id);
          setModalVisible(false);
        }}
        onCancel={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  headerWrapper: {
    paddingBottom: 8,
    marginBottom: 8,
    marginTop: 30,
    marginLeft: 20,
  },
  body: { paddingHorizontal: 16, marginTop: 4, flex: 1 },
  footer: { padding: 16 },

  selectAccount: {
    fontSize: 28,
    fontWeight: "900",
    color: "#000",
    marginBottom: 6,
  },
  subText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#757575",
    marginBottom: 24,
  },
  accountNumberLabel: {
    fontSize: 14,
    fontWeight: "400",
    color: "#000",
    marginBottom: 8,
  },
  accountCylinder: {
    flexDirection: "row",
    width: "100%",
    height: 56,
    borderRadius: 32,
    backgroundColor: "#F0F0F0",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  placeholderText: {
    fontSize: 16,
    fontWeight: "400",
    fontFamily: "Times New Roman",
    color: "#0000004D",
  },
  amount: {
    fontSize: 36,
    fontWeight: "900",
    color: "#989898",
    textAlign: "center",
    alignSelf: "center",
    marginTop: 20,
  },
  availableBalance: {
    fontSize: 16,
    fontWeight: "350",
    color: "#929292",
    textAlign: "center",
    marginTop: 8,
  },
  balanceHighlight: { fontSize: 16, fontWeight: "900", color: "#131C66" },
});
