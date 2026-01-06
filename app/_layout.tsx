import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "../context/ThemeContext";
export default function RootLayout() {
  return (
    <ThemeProvider>
      {/* StatusBar must be OUTSIDE Stack */}
      <StatusBar style="auto" />

      {/* Stack must contain ONLY Stack.Screen */}
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(customer)" />
      </Stack>
    </ThemeProvider>
  );
}
