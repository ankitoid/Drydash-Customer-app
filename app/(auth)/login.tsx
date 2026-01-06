import { router } from "expo-router";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";

export default function Login() {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.logo, { color: theme.primary }]}>
        DryDash
      </Text>
      <Text style={[styles.subtitle, { color: theme.subText }]}
      className="underline text-2xl"
      >
        Customer Login
      </Text>

      <TextInput
        placeholder="Phone or Email"
        placeholderTextColor={theme.subText}
        style={[styles.input, { backgroundColor: theme.card, color: theme.text }]}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor={theme.subText}
        secureTextEntry
        style={[styles.input, { backgroundColor: theme.card, color: theme.text }]}
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.primary }]}
        onPress={() => router.replace("/(customer)/(tabs)/home")}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/register")}>
        <Text style={[styles.link, { color: theme.primary }]}>
          Create Account
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  logo: {
    fontSize: 32,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 40,
  },
  input: {
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    padding: 16,
    borderRadius: 16,
    marginTop: 8,
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "700",
    color: "#000",
  },
  link: {
    textAlign: "center",
    marginTop: 24,
  },
});
