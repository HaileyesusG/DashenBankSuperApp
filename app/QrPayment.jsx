import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Modal,
  Image,
  TextInput,
  Switch,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import Header from "../components/BackButton";
import FixedButton from "../components/FixedButton";
const budgetName= "Off Budget";
export default function QrPayment() {
  const redirect = useRouter();

  const { name, account, amount } = useLocalSearchParams();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [tempSelectedAccount, setTempSelectedAccount] = useState(null);

  const [tipModalVisible, setTipModalVisible] = useState(false);
  const [isTipEnabled, setIsTipEnabled] = useState(false);
  const [customTip, setCustomTip] = useState("");

  const [budgetModalVisible, setBudgetModalVisible] = useState(false);
  const [toggleEnabled, setToggleEnabled] = useState(false);

  const accounts = [
    { id: 1, number: "1234873648236", icon: require("../assets/images/BankImage.png") },
    { id: 2, number: "1234873648236", icon: require("../assets/images/BankImage.png") },
    { id: 3, number: "567873648236", icon: require("../assets/images/BankImage.png") },
  ];

  // Dummy Budgets
  const budgets = [
    {
      id: 1,
      name: "House ",
      amount: "10,000 ETB",
      icon: require("../assets/images/House.png"),
    },
    {
      id: 2,
      name: "Loan",
      amount: "5,000 ETB",
      icon: require("../assets/images/Loan.png"),
    },
    {
      id: 3,
      name: "Groceries",
      amount: "2,000 ETB",
      icon: require("../assets/images/Grocerry.png"),
    },
    {
      id: 4,
      name: "Food",
      amount: "6,000 ETB",
      icon: require("../assets/images/Food.png"),
    },
    {
      id: 5,
      name: "Transport",
      amount: "1,500 ETB",
      icon: require("../assets/images/Transport.png"),
    },
    {
      id: 6,
      name: "Other",
      amount: "1,000 ETB",
      icon: require("../assets/images/Transport (1).png"),
    },
    {
      id: 7,
      name: "Food",
      amount: "6,000 ETB",
      icon: require("../assets/images/Food.png"),
    },
    {
      id: 8,
      name: "Transport",
      amount: "1,500 ETB",
      icon: require("../assets/images/Transport.png"),
    },
    {
      id: 9,
      name: "Other",
      amount: "1,000 ETB",
      icon: require("../assets/images/Transport (1).png"),
    },
    
  ];
   const getNumericAmount = () => {
  if (!amount) return 0;
  return parseFloat(amount.replace(/,/g, ""));
};

const handleSkip = (nameB) => {
    setBudgetModalVisible(false);
        redirect.push({
      pathname: "ConfirmTransfer",
      params: {
        amount: getNumericAmount(), // 👈 now a number
        accountNumber:selectedAccount,
        clientNumber:account,
        receipientName:name,
        name:nameB
      },
    })
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerWrapper}>
        <Header title="Qr Payment" />
      </View>

      {/* Body */}
      <View style={styles.body}>
        <Text style={styles.selectAccount}>Select Account</Text>
        <Text style={styles.subText}>
          Select your account and confirm payment
        </Text>

        <Text style={styles.accountNumberLabel}>Account Number</Text>
        <TouchableOpacity
          style={styles.accountCylinder}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.placeholderText}>
            {selectedAccount
              ? accounts.find((a) => a.id === selectedAccount)?.number
              : "-select"}
          </Text>
          <Ionicons name="chevron-down" size={24} color="#00000080" />
        </TouchableOpacity>

        {/* Amount */}
        <Text style={styles.amount}>{amount} Birr</Text>
        <Text style={styles.availableBalance}>
          Available in Main Account:{" "}
          <Text style={styles.balanceHighlight}>ETB 20,000.00</Text>
        </Text>
      </View>

      {/* Footer Button */}
      <View style={styles.footer}>
        <FixedButton
          title="Next"
          onPress={() => setTipModalVisible(true)} // 👈 Open Tip Modal
          containerStyle={{
            marginBottom: 0,
            marginTop: 5,
            backgroundColor: "transparent",
          }}
          buttonStyle={{ backgroundColor: "#003366" }}
        />
      </View>

      {/* === Tip Modal === */}
      <Modal
        visible={tipModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setTipModalVisible(false)}
      >
        <View style={styles.tipOverlay}>
          <View style={styles.tipModal}>
            {/* Header Row */}
            <View style={styles.tipHeaderRow}>
              <Text style={styles.tipTitle}>Give A tip</Text>
              <TouchableOpacity
                style={styles.skipButton}
                onPress={() => {
                  setTipModalVisible(false);
                  setBudgetModalVisible(true); // 👈 Open Budget Modal
                }}
              >
                <Text style={styles.skipText}>Skip</Text>
              </TouchableOpacity>
            </View>

            {/* Toggle Row */}
            <View style={styles.toggleRow}>
              <Text style={styles.toggleLabel}>Tip selection on Transfers</Text>
              <Switch
                value={isTipEnabled}
                onValueChange={setIsTipEnabled}
                thumbColor="#012169"
                trackColor={{ false: "#ccc", true: "#012169" }}
                style={styles.toggleSwitch}
              />
            </View>

            {/* Custom Tip Box */}
            <View style={styles.customTipBox}>
              <Text style={styles.customTipLabel}>Custom Tip</Text>
              <TextInput
                style={styles.customTipInput}
                keyboardType="phone-pad"
                placeholder="0.00"
                placeholderTextColor="#000000"
                value={customTip}
                onChangeText={setCustomTip}
              />

              {/* Quick Tip Options */}
              <View style={styles.quickTipRow}>
                {["10.00 Birr", "20.00 Birr", "50.00 Birr", "100.00 Birr"].map(
                  (tip, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.tipOption}
                      onPress={() =>
                        setCustomTip(tip.replace(" Birr", ""))
                      }
                    >
                      <Text style={styles.tipOptionText}>{tip}</Text>
                    </TouchableOpacity>
                  )
                )}
              </View>
            </View>

            {/* ✅ Next Button */}
            <View style={{ marginTop: "auto" }}>
              <FixedButton
                title="Next"
                onPress={() => {
                  setTipModalVisible(false);
                  setBudgetModalVisible(true); // 👈 Open Budget Modal
                }}
                containerStyle={{ marginTop: 20, width: "100%" }}
                buttonStyle={{
                  backgroundColor: customTip ? "#003366" : "#B0B0B0",
                }}
                textStyle={{ color: "#fff" }}
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* === Budget Modal === */}
      <Modal
        visible={budgetModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setBudgetModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.budgetModalContainer, { marginBottom: 12 }]}>
            {/* Stick */}
            <View style={styles.stick2} />

            {/* Header */}
            <View style={styles.budgetHeader}>
              <Text style={styles.budgetTitle}>Select Budget</Text>
              <TouchableOpacity
                style={styles.skipButton}
                onPress={() => handleSkip(budgetName)}
              >
                <Text style={styles.skipText}>Skip</Text>
              </TouchableOpacity>
            </View>

            {/* Budget Selection Toggle */}
            <View style={styles.toggleRow2}>
              <Text style={styles.toggleLabel2}>
                Budget selection on Transfers
              </Text>
              <Switch
                value={toggleEnabled}
                onValueChange={setToggleEnabled}
                trackColor={{ false: "#ccc", true: "#012169" }}
                thumbColor="#fff"
                style={styles.toggle}
              />
            </View>

            {/* Budget Grid */}
            <FlatList
              data={budgets}
              keyExtractor={(item) => item.id.toString()}
              numColumns={3}
              columnWrapperStyle={{ justifyContent: "space-between" }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.budgetCard}
                  onPress={() => handleSkip(item.name)}
                >
                  <Image source={item.icon} style={styles.budgetIcon} />
                  <Text style={styles.budgetName}>{item.name}</Text>
                  <Text style={styles.budgetAmount}>{item.amount}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      {/* === Account Selection Modal === */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => {
          setTempSelectedAccount(selectedAccount);
          setModalVisible(false);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, { marginBottom: 4 }]}>
            <View style={styles.stick} />

            <View style={styles.modalHeader}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  setTempSelectedAccount(selectedAccount);
                  setModalVisible(false);
                }}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.doneButton}
                onPress={() => {
                  setSelectedAccount(tempSelectedAccount);
                  setModalVisible(false);
                }}
              >
                <Text style={styles.doneText}>Done</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.modalTitle}>Select Account</Text>

            {accounts.map((account) => (
              <TouchableOpacity
                key={account.id}
                style={[
                  styles.accountCard,
                  tempSelectedAccount === account.id && {
                    borderColor: "#131C66",
                    backgroundColor: "#FEF7FF",
                  },
                ]}
                onPress={() => setTempSelectedAccount(account.id)}
              >
                <View
                  style={[
                    styles.checkbox,
                    tempSelectedAccount === account.id && {
                      backgroundColor: "#131C66",
                    },
                  ]}
                >
                  {tempSelectedAccount === account.id && (
                    <Ionicons name="checkmark" size={10} color="#fff" />
                  )}
                </View>
                <Image
                  source={account.icon}
                  style={styles.bankIcon}
                  resizeMode="contain"
                />
                <Text style={styles.cardAccountNumber}>{account.number}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
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

  /* === Tip Modal Styles === */
  tipOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  tipModal: {
    height: 530,
    width: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 14,
    paddingTop: 14,
  },
  tipHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tipTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#000",
  },
    skipButton: {
    backgroundColor: "#0121690D",
    borderRadius: 8,
    height: 32,
    width: 53,
    alignItems: "center",
    justifyContent: "center",
  },
  skipText: { fontSize: 14, fontWeight: "800", color: "#012169" },
  toggleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  toggleRow2: {
  flexDirection: "row",
  alignItems: "center",
  marginBottom: 12,
},
  toggleLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
  },
    toggleLabel2: {
  fontSize: 16,
  fontWeight: "500",
  color: "#000000",
},
  toggleSwitch: { width: 30, height: 30 },
  customTipBox: {
    marginTop: 20,
    width: "100%",
    backgroundColor: "#F0F4FF",
    borderRadius: 12,
    padding: 8,
    gap: 5,
    alignSelf: "center",
  },
  customTipLabel: { fontSize: 14, fontWeight: "400", color: "#000" },
  customTipInput: {
    height: 56,
    borderRadius: 24,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
  },
  quickTipRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 3,
  },
  tipOption: {
    width: 80,
    height: 39,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#131C66",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  tipOptionText: { fontSize: 13, fontWeight: "900", color: "#131C66" },

  /* === Budget Modal Styles === */
  budgetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  budgetTitle: { fontSize: 16, fontWeight: "900", color: "#000" },
  toggle: { transform: [{ scale: 1.2 }] },
  budgetCard: {
  flex: 1,                // ✅ each card takes equal space
  maxWidth: "30%",        // ✅ ensures 3 fit in a row
  height: 98,
  backgroundColor: "#F9F9F9",
  borderRadius: 12,
  marginBottom: 16,
  alignItems: "center",
  justifyContent: "center",
  padding: 8,
  marginHorizontal: 4,    // ✅ small spacing
},

  budgetIcon: { width: 24, height: 24, marginBottom: 8 },
  budgetName: {
    fontSize: 14,
    fontWeight: "800",
    color: "#000",
    marginBottom: 4,
  },
  budgetAmount: { fontSize: 14, fontWeight: "800", color: "#012169" },
  budgetModalContainer: {
  width: "95%",          // ✅ take 90% of screen width instead of fixed px
  maxHeight: 444,
  backgroundColor: "#fff",
  borderRadius: 24,
  padding: 14,
  alignSelf: "center",
  marginHorizontal: 20,  // ✅ adds left & right gap
},

  /* === Account Modal Styles === */
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  modalContainer: {
    width: 376,
    maxWidth: 404,
    height: 310,
    backgroundColor: "#fff",
    alignSelf: "center",
    borderRadius: 16,
    padding: 14,
  },
  stick: {
    width: 44.87,
    height: 0,
    borderWidth: 0.93,
    borderColor: "#000",
    alignSelf: "center",
    marginBottom: 12,
  },
   stick2: {
    width: 44.87,
    height: 0,
    borderWidth: 0.93,
    borderColor: "#000",
    alignSelf: "center",
    marginBottom: 12,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  cancelButton: {
    width: 68,
    height: 35,
    borderRadius: 8,
    backgroundColor: "#0121690D",
    alignItems: "center",
    justifyContent: "center",
  },
  cancelText: { color: "#012169", fontSize: 14 },
  doneButton: {
    width: 100,
    height: 35,
    borderRadius: 8,
    backgroundColor: "#34C7591F",
    alignItems: "center",
    justifyContent: "center",
  },
  doneText: { color: "#34C759", fontSize: 14, fontWeight: "bold" },
  modalTitle: { fontSize: 18, fontWeight: "700", marginBottom: 12 },
  accountCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#131C66",
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  bankIcon: { width: 32, height: 32, marginRight: 12 },
  cardAccountNumber: { fontSize: 16, fontWeight: "500", color: "#000" },
});
