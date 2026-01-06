// app/(customer)/(tabs)/home/index.tsx
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useRef } from "react";
import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../../../../context/ThemeContext";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.85;

type Order = {
  id: string;
  status: "Active" | "Pending" | "Completed";
  subtitle: string;
  total: string;
};

const QUICK_SERVICES = [
  { key: "dry", label: "Dry Clean", icon: "water" },
  { key: "wash", label: "Wash & Fold", icon: "cloud-upload" },
  { key: "iron", label: "Ironing", icon: "hardware-chip" },
  { key: "alter", label: "Alteration", icon: "hammer" },
];

const ORDERS: Order[] = [
  {
    id: "2481",
    status: "Active",
    subtitle: "Pickup Scheduled • Today 4 PM",
    total: "$38.50",
  },
  {
    id: "2480",
    status: "Pending",
    subtitle: "Scheduled • Mon, Nov 27",
    total: "$25.00",
  },
  {
    id: "2479",
    status: "Completed",
    subtitle: "Delivered • Nov 24, 2023",
    total: "$52.75",
  },
  {
    id: "2478",
    status: "Completed",
    subtitle: "Delivered • Nov 20, 2023",
    total: "$15.00",
  },
];

export default function Home() {
  const { theme, isDark } = useTheme();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };
  const onPressOut = () => {
    Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }).start();
  };

  const getStatusStyle = (status: Order["status"]) => {
    switch (status) {
      case "Active":
        return { bg: "#0EA5A4", text: "#042F2E" }; // teal-ish active
      case "Pending":
        return { bg: "#F59E0B", text: "#3B2F00" }; // amber
      case "Completed":
        return { bg: "#10B981", text: "#042F1F" }; // green
      default:
        return { bg: theme.border, text: theme.text };
    }
  };

  return (
    <View style={[styles.root, { backgroundColor: theme.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* top spacing so content doesn't hide under header */}
        <View style={{ height: 12 }} />

        {/* Header text */}
        <View style={styles.header}>
          <Text style={[styles.brand, { color: theme.primary }]}>
            LUXE LAUNDRY
          </Text>
          <Text style={[styles.heading, { color: theme.text }]}>
            Premium Laundry Care
          </Text>
        </View>

        {/* HERO CAROUSEL (static cards) */}
        <ScrollView
          horizontal
          pagingEnabled
          snapToInterval={CARD_WIDTH + 16}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16 }}
        >
          {[
            { tag: "FEATURED", title: "24/7 Pickup & Delivery" },
            { tag: "PREMIUM", title: "Dry Cleaning & Steam Press" },
            { tag: "FAST", title: "Express Delivery < 24 Hrs" },
          ].map((item, i) => (
            <View
              key={i}
              style={[
                styles.heroCard,
                { backgroundColor: theme.card, borderColor: theme.border },
              ]}
            >
              <Text style={[styles.heroTag, { color: theme.primary }]}>
                {item.tag}
              </Text>
              <Text style={[styles.heroTitle, { color: theme.text }]}>
                {item.title}
              </Text>
            </View>
          ))}
        </ScrollView>

        {/* CTA */}
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            onPress={() => router.push("/book-pickup")}
            style={[styles.ctaButton, { backgroundColor: theme.primary }]}
          >
            <Text style={styles.ctaText}>Place Order / Book Pickup</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Offer Card */}
        <View
          style={[
            styles.offerCard,
            {
              backgroundColor: isDark ? "#0F1720" : "#F8FAFC",
              borderColor: "#D4AF37",
            },
          ]}
        >
          <Text style={[styles.offerTag, { color: "#D4AF37" }]}>
            LIMITED OFFER
          </Text>
          <Text style={[styles.offerTitle, { color: theme.text }]}>
            First Order 20% OFF
          </Text>
        </View>

        {/* Quick Services */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Quick Services
            </Text>
            <TouchableOpacity onPress={() => router.push("/services")}>
              <Text style={[styles.viewAll, { color: theme.primary }]}>
                View All
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.servicesRow}>
            {QUICK_SERVICES.map((s) => (
              <TouchableOpacity
                key={s.key}
                style={[styles.serviceBox, { backgroundColor: theme.card }]}
                activeOpacity={0.85}
                onPress={() => router.push(`/services/${s.key}`)}
              >
                <View
                  style={[
                    styles.serviceIconWrapper,
                    { backgroundColor: isDark ? "#062B2A" : "#E6FFFA" },
                  ]}
                >
                  <Ionicons
                    name={s.icon as any}
                    size={20}
                    color={theme.primary}
                  />
                </View>
                <Text style={[styles.serviceLabel, { color: theme.subText }]}>
                  {s.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Activity / Order History */}
        <View style={[styles.section, { marginTop: 6 }]}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Recent Activity
            </Text>
            <TouchableOpacity onPress={() => router.push("/orders")}>
              <Text style={[styles.viewAll, { color: theme.primary }]}>
                See All
              </Text>
            </TouchableOpacity>
          </View>

          {/* Order list */}
          {ORDERS.map((o) => {
            const statusStyle = getStatusStyle(o.status);
            return (
              <View
                key={o.id}
                style={[
                  styles.orderCard,
                  { backgroundColor: theme.card, borderColor: theme.border },
                ]}
              >
                <View style={styles.orderRow}>
                  <View>
                    <Text style={[styles.orderId, { color: theme.text }]}>
                      Order #{o.id}
                    </Text>
                    <Text
                      style={[styles.orderSubtitle, { color: theme.subText }]}
                    >
                      {o.subtitle}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.statusPill,
                      { backgroundColor: statusStyle.bg },
                    ]}
                  >
                    <Text
                      style={[styles.statusText, { color: statusStyle.text }]}
                    >
                      {o.status}
                    </Text>
                  </View>
                </View>

                <View style={styles.orderFooter}>
                  <Text style={[styles.orderTotal, { color: theme.text }]}>
                    Total: {o.total}
                  </Text>

                  <View style={styles.orderActions}>
                    {o.status === "Active" && (
                      <TouchableOpacity
                        style={[
                          styles.primarySmall,
                          { backgroundColor: theme.primary },
                        ]}
                        onPress={() => router.push(`/orders/${o.id}`)}
                      >
                        <Text style={styles.primarySmallText}>Track</Text>
                      </TouchableOpacity>
                    )}

                    <TouchableOpacity
                      style={[
                        styles.secondarySmall,
                        { backgroundColor: isDark ? "#0F1720" : "#F3F4F6" },
                      ]}
                      onPress={() => router.push(`/orders/${o.id}`)}
                    >
                      <Text
                        style={[
                          styles.secondarySmallText,
                          { color: theme.text },
                        ]}
                      >
                        View Details
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          })}
        </View>

        <View style={{ height: 60 }} />
      </ScrollView>
    </View>
  );
}

/* ============== Styles ============== */
const styles = StyleSheet.create({
  root: { flex: 1 },

  scrollContent: {
    paddingBottom: 160,
    paddingTop: 8,
  },

  header: { paddingHorizontal: 16, paddingTop: 8, marginBottom: 12 },
  brand: { fontSize: 12, letterSpacing: 2, fontWeight: "700", marginBottom: 2 },
  heading: { fontSize: 26, fontWeight: "800" },

  heroCard: {
    width: CARD_WIDTH,
    height: 200,
    marginRight: 16,
    borderRadius: 22,
    padding: 20,
    justifyContent: "flex-end",
    borderWidth: 1,
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  heroTag: {
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 6,
    letterSpacing: 1,
  },
  heroTitle: { fontSize: 22, fontWeight: "800", lineHeight: 28 },

  ctaButton: {
    marginHorizontal: 16,
    marginTop: 24,
    height: 56,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
    shadowOpacity: 0.35,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
  },
  ctaText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#000",
    letterSpacing: 0.4,
  },

  offerCard: { margin: 16, padding: 18, borderRadius: 18, borderWidth: 1 },
  offerTag: { fontSize: 11, fontWeight: "700", letterSpacing: 1.5 },
  offerTitle: { fontSize: 18, fontWeight: "800", marginTop: 6 },

  /* Quick services */
  section: { marginTop: 8, paddingHorizontal: 16 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  sectionTitle: { fontSize: 18, fontWeight: "800" },
  viewAll: { fontSize: 13, fontWeight: "700" },

  servicesRow: { flexDirection: "row", justifyContent: "space-between" },
  serviceBox: {
    width: "23%",
    aspectRatio: 1,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  serviceIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  serviceLabel: { fontSize: 12, textAlign: "center" },

  /* Orders list */
  orderCard: {
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
  },
  orderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderId: { fontSize: 16, fontWeight: "700" },
  orderSubtitle: { marginTop: 6, fontSize: 12 },

  statusPill: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 },
  statusText: { fontSize: 11, fontWeight: "700" },

  orderFooter: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderTotal: { fontSize: 14, fontWeight: "700" },

  orderActions: { flexDirection: "row", gap: 8 },
  primarySmall: {
    height: 40,
    minWidth: 92,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  primarySmallText: { fontWeight: "800", color: "#000" },

  secondarySmall: {
    height: 40,
    minWidth: 92,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  secondarySmallText: { fontWeight: "700" },
});
