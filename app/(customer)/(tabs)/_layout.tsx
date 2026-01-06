import { FloatingNotificationButton } from "@/components/layout/FloatingNotificationButton";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { TabBar } from "../../../components/layout/TabBar";
import { NotificationsSheet } from "../notifications";

export default function TabsLayout() {
    const [open, setOpen] = useState(false);

  return (
    <View style={styles.container}>
      <TabBar />
      <Tabs
        screenOptions={{
          headerShown: false,

          tabBarStyle: {
            backgroundColor: "#0B1F1A",
            height: 64,
            paddingBottom: 8,
            paddingTop: 6,
            borderTopWidth: 0,
          },

          tabBarActiveTintColor: "#34F5C5",
          tabBarInactiveTintColor: "#94a3b8",

          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: "600",
          },
        }}
      >
        {/* HOME */}
        <Tabs.Screen
          name="home/index"
          options={{
            title: "Home",
            tabBarLabel: "Home",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={24}
                color={color}
              />
            ),
          }}
        />

        {/* ORDERS */}
        <Tabs.Screen
          name="orders/index"
          options={{
            title: "Orders",
            tabBarLabel: "Orders",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "receipt" : "receipt-outline"}
                size={24}
                color={color}
              />
            ),
          }}
        />

        {/* CHAT */}
        <Tabs.Screen
          name="chat/index"
          options={{
            title: "Chat",
            tabBarLabel: "Chat",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "chatbubble" : "chatbubble-outline"}
                size={24}
                color={color}
              />
            ),
          }}
        />

        {/* PROFILE */}
        <Tabs.Screen
          name="profile/index"
          options={{
            title: "Profile",
            tabBarLabel: "Profile",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "person" : "person-outline"}
                size={24}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
       <FloatingNotificationButton
        count={3}
        onPress={() => setOpen(true)}
      />

      {/* NOTIFICATION SHEET */}
      <NotificationsSheet
        visible={open}
        onClose={() => setOpen(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
