import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Switch,
  FlatList,
} from "react-native";
import Header from "../components/BackButton";
import FixedButton from "../components/FixedButton";

export default function AmountEntryScreen() {
  const { name, account } = useLocalSearchParams();
  const accountNumber = "9234873648236";

  const [amount, setAmount] = useState("");
  const [modalVisible, setModalVisible] = useState(false); // Account Modal
  const [budgetModalVisible, setBudgetModalVisible] = useState(false); // Budget Modal
  const [tipModalVisible, setTipModalVisible] = useState(false); // ✅ Tip Modal
  const [isTipEnabled, setIsTipEnabled] = useState(true); // ✅ Tip toggle
  const [customTip, setCustomTip] = useState(""); // ✅ custom tip input
  const [toggleEnabled, setToggleEnabled] = useState(true);

  const redirect = useRouter();

  // For custom keyboard
  const keys = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    [".", "0", "back"],
  ];
  const budgetName = "Off Budget";

  const formatAmount = (raw) => {
    if (!raw) return "";
    let num = parseInt(raw, 10);
    if (isNaN(num)) return "";
    return num.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handleChange = (digit) => {
    if (digit === ".") return; // ❌ ignore manual dot
    setAmount((prev) => prev + digit);
  };

  const handleBackspace = () => {
    setAmount((prev) => prev.slice(0, -1));
  };

  const getNumericAmount = () => {
    if (!amount) return 0;
    return parseFloat(amount.replace(/,/g, ""));
  };

  const accounts = [
    {
      id: 1,
      number: accountNumber,
      icon: require("../assets/images/BankImage.png"),
    },
    {
      id: 2,
      number: "1234873648236",
      icon: require("../assets/images/BankImage.png"),
    },
    {
      id: 3,
      number: "567873648236",
      icon: require("../assets/images/BankImage.png"),
    },
  ];
  const [selectedAccount, setSelectedAccount] = useState(accounts[0].id);
  const [tempSelectedAccount, setTempSelectedAccount] =
    useState(selectedAccount);

  const handleSelectAccount = (id) => setSelectedAccount(id);

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
const handleSkip = (nameB) => {
    setBudgetModalVisible(false);
        redirect.push({
      pathname: "ConfirmTransfer2",
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
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Header */}
      <View style={styles.headerWrapper}>
        <Header title="Merchant Payment" />
      </View>

      <View style={styles.body}>
        <Text style={styles.selectAccount}>Add Amount</Text>
        <Text style={styles.subText}>
          Please add your payment amount below
        </Text>
      </View>

      <View style={styles.container}>
        {/* Account Cylinder */}
        <Text style={styles.selectAccountLabel}>Select Account</Text>
        <TouchableOpacity
          style={styles.accountCylinder}
          onPress={() => {
            setTempSelectedAccount(selectedAccount);
            setModalVisible(true);
          }}
        >
          <Text style={styles.accountNumber}>
            {accounts.find((a) => a.id === selectedAccount)?.number}
          </Text>
          <Ionicons name="chevron-down" size={11} color="#000000" />
        </TouchableOpacity>

        {/* Amount Input */}
        <View style={styles.amountWrapper}>
          <TextInput
            style={styles.amountInput}
            placeholder="0.00"
            placeholderTextColor="#ccc"
            value={formatAmount(amount)}
            editable={false}
          />
          {amount !== "" && <Text style={styles.birrText}> Birr</Text>}
        </View>

        {/* Custom Keyboard */}
        <View style={styles.keyboard}>
          {keys.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.keyRow}>
              {row.map((key) =>
                key === "back" ? (
                  <TouchableOpacity
                    key={key}
                    style={[styles.key, styles.backKey]}
                    onPress={handleBackspace}
                  >
                    <Image
                      source={require("../assets/images/Vector.png")}
                      style={{ width: 33.54, height: 24.44 }}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    key={key}
                    style={styles.key}
                    onPress={() => handleChange(key)}
                  >
                    <Text style={styles.keyText}>{key}</Text>
                  </TouchableOpacity>
                )
              )}
            </View>
          ))}
          <View style={styles.footer}>
            <FixedButton
              title="Next"
              onPress={() => setTipModalVisible(true)} // ✅ open Tip Modal
              containerStyle={{
                marginBottom: 0,
                backgroundColor: "transparent",
              }}
              buttonStyle={{ backgroundColor: "#003366" }}
            />
          </View>
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
                <Text style={styles.tipTitle}>Give A Tip</Text>
                <TouchableOpacity
                  style={styles.skipButton}
                   onPress={() => handleSkip(budgetName)}
                >
                  <Text style={styles.skipText}>Skip</Text>
                </TouchableOpacity>
              </View>

              {/* Toggle Row */}
              <View style={styles.toggleRow2}>
                <Text style={styles.toggleLabel}>Tip selection on Transfers</Text>
                <Switch
                  value={isTipEnabled}
                  onValueChange={setIsTipEnabled}
                  thumbColor="#012169"
                  trackColor={{ false: "#ccc", true: "#012169" }}
                  style={styles.toggleSwitch}
                />
              </View>

              {/* Custom Tip Input */}
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
                        onPress={() => setCustomTip(tip.replace(" Birr", ""))}
                      >
                        <Text style={styles.tipOptionText}>{tip}</Text>
                      </TouchableOpacity>
                    )
                  )}
                </View>
              </View>

              {/* Next Button */}
              <View style={{ marginTop: "auto" }}>
                <FixedButton
                  title="Next"
                  onPress={() => {
                    setTipModalVisible(false);
                    setBudgetModalVisible(true);
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
              <View style={styles.stick} />
              <View style={styles.budgetHeader}>
                <Text style={styles.budgetTitle}>Select Budget</Text>
                <TouchableOpacity
                  style={styles.skipButton}
                  onPress={() => setBudgetModalVisible(false)}
                >
                  <Text style={styles.skipText}>Skip</Text>
                </TouchableOpacity>
              </View>

              {/* Toggle */}
              <View style={styles.toggleRow}>
                <Text style={styles.toggleLabel}>
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
                            backgroundColor: "#F7F7F7",
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
      </View>
    </View>
  );
}

const KEY_WIDTH = 110.36;
const KEY_HEIGHT = 64.54;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: "9%",
    backgroundColor: "#fff",
  },
  amountWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "80%",
  },
    stick: {
    width: 44.87,
    height: 0,
    borderWidth: 0.93,
    borderColor: "#000",
    alignSelf: "center",
    marginBottom: 12,
  },
  amountInput: {
    fontSize: 48,
    color: "#012169",
    textAlign: "center",
    flexShrink: 1,
    fontWeight: "bold",
  },
  toggleSwitch: { width: 30, height: 30, marginLeft:20 },
  footer: { width: "100%" },
  birrText: { fontSize: 48, color: "#012169", fontWeight: "bold" },
  accountCylinder: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F0F0F0",
    width: 172,
    height: 38,
    borderRadius: 19,
    paddingHorizontal: 12,
    marginBottom: -5,
  },
  accountNumber: {
    fontSize: 16,
    color: "#131C66",
    marginLeft: 5,
    fontWeight: "400",
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
  body: { paddingHorizontal: 16, marginTop: 0 },
  selectAccount: {
    fontSize: 28,
    fontWeight: "900",
    color: "#000",
    marginBottom: 6,
    paddingTop: "3%",
  },
  subText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#757575",
    marginBottom: 24,
  },
  keyboard: { width: "100%", alignItems: "center", marginTop: "10%" },
  keyRow: { flexDirection: "row", marginTop: "2%" },
  key: {
    width: KEY_WIDTH,
    height: KEY_HEIGHT,
    backgroundColor: "#FBFBFB",
    marginHorizontal: 4,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
  keyText: { fontSize: 24, color: "#000", fontWeight: "bold" },
  backKey: { backgroundColor: "#FBFBFB" },
  nextButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 16,
  },
  /** Budget Modal */
  budgetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  budgetTitle: { fontSize: 16, fontWeight: "900", color: "#000" },
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
  budgetCard: {
    flex: 1,
    maxWidth: "30%",
    height: 98,
    backgroundColor: "#F9F9F9",
    borderRadius: 12,
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    marginHorizontal: 4,
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
    width: "95%",
    maxHeight: 444,
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 14,
    alignSelf: "center",
    marginHorizontal: 20,
  },
  toggle: {
    transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }],
    marginLeft: 4,
  },
  headerWrapper: {
    paddingBottom: 8,
    marginBottom: 8,
    marginTop: 30,
    marginLeft: 20,
  },
  /** Tip Modal */
  tipOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  tipModal: {
    height: "auto",
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
});
