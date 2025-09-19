import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../components/BackButton";
import FixedButton from "../components/FixedButton";
import { AccountSelectionModal, BudgetModal } from "../components/Modals";

export default function AmountEntryScreen() {
  const { accountNumber, clientNumber, receipientName } =
    useLocalSearchParams();
  const [amount, setAmount] = useState("");
  const [modalVisible, setModalVisible] = useState(false); // Account Modal
  const [budgetModalVisible, setBudgetModalVisible] = useState(false); // Budget Modal
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

  const formatAmount = (value) => {
    let numericValue = value.replace(/[^0-9.]/g, "");
    let parts = numericValue.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };

  const handleChange = (digit) => {
    setAmount(formatAmount(amount.replace(/,/g, "") + digit));
  };

  const handleBackspace = () => {
    setAmount(formatAmount(amount.replace(/,/g, "").slice(0, -1)));
  };

  const handleNext = () => {
    setBudgetModalVisible(true);
  };

  const handleSkip = (name) => {
    setBudgetModalVisible(false);
    redirect.push({
      pathname: "ConfirmTransfer",
      params: {
        amount: getNumericAmount(), // 👈 now a number
        accountNumber: accountNumber,
        clientNumber: clientNumber,
        receipientName: receipientName,
        name: name,
      },
    });
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
  const [selectedAccount, setSelectedAccount] = useState(accounts[0].id); // ✅ final choice
  const [tempSelectedAccount, setTempSelectedAccount] =
    useState(selectedAccount); // ✅ temp choice

  const getNumericAmount = () => {
    if (!amount) return 0;
    return parseFloat(amount.replace(/,/g, ""));
  };

  // Dummy Budgets
  const budgets = [
    {
      id: 1,
      name: "House",
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

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Header */}
      <View style={styles.headerWrapper}>
        <Header title="Transfer to other bank" />
      </View>

      <View style={styles.container}>
        {/* Amount Entry */}
        <View style={styles.amountWrapper}>
          <TextInput
            style={styles.amountInput}
            placeholder="0.00"
            placeholderTextColor="#ccc"
            value={amount}
            editable={false}
          />
          {amount !== "" && <Text style={styles.birrText}> Birr</Text>}
        </View>

        {/* Label for Account Cylinder */}
        <Text style={styles.selectAccountLabel}>Select Account</Text>

        {/* Account Cylinder */}
        <TouchableOpacity
          style={styles.accountCylinder}
          onPress={() => {
            setTempSelectedAccount(selectedAccount); // ✅ reset temp selection
            setModalVisible(true);
          }}
        >
          <Text style={styles.accountNumber}>
            {accounts.find((a) => a.id === selectedAccount)?.number}
          </Text>
          <Ionicons name="chevron-down" size={11} color="#000000" />
        </TouchableOpacity>

        {/* Available Amount */}
        <View style={styles.availableAmountWrapper}>
          <Text style={styles.availableLabel}>Available Amount: </Text>
          <Text style={styles.availableValue}>ETB 20,000.00</Text>
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
        </View>

        <View style={styles.footer}>
          <FixedButton
            title="Next"
            onPress={handleNext}
            containerStyle={{
              marginBottom: 0,
              backgroundColor: "transparent",
            }}
            buttonStyle={{ backgroundColor: "#003366" }}
          />
        </View>

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
        {/* === Budget Selection Modal === */}
        <BudgetModal
          visible={budgetModalVisible}
          budgets={budgets}
          toggleEnabled={toggleEnabled}
          setToggleEnabled={setToggleEnabled}
          onSkip={() => handleSkip(budgetName)}
          onClose={() => setBudgetModalVisible(false)}
          onSelectBudget={(budgetName) => handleSkip(budgetName)}
        />
      </View>
    </View>
  );
}

// Styles
const KEY_WIDTH = 124.36;
const KEY_HEIGHT = 78.54;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 100,
    backgroundColor: "#fff",
  },
  amountWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: -2,
    minWidth: "80%",
  },
  amountInput: {
    fontSize: 48,
    color: "#012169",
    textAlign: "center",
    flexShrink: 1,
    fontWeight: "bold",
  },
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
    marginBottom: 12,
  },
  accountNumber: {
    fontSize: 16,
    color: "#131C66",
    marginLeft: 5,
    fontWeight: 400,
  },
  keyboard: { width: "100%", alignItems: "center" },
  keyRow: { flexDirection: "row", marginBottom: 8 },
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
  nextButton: {
    width: "90%",
    height: 56,
    backgroundColor: "#131C66",
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  nextButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  availableAmountWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  availableLabel: { fontSize: 16, color: "#929292" },
  availableValue: { fontSize: 16, fontWeight: "900", color: "#131C66" },
  headerWrapper: {
    paddingBottom: 8,
    marginBottom: 8,
    marginTop: 30,
    marginLeft: 20,
  },
  footer: { width: "100%", marginTop: "-8%" },
  selectAccountLabel: {
    fontSize: 16,
    color: "#929292",
    marginBottom: 10,
    fontWeight: 350,
  },
});
