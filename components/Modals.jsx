// components/Modals.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Image,
  TextInput,
  Switch,
  FlatList,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import FixedButton from "./FixedButton";

/*
  Exports three modal components as named exports:
  - TipModal
  - BudgetModal
  - AccountSelectionModal

  Usage from a screen one level up (e.g. screens/QrPayment.jsx):
    import { TipModal, BudgetModal, AccountSelectionModal } from "../components/Modals";
*/

export function TipModal({ visible, onClose, onSkip, onDone }) {
  const [isTipEnabled, setIsTipEnabled] = useState(false);
  const [customTip, setCustomTip] = useState("");

  useEffect(() => {
    if (!visible) {
      setIsTipEnabled(false);
      setCustomTip("");
    }
  }, [visible]);

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={modalStyles.tipOverlay}>
        <View style={modalStyles.tipModal}>
          <View style={modalStyles.tipHeaderRow}>
            <Text style={modalStyles.tipTitle}>Give A tip</Text>
            <TouchableOpacity style={modalStyles.skipButton} onPress={() => onSkip && onSkip()}>
              <Text style={modalStyles.skipText}>Skip</Text>
            </TouchableOpacity>
          </View>

          <View style={modalStyles.toggleRow2}>
            <Text style={modalStyles.toggleLabel}>Tip selection on Transfers</Text>
            <Switch
              value={isTipEnabled}
              onValueChange={setIsTipEnabled}
              thumbColor="#012169"
              trackColor={{ false: "#ccc", true: "#012169" }}
              style={modalStyles.toggleSwitch}
            />
          </View>

          <View style={modalStyles.customTipBox}>
            <Text style={modalStyles.customTipLabel}>Custom Tip</Text>
            <TextInput
              style={modalStyles.customTipInput}
              keyboardType="phone-pad"
              placeholder="0.00"
              placeholderTextColor="#000000"
              value={customTip}
              onChangeText={setCustomTip}
            />

            <View style={modalStyles.quickTipRow}>
              {["10.00 Birr", "20.00 Birr", "50.00 Birr", "100.00 Birr"].map((tip, index) => (
                <TouchableOpacity
                  key={index}
                  style={modalStyles.tipOption}
                  onPress={() => setCustomTip(tip.replace(" Birr", ""))}
                >
                  <Text style={modalStyles.tipOptionText}>{tip}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={{ marginTop: "auto" }}>
            <FixedButton
              title="Next"
              onPress={() => onDone && onDone({ isTipEnabled, customTip })}
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
  );
}

export function BudgetModal({
  visible,
  onClose,
  budgets = [],
  onSkip,
  onSelectBudget,
  defaultBudgetName = "Off Budget",
}) {
  const [toggleEnabled, setToggleEnabled] = useState(false);

  useEffect(() => {
    if (!visible) setToggleEnabled(false);
  }, [visible]);

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={modalStyles.modalOverlay}>
        <View style={[modalStyles.budgetModalContainer, { marginBottom: 12 }]}> 
          <View style={modalStyles.stick2} />

          <View style={modalStyles.budgetHeader}>
            <Text style={modalStyles.budgetTitle}>Select Budget</Text>
            <TouchableOpacity style={modalStyles.skipButton} onPress={() => onSkip && onSkip(defaultBudgetName)}>
              <Text style={modalStyles.skipText}>Skip</Text>
            </TouchableOpacity>
          </View>

          <View style={modalStyles.toggleRow}>
            <Text style={modalStyles.toggleLabel2}>Budget selection on Transfers</Text>
            <Switch
              value={toggleEnabled}
              onValueChange={setToggleEnabled}
              trackColor={{ false: "#ccc", true: "#012169" }}
              thumbColor="#fff"
              style={modalStyles.toggle}
            />
          </View>

          <FlatList
            data={budgets}
            keyExtractor={(item) => item.id.toString()}
            numColumns={3}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={modalStyles.budgetCard}
                onPress={() => onSelectBudget && onSelectBudget(item.name)}
              >
                <Image source={item.icon} style={modalStyles.budgetIcon} />
                <Text style={modalStyles.budgetName}>{item.name}</Text>
                <Text style={modalStyles.budgetAmount}>{item.amount}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </Modal>
  );
}

export function AccountSelectionModal({
  visible,
  onClose,
  accounts = [],
  selectedAccount,
  onConfirm,
  onCancel,
}) {
  const [tempSelectedAccount, setTempSelectedAccount] = useState(selectedAccount);

  useEffect(() => {
    if (visible) setTempSelectedAccount(selectedAccount);
  }, [visible, selectedAccount]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={() => {
        setTempSelectedAccount(selectedAccount);
        onClose && onClose();
      }}
    >
      <View style={modalStyles.modalOverlay}>
        <View style={[modalStyles.modalContainer, { marginBottom: 4 }]}> 
          <View style={modalStyles.stick} />

          <View style={modalStyles.modalHeader}>
            <TouchableOpacity
              style={modalStyles.cancelButton}
              onPress={() => {
                setTempSelectedAccount(selectedAccount);
                onCancel && onCancel();
              }}
            >
              <Text style={modalStyles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={modalStyles.doneButton}
              onPress={() => onConfirm && onConfirm(tempSelectedAccount)}
            >
              <Text style={modalStyles.doneText}>Done</Text>
            </TouchableOpacity>
          </View>

          <Text style={modalStyles.modalTitle}>Select Account</Text>

          {accounts.map((account) => (
            <TouchableOpacity
              key={account.id}
              style={[
                modalStyles.accountCard,
                tempSelectedAccount === account.id && {
                  borderColor: "#131C66",
                  backgroundColor: "#FEF7FF",
                },
              ]}
              onPress={() => setTempSelectedAccount(account.id)}
            >
              <View
                style={[
                  modalStyles.checkbox,
                  tempSelectedAccount === account.id && {
                    backgroundColor: "#131C66",
                  },
                ]}
              >
                {tempSelectedAccount === account.id && (
                  <Ionicons name="checkmark" size={10} color="#fff" />
                )}
              </View>

              <Image source={account.icon} style={modalStyles.bankIcon} resizeMode="contain" />
              <Text style={modalStyles.cardAccountNumber}>{account.number}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
}

const modalStyles = StyleSheet.create({
  /* === Tip Modal Styles === */
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
  toggleSwitch: { width: 30, height: 30, marginLeft: 20 },
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


