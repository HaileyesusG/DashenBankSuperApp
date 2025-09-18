import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";
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
   const { accountNumber,clientNumber,receipientName } = useLocalSearchParams();
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
const budgetName= "Off Budget";
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
        accountNumber:accountNumber,
        clientNumber:clientNumber,
        receipientName:receipientName,
        name:name
      },
    })
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
const [tempSelectedAccount, setTempSelectedAccount] = useState(selectedAccount); // ✅ temp choice


  const handleSelectAccount = (id) => setSelectedAccount(id);

// Dummy Budgets
  const budgets = [
    {
      id: 1,
      name: "House Rental",
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


  return (
    <View style={{flex:1,backgroundColor: "#fff"}}>
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

      {/* === Account Selection Modal === */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, { marginBottom: 4 }]}>
            {/* Stick */}
            <View style={styles.stick} />

            {/* Buttons */}
            <View style={styles.modalHeader}>
              <TouchableOpacity
  style={styles.cancelButton}
  onPress={() => setModalVisible(false)} // ✅ just close, don't update final state
>
  <Text style={styles.cancelText}>Cancel</Text>
</TouchableOpacity>

              <TouchableOpacity
  style={styles.doneButton}
  onPress={() => {
    setSelectedAccount(tempSelectedAccount); // ✅ commit the choice
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
        tempSelectedAccount === account.id && { backgroundColor: "#131C66" },
      ]}
    >
      {tempSelectedAccount === account.id && (
        <Ionicons name="checkmark" size={10} color="#fff" />
      )}
    </View>
    <Image source={account.icon} style={styles.bankIcon} resizeMode="contain" />
    <Text style={styles.cardAccountNumber}>{account.number}</Text>
  </TouchableOpacity>
))}



          </View>
        </View>
      </Modal>
      {/* Budget Selection Modal */}
      <Modal
        visible={budgetModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setBudgetModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.budgetModalContainer, { marginBottom: 12 }]}>
            {/* Stick */}
            <View style={styles.stick} />

            {/* Header */}
            <View style={styles.budgetHeader}>
              <Text style={styles.budgetTitle}>Select Budget</Text>
              <TouchableOpacity
  style={styles.skipButton}
  onPress={
    ()=>
    handleSkip(budgetName)

  }
>
  <Text style={styles.skipText}>Skip</Text>
</TouchableOpacity>


            </View>

            {/* Budget Selection Toggle */}
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

            {/* Budget Grid ... */}
            <FlatList
              data={budgets}
              keyExtractor={(item) => item.id.toString()}
              numColumns={3}
              columnWrapperStyle={{ justifyContent: "space-between" }}
              renderItem={({ item }) => (
                <TouchableOpacity
      style={styles.budgetCard}
      onPress={
        ()=>
       handleSkip(item.name)
      }
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
  accountNumber: { fontSize: 16, color: "#131C66",marginLeft:5,fontWeight:400 },
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

  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.2)",
  },

  /** Account Modal */
  modalContainer: {
    width: 376,
    maxWidth: 404,
    height: 302,
    backgroundColor: "#fff",
    alignSelf: "center",
    borderRadius: 16,
    padding: 14,
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
  modalTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#000",
    marginBottom: 12,
  },
  accountCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7F7F7",
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: "#ccc",
    height: 56,
    marginBottom: 8,
    paddingLeft: 25,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 9,
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  selectAccountLabel: { fontSize: 16, color: "#929292", marginBottom: 10 ,fontWeight:350},
  stick: {
    width: 44.87,
    height: 0,
    borderWidth: 0.93,
    borderColor: "#000",
    alignSelf: "center",
    marginBottom: 12,
  },
  availableAmountWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  availableLabel: { fontSize: 16, color: "#929292" },
  availableValue: { fontSize: 16, fontWeight: "900", color: "#131C66" },
  bankIcon: { width: 24, height: 24, marginRight: 12 },
  cardAccountNumber: { fontSize: 14, color: "#000" },

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
  alignItems: "center",
  marginBottom: 12,
},
  toggleLabel: {
  fontSize: 16,
  fontWeight: "500",
  color: "#000000",
},
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

  toggle: {
  transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }], // keep it small like 27.5 x 15
  marginLeft:4
},
    headerWrapper: {
    paddingBottom: 8,
    marginBottom: 8,
    marginTop: 30,
    marginLeft: 20,
  },
    footer: { width: "100%",marginTop:"-8%" },
});
