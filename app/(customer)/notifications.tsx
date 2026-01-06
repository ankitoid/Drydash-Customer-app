import { Bell, X } from "lucide-react-native";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../../context/ThemeContext";

const { height } = Dimensions.get("window");
const SHEET_HEIGHT = height * 0.6;

const NOTIFICATIONS = [
  {
    id: 1,
    title: "Pickup Scheduled",
    message: "Your pickup is scheduled today at 4:00 PM",
  },
  {
    id: 2,
    title: "Order Completed",
    message: "Order #2479 has been delivered successfully",
  },
];

export function NotificationsSheet({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const translateY = useRef(new Animated.Value(SHEET_HEIGHT)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: visible ? 0 : SHEET_HEIGHT,
      duration: 280,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      {/* BACKDROP */}
      <TouchableOpacity style={styles.backdrop} onPress={onClose} />

      {/* SHEET */}
      <Animated.View
        style={[
          styles.sheet,
          {
            backgroundColor: theme.card,
            paddingBottom: insets.bottom + 16,
            transform: [{ translateY }],
          },
        ]}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>
            Notifications
          </Text>
          <TouchableOpacity onPress={onClose}>
            <X size={20} color={theme.subText} />
          </TouchableOpacity>
        </View>

        {/* LIST */}
        {NOTIFICATIONS.map((item) => (
          <View
            key={item.id}
            style={[styles.item, { borderColor: theme.border }]}
          >
            <Bell size={18} color={theme.primary} />
            <View style={{ marginLeft: 12, flex: 1 }}>
              <Text style={[styles.itemTitle, { color: theme.text }]}>
                {item.title}
              </Text>
              <Text style={[styles.itemText, { color: theme.subText }]}>
                {item.message}
              </Text>
            </View>
          </View>
        ))}

        {NOTIFICATIONS.length === 0 && (
          <Text style={styles.empty}>No notifications yet</Text>
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 100,
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  sheet: {
    height: SHEET_HEIGHT,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
  },
  item: {
    flexDirection: "row",
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  itemTitle: {
    fontWeight: "700",
    fontSize: 14,
  },
  itemText: {
    fontSize: 12,
    marginTop: 2,
  },
  empty: {
    textAlign: "center",
    marginTop: 40,
    color: "#94a3b8",
  },
});
