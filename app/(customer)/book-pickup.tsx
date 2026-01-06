import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function BookPickup() {
  return (
    <View className="flex-1 bg-[#0B1F1A] px-4 pt-12">
      <Text className="text-white text-2xl font-bold mb-6">
        Book Pickup
      </Text>

      <TouchableOpacity
        onPress={() => router.back()}
        className="bg-emerald-500 py-4 rounded-xl"
      >
        <Text className="text-center font-bold text-black">
          Confirm Pickup (Dummy)
        </Text>
      </TouchableOpacity>
    </View>
  );
}
