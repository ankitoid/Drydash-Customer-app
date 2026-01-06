import { Mail, MessageCircle, Phone } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

export default function Support() {
  return (
    <View className="flex-1 bg-[#0B1F1A] px-4 pt-12">
      <Text className="text-white text-2xl font-bold mb-2">
        Support
      </Text>
      <Text className="text-gray-400 mb-8">
        We’re here to help you 24/7
      </Text>

      <View className="space-y-4">
        <TouchableOpacity className="bg-[#102B25] p-4 rounded-xl flex-row items-center">
          <MessageCircle color="#34F5C5" size={22} />
          <Text className="text-white ml-3 font-semibold">
            Live Chat
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="bg-[#102B25] p-4 rounded-xl flex-row items-center">
          <Phone color="#34F5C5" size={22} />
          <Text className="text-white ml-3 font-semibold">
            Call Support
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="bg-[#102B25] p-4 rounded-xl flex-row items-center">
          <Mail color="#34F5C5" size={22} />
          <Text className="text-white ml-3 font-semibold">
            Email Us
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
