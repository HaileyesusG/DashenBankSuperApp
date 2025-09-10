import React from "react";
import { View, Text, StyleSheet, TouchableOpacity,Image } from "react-native";
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { CurvedBottomBarExpo } from "react-native-curved-bottom-bar";
import { Slot } from "expo-router";
import { useRouter } from "expo-router";
export default function TabLayout() {
  const router = useRouter();
  return (
    <CurvedBottomBarExpo.Navigator
      type="DOWN"
      style={styles.bottomBar}
      height={65}
      circleWidth={60}
      bgColor="white"
      initialRouteName="homeTab"
      borderTopLeftRight
      renderCircle={({ navigate }) => (
        <TouchableOpacity
          style={styles.circleButton}
          onPress={() => router.push("/Qrscanner")} 
        >
           <Image
      source={require("../../assets/images/QR.png")} // adjust path
      style={{ width: 60, height: 60,  }}
      resizeMode="contain"
    />
        </TouchableOpacity>
      )}
      tabBar={({ routeName, selectedTab, navigate }) => {
        let icon = null;
        let label = "";

        if (routeName === "homeTab") {
          icon = (
            <Ionicons
              name="home"
              size={26}
              color={selectedTab === "homeTab" ? "#131C66" : "gray"}
            />
          );
          label = "Home";
        } else if (routeName === "miniAppsTab") {
          icon = (
            <MaterialCommunityIcons
              name="apps"
              size={26}
              color={selectedTab === "miniAppsTab" ? "#131C66" : "gray"}
            />
          );
          label = "Mini Apps";
        } else if (routeName === "transactionsTab") {
          icon = (
            <FontAwesome5
              name="exchange-alt"
              size={22}
              color={selectedTab === "transactionsTab" ? "#131C66" : "gray"}
            />
          );
          label = "Transactions";
        } else if (routeName === "profileTab") {
          icon = (
            <Ionicons
              name="person-circle"
              size={26}
              color={selectedTab === "profileTab" ? "#131C66" : "gray"}
            />
          );
          label = "Profile";
        }

        return (
          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => navigate(routeName)}
          >
            {icon}
            <Text
              style={[
                styles.tabLabel,
                { color: selectedTab === routeName ? "#131C66" : "gray" },
              ]}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      }}
    >
      {/* Home tab without header */}
      <CurvedBottomBarExpo.Screen
        name="homeTab"
        position="LEFT"
        component={() => <Slot name="homeTab" />}
        options={{ headerShown: false }}
      />
      <CurvedBottomBarExpo.Screen
        name="miniAppsTab"
        position="LEFT"
        component={() => <Slot name="miniAppsTab" />}
      />
      <CurvedBottomBarExpo.Screen
        name="transactionsTab"
        position="RIGHT"
        component={() => <Slot name="transactionsTab" />}
      />
      <CurvedBottomBarExpo.Screen
        name="profileTab"
        position="RIGHT"
        component={() => <Slot name="profileTab" />}
      />
    </CurvedBottomBarExpo.Navigator>
  );
}

const styles = StyleSheet.create({
  bottomBar: {
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  circleButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#131C66",
    alignItems: "center",
    justifyContent: "center",
    bottom: 28,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 6,
  },
  tabLabel: {
    fontSize: 11,
    marginTop: 2,
    fontWeight: "600",
  },
});
