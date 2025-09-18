import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
const { width } = Dimensions.get("window");

const balanceCards = [
  {
    id: 1,
    owner: "Solomon",
    balance: "30,0000.00 USD",
    accountNumber: "1234567890",
    budget: "5,000.000 USD",
  },
];

const IconWrapper = ({ source }) => (
  <View
    style={{
      width: 50, 
      height: 50,
      borderRadius: 25,
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Image
      source={source}
      style={{ width: 50, height: 50, resizeMode: "contain" }}
    />
  </View>
);

const matrixData = [
  [
    // page 1
    [
      {
        icon: (
          <IconWrapper
            source={require("../../assets/images/SendToDashen.png")}
          />
        ),
        label: "Send To Dashen",
      },
      {
        icon: (
          <IconWrapper source={require("../../assets/images/Other Bank.png")} />
        ),
        label: "Send To Other",
      },
      {
        icon: (
          <IconWrapper source={require("../../assets/images/Wallet.png")} />
        ),
        label: "Send To Wallet",
      },
      {
        icon: <IconWrapper source={require("../../assets/images/Chat.png")} />,
        label: "Chat Banking",
      },
    ],
    [
      {
        icon: <IconWrapper source={require("../../assets/images/Topup.png")} />,
        label: "Mobile Top-up",
      },
      {
        icon: (
          <IconWrapper source={require("../../assets/images/Payment.png")} />
        ),
        label: "Bill Payment",
      },
      {
        icon: (
          <IconWrapper
            source={require("../../assets/images/MerchantPay.png")}
          />
        ),
        label: "Merchant Payment",
      },
      {
        icon: <IconWrapper source={require("../../assets/images/Money.png")} />,
        label: "Request Money",
      },
    ],
  ],
];

//Ad Cards

const AdData = [
  { id: 1, image: require("../../assets/images/OrderNow.png") },
  { id: 2, image: require("../../assets/images/Budget.png") },
];

const renderAdCard = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
    </View>
  );


export default function Home() {
  const [showBalance, setShowBalance] = useState(false);
  const [activeBalanceIndex, setActiveBalanceIndex] = useState(0);
  const [activeMatrixIndex, setActiveMatrixIndex] = useState(0);
  const [activeAdIndex, setActiveAdIndex] = useState(0);
  const redirect = useRouter();
  const renderCard = ({ item }) => {
    if (!item) return null;
    return (
      <ImageBackground
        source={require("../../assets/images/Balance Card.png")}
        style={styles.card}
        imageStyle={{ borderRadius: 19 }}
      >
        {/* Top Row */}
        <View style={styles.cardTopRow}>
          <Text style={styles.balanceText}>My Balance</Text>
          <View style={styles.showRow}>
            <Text style={styles.showText}>{showBalance ? "Hide" : "Show"}</Text>
            <TouchableOpacity onPress={() => setShowBalance(!showBalance)}>
              <Ionicons
                name={showBalance ? "eye-off" : "eye"}
                size={20}
                color="white"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Owner */}
        <Text style={styles.owner}>{item.owner}</Text>
        <Text style={styles.amount}>
          {showBalance ? item.balance : "****************"}
        </Text>

        {/* Bottom Two Boxes */}
        <View style={styles.bottomRow}>
          {/* Account Number */}
          <View style={styles.bottomBox}>
            <View style={styles.rowInsideBox}>
              <FontAwesome5 name="university" size={20} color="white" />
              <View style={styles.textColumn}>
                <Text style={styles.bottomLabel}>Account Number</Text>
                <Text style={styles.bottomValue}>
                  {showBalance ? item.accountNumber : "*********"}
                </Text>
              </View>
            </View>
          </View>

          {/* Budget */}
          <View style={styles.bottomBox}>
            <View style={styles.rowInsideBox}>
              <MaterialIcons
                name="account-balance-wallet"
                size={20}
                color="white"
              />
              <View style={styles.textColumn}>
                <Text style={styles.bottomLabel}>Budget</Text>
                <Text style={styles.bottomValue}>
                  {showBalance ? item.budget : "******"}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  };


const renderMatrixPage = ({ item, index }) => {

  return (
    <View style={styles.matrixPage}>
      {item.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((cell, cellIndex) => (
            <TouchableOpacity
              key={cellIndex}
              style={styles.iconBox}
              onPress={() => {
                if (cell.label === "Send To Other") {
                  redirect.push("/TransferToOtherBank");
                }
                else if (cell.label === "Merchant Payment") {
                  redirect.push("/QrscannerM");
                } else {
                  console.log("ok");
                }
              }}
            >
              {cell.icon}
              <Text style={styles.iconLabel}>{cell.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
};


  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Image
          source={require("../../assets/images/Dashen Logo.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>Dashen Bank Super App</Text>

        <TouchableOpacity>
          <Ionicons
            name="refresh"
            size={22}
            color="#003366"
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons
            name="notifications-outline"
            size={22}
            color="#003366"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <ScrollView style={{marginTop:10}}>
        <View style={{ flex: 1, alignItems: "center" }}>
          {/* Balance Cards Carousel */}
          <Carousel
            loop={balanceCards.length > 1}
            width={width * 0.95}
            height={228}
            data={balanceCards}
            autoPlay={false}
            scrollAnimationDuration={500}
            onSnapToItem={(index) => setActiveBalanceIndex(index)}
            renderItem={({ item }) => renderCard({ item })}
          />

          {/* Balance Cards Pagination Dots */}
          <View style={styles.pagination}>
            {balanceCards.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  activeBalanceIndex === index
                    ? { backgroundColor: "#003366" }
                    : { backgroundColor: "gray" },
                ]}
              />
            ))}
          </View>

          {/* Matrix Carousel */}
          <View style={{ marginTop: 20 }}>
            <Carousel
              loop={false}
              width={width}
              height={200}
              data={matrixData}
              onSnapToItem={(index) => setActiveMatrixIndex(index)}
              renderItem={({ item }) => renderMatrixPage({ item })}
            />
            {/* Matrix Pagination Dots */}
            <View style={styles.matrixPagination}>
              {matrixData.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.matrixDot,
                    activeMatrixIndex === index
                      ? { backgroundColor: "#003366" }
                      : { backgroundColor: "gray" },
                  ]}
                />
              ))}
            </View>
          </View>
<View style={{ marginBottom:20 }}>
      <Carousel
        loop
        width={width * 0.98}
        height={150}
        data={AdData}
        scrollAnimationDuration={500}
        autoPlay
        autoPlayInterval={3000}
        onSnapToItem={(index) => setActiveAdIndex(index)}
        renderItem={renderAdCard}
        style={{ alignSelf: "center" }}
      />

      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {AdData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.matrixDot,
              activeAdIndex === index
                ? { backgroundColor: "#003366" }
                : { backgroundColor: "gray" },
            ]}
          />
        ))}
      </View>
      <View>
        {/* My Cards Button */}
      <TouchableOpacity style={styles.myCardsButton}>
        <View style={styles.myCardsLeft}>
          <Image
            source={require("../../assets/images/WalletIcon.png")} // your wallet icon
            style={{ width: 45, height: 45, resizeMode: "contain" }}
          />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.myCardsTitle}>My Cards</Text>
            <Text style={styles.myCardsSubtitle}>
              FCY Request, Get Cards & Card Management
            </Text>
          </View>
        </View>

        <View style={styles.myCardsRight}>
          <Ionicons name="chevron-forward" size={18} color="#003366" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.myCardsButton}>
        <View style={styles.myCardsLeft}>
          <Image
            source={require("../../assets/images/handCoin.png")} 
            style={{ width: 45, height: 45, resizeMode: "contain" }}
          />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.myCardsTitle}>Smart Pay</Text>
            <Text style={styles.myCardsSubtitle}>
              Add Beneficiary, Schedule Payments
            </Text>
          </View>
        </View>

        <View style={styles.myCardsRight}>
          <Ionicons name="chevron-forward" size={18} color="#003366" />
        </View>
      </TouchableOpacity>
      </View>
    </View>
        </View>
      </ScrollView>

      {/* Circle Image */}
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    alignItems: "center",
  },

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "95%",
    marginTop: 40,
    paddingHorizontal: 10,
  },
  logo: {
    width: 35,
    height: 35,
    resizeMode: "contain",
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "#003366",
  },
  icon: {
    marginLeft: 15,
  },
  textColumn: {
    marginLeft: 8,
    justifyContent: "center",
  },

  card: {
    width: "auto",
    height: 220,
    borderRadius: 15,
    padding: 20,
    marginTop: 10,
  },
  cardTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  balanceText: {
    fontSize: 16,
    fontWeight: "400",
    color: "white",
  },
  rowInsideBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  showRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  showText: {
    marginRight: 5,
    fontSize: 14,
    color: "white",
    marginBottom: 3,
  },
  owner: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 10,
    fontWeight: "bold",
    color: "white",
  },
  amount: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
    marginVertical: 8,
  },
  bottomRow: {
    flexDirection: "row",
    marginTop: 15,
  },
  bottomBox: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 5,
    alignItems: "center",
  },
  bottomLabel: {
    fontSize: 12,
    color: "white",
    marginTop: 5,
  },
  bottomValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
    marginTop: 2,
  },

  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },


  circleImage: {
    width: 60,
    height: 60,
    borderRadius: 35,
    position: "absolute",
    bottom: 45,
    left: width / 2 - 35,
    backgroundColor: "#003366",
    marginBottom: 15,
    marginLeft:5,

    // Center the icon inside the circle
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: 15,
  },

  // Matrix Carousel Styles
  matrixPage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 5,
  },
  iconBox: {
    justifyContent: "center",
    alignItems: "center",
    width: 70,
  },
  iconLabel: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 5,
    color: "#003366",
  },
  matrixPagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  matrixDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
   cardAd: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 3,
  },
  image: {
    width: "auto",
    height: "60%",
    resizeMode: "cover",
    borderRadius:15
  },
  dot2: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    
  },
  title2: {
    position: "absolute",
    bottom: 5,
    left: 10,
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
    myCardsButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 22,
    marginHorizontal: 15,
    marginTop: 15,
    elevation: 2, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  myCardsLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  myCardsTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#003366",
  },
  myCardsSubtitle: {
    fontSize: 12,
    color: "gray",
    marginTop: 2,
  },
  myCardsRight: {
    marginLeft: 25,
  },
});
