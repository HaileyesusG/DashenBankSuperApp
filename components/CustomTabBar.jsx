import React from "react";
import { View, TouchableOpacity, StyleSheet, Image, Dimensions, Text } from "react-native";

const { width } = Dimensions.get("window");

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const { routes, index: activeIndex } = state;

  return (
    <View style={styles.container}>
      {/* Curve Image as background */}
      <Image
        source={require("../assets/images/Subtract.png")}
        style={[styles.curveImage, { width }]}
        resizeMode="stretch"
      />

      {/* Tab buttons on top */}
      <View style={styles.tabs}>
        {routes.map((route, idx) => {
          const { options } = descriptors[route.key];
          const isFocused = activeIndex === idx;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const Icon = options.tabBarIcon;
          const label = options.title ?? route.name; // use title if defined

          const color = isFocused ? "#003366" : "gray"; // deep blue if active, gray if inactive

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={styles.tabButton}
            >
              {Icon && Icon({ color, size: 26 })}
              <Text style={[styles.label, { color }]}>{label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default CustomTabBar;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 90,
  },
  curveImage: {
    position: "absolute",
    bottom: 0,
    height: 90,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: "100%",
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 12,
    marginTop: 2,
  },
});
