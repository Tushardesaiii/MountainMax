import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";

const activity = [
  { label: "Total scans", value: "48" },
  { label: "Mountains identified", value: "32" },
  { label: "Best streak", value: "14 days" },
];

export default function AccountScreen() {
  return (
    <LinearGradient
      colors={["#f3fbff", "#d8eef9", "#eef6ff"]}
      className="flex-1"
    >
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 36 }}>
        <View className="rounded-3xl bg-white/85 p-5 shadow-sm">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-2xl font-semibold text-slate-900">
                Account Center
              </Text>
              <Text className="mt-1 text-slate-600">Signed in with Google</Text>
            </View>
            <View className="h-14 w-14 items-center justify-center rounded-full bg-alpine-100">
              <Ionicons name="person" size={28} color="#155e75" />
            </View>
          </View>
        </View>

        <View className="mt-5 rounded-3xl bg-white/85 p-5">
          <Text className="text-lg font-semibold text-slate-900">Activity</Text>
          <View className="mt-4 flex-row justify-between">
            {activity.map((item) => (
              <View
                key={item.label}
                className="w-[31%] rounded-2xl bg-alpine-50 p-3"
              >
                <Text className="text-xl font-semibold text-slate-900">
                  {item.value}
                </Text>
                <Text className="mt-1 text-xs text-slate-600">
                  {item.label}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View className="mt-5 gap-3">
          <Link href="/notifications" asChild>
            <Pressable className="flex-row items-center justify-between rounded-2xl bg-white/90 px-4 py-4">
              <View className="flex-row items-center gap-3">
                <Ionicons
                  name="notifications-outline"
                  size={20}
                  color="#0f172a"
                />
                <Text className="text-base text-slate-800">Notifications</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#475569" />
            </Pressable>
          </Link>

          <Link href="/settings" asChild>
            <Pressable className="flex-row items-center justify-between rounded-2xl bg-white/90 px-4 py-4">
              <View className="flex-row items-center gap-3">
                <Ionicons name="settings-outline" size={20} color="#0f172a" />
                <Text className="text-base text-slate-800">Settings</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#475569" />
            </Pressable>
          </Link>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
