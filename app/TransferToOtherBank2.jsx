import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import Header from "../components/BackButton";
// Map keys to actual images
const imageMap = {
  CommercialB: require("../assets/images/CommercialB.png"),
  AwashB: require("../assets/images/AwashB.png"),
  DashenB: require("../assets/images/DashenB.png"),
  ZemenB: require("../assets/images/ZemenB.png"),
  AmharaB: require("../assets/images/AmharaB.png"),
  AbyssiniaB: require("../assets/images/AbyssiniaB.png"),
};

export default function EnterAccountScreen() {
  const { id, name, bank, imageKey } = useLocalSearchParams();
  const [accountNumber, setAccountNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);
  const redirect = useRouter();
  const  receipientName="Kebede Lema Ayenew";
  const handleNext = () => {
    console.log("abebe beso");
    if (!accountNumber) return;
    setLoading(true);
    setHasChecked(true);

    setTimeout(() => {
      setLoading(false);
      setProfile(true);
    }, 2000);
  };

  const handleInputChange = (text) => {
    setAccountNumber(text);

    if (text.length === 0) {
      setProfile(false);
      setLoading(false);
      setHasChecked(false);
    }
  };
  // Build beneficiary data dynamically from params
  const beneficiaries = [
    {
      id: "1",
      number: "4567873648236",
      name: "Abebe Kebede Lemma",
      bank: name,
      logo: imageMap[imageKey] || imageMap["CommercialB"], // fallback if missing
    },
    {
      id: "2",
      number: "1234873648236",
      name: "Samuel Tadesse",
      bank: name,
      logo: imageMap[imageKey] || imageMap["CommercialB"], // fallback if missing
    },
    {
      id: "3",
      number: "567873648236",
      name: "Meles Zenawi",
      bank: name,
      logo: imageMap[imageKey] || imageMap["CommercialB"], // fallback if missing
    },
    {
      id: "4",
      number: "7234873648236",
      name: "Aster Abebe",
      bank: name,
      logo: imageMap[imageKey] || imageMap["CommercialB"], // fallback if missing
    },
    {
      id: "5",
      number: "8234873648236",
      name: "Daniel Gebremedhin",
      bank: name,
      logo: imageMap[imageKey] || imageMap["CommercialB"], // fallback if missing
    },
  ];
  // Filter beneficiaries dynamically
const filteredBeneficiaries = beneficiaries.filter(
  (b) =>
    b.number.includes(accountNumber) || 
    b.name.toLowerCase().includes(accountNumber.toLowerCase())
);


  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
    behavior={Platform.OS === "ios" ? "padding" : undefined}
    keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0} // helps on iOS
    >
      {/* Header */}
            <View style={styles.headerWrapper}>
              <Header title="Transfer to other bank" />
            </View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.mainContainer}>
          <FlatList
             data={accountNumber.length > 0 ? filteredBeneficiaries : beneficiaries}
  keyExtractor={(item) => item.id}
  style={styles.container}
  contentContainerStyle={{ paddingBottom: 120 }}
            ListHeaderComponent={
              <>
                <Text style={styles.headerText}>Enter Account Number</Text>
                <Text style={styles.subHeaderText}>
                  Enter recipient account number
                </Text>
                <View style={{ height: 20 }} />
                <Text style={styles.labelText}>Account Number</Text>
                <TextInput
                  style={styles.inputField}
                  placeholder="00000000000000"
                  placeholderTextColor="#999"
                  value={accountNumber}
                  onChangeText={handleInputChange}
                  keyboardType="numeric"
                />
                <View style={{ height: 30 }} />

                {accountNumber.length === 0 && !hasChecked && (
                  <Text style={styles.beneficiariesLabel}>Beneficiaries</Text>
                )}

                {profile && (
                  <TouchableOpacity
  onPress={() =>
    redirect.push({
      pathname: "TransferToOtherBank3",
      params: {
        accountNumber: "3742873648236", // 👈 pass account number here
        clientNumber: accountNumber,
        receipientName:receipientName
      },
    })
  }
>

                    <View style={styles.profileWrapper}>
                      <Image
                        source={require("../assets/images/DotLayer.png")}
                        style={styles.profileBackground}
                      />
                      <View style={styles.profileOverlay}>
                        <Image
                          source={imageMap[imageKey] || imageMap["CommercialB"]}
                          style={styles.profileImage}
                        />
                        <View style={styles.profileTextContainer}>
                          <Text style={styles.profileName}>
                          {receipientName}
                          </Text>
                          <Text style={styles.profileAccount}>
                            {accountNumber}
                          </Text>
                        </View>
                        <View style={styles.profileIconContainer}>
                          <Ionicons
                            name="chevron-forward"
                            size={24}
                            color="black"
                          />
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              </>
            }
            renderItem={({ item }) => (
              <TouchableOpacity
  onPress={() =>
    redirect.push({
      pathname: "TransferToOtherBank3",
      params: {
        accountNumber: "3742873648236",
        clientNumber: item.number, // 👈 pass account number here
        receipientName:item.name
      },
    })
  }
  style={styles.beneficiaryContainer}
>
  <Image source={item.logo} style={styles.beneficiaryLogo} />
  <View style={styles.beneficiaryTextContainer}>
    <Text style={styles.beneficiaryName}>{item.name}</Text>
    <Text style={styles.beneficiaryBank}>
      {item.bank} ({item.number})
    </Text>
  </View>
  <Ionicons name="chevron-forward" size={24} color="#000" />
</TouchableOpacity>

            )}
            ItemSeparatorComponent={({ leadingItem }) => {
              // show separator only if it's not the last item
              const isLastItem =
                beneficiaries[beneficiaries.length - 1].id === leadingItem.id;
              if (isLastItem) return null;

              return <View style={styles.dashedSeparator} />;
            }}
          />

          {/* Always visible button */}
 {/* Fixed Bottom Button (will move up with keyboard) */}
        <View style={styles.bottomButtonWrapper}>
  <Pressable
    style={[
      styles.bottomButton,
      accountNumber.length >= 3 ? styles.buttonEnabled : styles.buttonDisabled,
    ]}
    onPress={handleNext}
    disabled={loading || accountNumber.length < 3} // 👈 now requires >= 3
  >
    {loading ? (
      <>
        <ActivityIndicator
          size="small"
          color="#fff"
          style={{ marginRight: 8 }}
        />
        <Text style={styles.buttonText}>Check Account</Text>
      </>
    ) : (
      <Text style={styles.buttonText}>Next</Text>
    )}
  </Pressable>
</View>

        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1, padding: 20 },
  headerText: { fontSize: 18, fontWeight: "bold", color: "#000" },
  subHeaderText: { fontSize: 14, color: "#888", marginTop: 5 },
  labelText: { fontSize: 16, color: "#000", marginBottom: 10 },
  inputField: {
    width: "100%",
    height: 52,
    backgroundColor: "#eee",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#000",
  },
  beneficiariesLabel: { fontSize: 16, color: "#9E9E9E", marginBottom: 10 },
  beneficiaryContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
  },
  beneficiaryLogo: { width: 44, height: 44, borderRadius: 5, marginRight: 10 },
  beneficiaryTextContainer: { flex: 1 },
  beneficiaryName: { fontSize: 14, fontWeight: "600", color: "#000" },
  beneficiaryBank: { fontSize: 12, color: "#888" },

bottomButton: {
  position: "absolute",
  bottom: 20,
  height: 50,
  backgroundColor: "#003366",   // 👈 static background
  borderRadius: 25,
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "row",
  marginBottom: 20,
  width:"100%"             // 👈 this pushes it further offscreen
},

buttonDisabled: {
  backgroundColor: "#ccc", // disabled gray
},

buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },

  profileWrapper: {
    marginTop: -20,
    alignItems: "center",
  },
  
  profileBackground: {
    width: "100%", // keep original width or use '100%' minus margin
    height: 80,
    borderRadius: 10,
    marginHorizontal: 10, // space from left & right edges
  },
  profileOverlay: {
    position: "absolute",
    top: 0,
    left: 10, // match background's marginLeft
    right: 10, // match background's marginRight
    height: 80,
    flexDirection: "row",
    alignItems: "center",
  },
  bottomButtonWrapper: {
  position: "absolute",
  bottom: 20,
  left: 20,
  right: 20,
},
  profileImage: {
    width: 66,
    height: 66,
    borderRadius: 33,
    borderWidth: 2,
    borderColor: "#fff",
    // now it sits flush with left of overlay
  },
  profileTextContainer: { flex: 1, justifyContent: "center" },
  profileName: { fontSize: 16, fontWeight: "bold", color: "#000" },
  profileAccount: { fontSize: 13, color: "#000", marginTop: 2 },
  profileIconContainer: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  dashedSeparator: {
    width: "100%",
    borderBottomWidth: 0.6,
    borderStyle: "dashed",
    borderColor: "#00000066",
    marginVertical: 8, // optional spacing
    alignSelf: "center",
  },
    headerWrapper: {
    paddingBottom: 8,
    marginBottom: 8,
    marginTop: 30,
    marginLeft: 20,
  },
});
