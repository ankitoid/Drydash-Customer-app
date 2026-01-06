// components/layout/TabBar.tsx
import { CreditCard, Moon, Sun } from "lucide-react-native";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../../context/ThemeContext";

export const TabBar = ({
  notificationCount = 3,
}: {
  notificationCount?: number;
}) => {
  const { theme, isDark, toggleTheme } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.safe, { backgroundColor: theme.background }]}>
      <View style={[styles.row, { paddingTop: insets.top ? 8 : 0 }]}>
        {/* Left: Logo */}
        <View style={styles.left}>
          <Image
            source={require("../../assets/images/drydashlogo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Right: Icons */}
        <View style={styles.right}>
          <TouchableOpacity
            activeOpacity={0.8}
         //   onPress={() => router.push("/wallet")}
            style={styles.iconBtn}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <CreditCard size={20} color={theme.text} />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={toggleTheme}
            style={[styles.iconBtn]}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            {isDark ? (
              <Sun size={18} color={theme.primary} />
            ) : (
              <Moon size={18} color={theme.primary} />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safe: {
    marginTop: 0,
    zIndex: 30,
  },
  row: {
    marginTop:25,
    height: 56,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
  },

  logo: {
    width: 36,
    height: 36,
  },

  right: {
    flexDirection: "row",
    alignItems: "center",
    gap: 0,
  },

  iconBtn: {
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
  },
});
