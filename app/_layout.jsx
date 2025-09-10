import { useColorScheme } from "@/hooks/useColorScheme";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import "../global.css";
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    // <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerTitleAlign: "left" }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="landing" options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" options={{ headerShown: false }} />
        <Stack.Screen name="VerifyOtp" options={{ headerShown: false }} />
        <Stack.Screen name="CreatePin" options={{ headerShown: false }} />
        <Stack.Screen name="ConfirmPin" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="TransferToOtherBank" options={{
          title: "Transfer to Other Bank",
          headerTitleAlign: "left",
          headerTitleStyle: {
            fontSize: 16,   // 👈 smaller title font
            fontWeight: "600", // optional: make it semi-bold
          },
        }}/>
        <Stack.Screen name="TransferToOtherBank2" options={{
          title: "Transfer to Other Bank",
          headerTitleAlign: "left",
          headerTitleStyle: {
            fontSize: 16,   // 👈 smaller title font
            fontWeight: "600", // optional: make it semi-bold
          },
        }}/>
        <Stack.Screen name="TransferToOtherBank3" options={{
          title: "Transfer to Other Bank",
          headerTitleAlign: "left",
          headerTitleStyle: {
            fontSize: 16,   // 👈 smaller title font
            fontWeight: "600", // optional: make it semi-bold
          },
        }}/>
        <Stack.Screen name="ConfirmTransfer" options={{
          title: "Confirm Transfer ",
          headerTitleAlign: "left",
          headerTitleStyle: {
            fontSize: 16,   // 👈 smaller title font
            fontWeight: "600", // optional: make it semi-bold
          },
        }}/>
        <Stack.Screen name="SendMoney" options={{ headerShown: false }} />
      </Stack>
    </GestureHandlerRootView>

    // <StatusBar style="auto" />
    // </ThemeProvider>
  );
}
