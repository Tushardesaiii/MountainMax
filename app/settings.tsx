import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";

import { setIsLoggedIn } from "@/lib/auth";

const rows = [
  { icon: "language-outline", label: "Language", value: "English" },
  { icon: "color-palette-outline", label: "App style", value: "Alpine Glass" },
  {
    icon: "shield-checkmark-outline",
    label: "Privacy mode",
    value: "Standard",
  },
] as const;

export default function SettingsScreen() {
  const handleSignOut = async () => {
    await setIsLoggedIn(false);
    router.replace("/login");
  };

  return (
    <ScrollView
      className="flex-1 bg-slate-50"
      contentContainerStyle={{ padding: 20 }}
    >
      <Text className="text-3xl font-semibold text-slate-900">Settings</Text>
      <Text className="mt-2 text-sm text-slate-600">
        Tune your MountainMax experience to your adventure style.
      </Text>

      <View className="mt-6 gap-3">
        {rows.map((row) => (
          <View
            key={row.label}
            className="flex-row items-center justify-between rounded-2xl bg-white px-4 py-4"
          >
            <View className="flex-row items-center gap-3">
              <Ionicons name={row.icon} size={20} color="#0f172a" />
              <Text className="text-base text-slate-900">{row.label}</Text>
            </View>
            <View className="flex-row items-center gap-2">
              <Text className="text-sm text-slate-500">{row.value}</Text>
              <Ionicons name="chevron-forward" size={17} color="#64748b" />
            </View>
          </View>
        ))}

        <Pressable
          onPress={handleSignOut}
          className="mt-2 flex-row items-center justify-between rounded-2xl bg-rose-50 px-4 py-4"
        >
          <View className="flex-row items-center gap-3">
            <Ionicons name="log-out-outline" size={20} color="#be123c" />
            <Text className="text-base text-rose-700">Sign out</Text>
          </View>
          <Ionicons name="chevron-forward" size={17} color="#be123c" />
        </Pressable>
      </View>
    </ScrollView>
  );
}
