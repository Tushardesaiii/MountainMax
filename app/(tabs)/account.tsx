import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";

const metrics = [
  { label: "Total scans", value: "48", icon: "scan-outline" as const },
  {
    label: "Identified",
    value: "32",
    icon: "analytics-outline" as const,
  },
  { label: "Streak", value: "14d", icon: "flame-outline" as const },
];

const achievements = [
  {
    title: "Cloud Chaser",
    body: "Scanned 10 high-altitude mountain photos",
    icon: "cloud-done-outline" as const,
  },
  {
    title: "Trail Scholar",
    body: "Opened 15 mountain intelligence pages",
    icon: "book-outline" as const,
  },
  {
    title: "Summit Streak",
    body: "Logged in for 14 consecutive days",
    icon: "trophy-outline" as const,
  },
];

const recentJourney = [
  { name: "Mount Fuji", when: "2h ago", status: "Identified" },
  { name: "Kilimanjaro", when: "Yesterday", status: "Saved" },
  { name: "Everest", when: "2 days ago", status: "Explored" },
];

export default function AccountScreen() {
  return (
    <LinearGradient
      colors={["#d8f2ff", "#eaf8ff", "#f4f9ff"]}
      className="flex-1"
    >
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 36 }}>
        <LinearGradient
          colors={["#0f766e", "#155e75", "#0c4a6e"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="overflow-hidden rounded-3xl p-5"
        >
          <View className="flex-row items-center justify-between">
            <View className="max-w-[74%]">
              <Text className="text-2xl font-semibold text-white">
                Adventure Profile
              </Text>
              <Text className="mt-1 text-teal-100">Aarav Explorer</Text>
              <Text className="mt-2 text-xs uppercase tracking-wide text-teal-200">
                Signed in with Google
              </Text>
            </View>
            <View className="h-16 w-16 items-center justify-center rounded-full bg-white/20">
              <Ionicons name="person" size={30} color="#ffffff" />
            </View>
          </View>

          <View className="mt-5 rounded-2xl bg-white/15 p-4">
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-sm text-teal-100">Current level</Text>
                <Text className="text-xl font-semibold text-white">
                  Summit Seeker · L5
                </Text>
              </View>
              <Text className="rounded-full bg-white/20 px-3 py-1 text-xs text-white">
                72% to L6
              </Text>
            </View>

            <View className="mt-3 h-2 overflow-hidden rounded-full bg-white/20">
              <View className="h-full w-[72%] rounded-full bg-cyan-300" />
            </View>

            <Text className="mt-2 text-xs text-teal-100">
              140 XP needed for next rank unlock
            </Text>
          </View>

          <View className="pointer-events-none absolute -right-4 -top-6 h-24 w-24 rounded-full bg-white/10" />
          <View className="pointer-events-none absolute -bottom-10 -left-6 h-28 w-28 rounded-full bg-white/10" />
        </LinearGradient>

        <View className="mt-5 rounded-3xl bg-white/90 p-5">
          <Text className="text-lg font-semibold text-slate-900">
            Performance Snapshot
          </Text>
          <View className="mt-4 flex-row justify-between">
            {metrics.map((item) => (
              <View
                key={item.label}
                className="w-[31%] rounded-2xl bg-slate-50 p-3"
              >
                <Ionicons name={item.icon} size={16} color="#0f766e" />
                <Text className="mt-2 text-xl font-semibold text-slate-900">
                  {item.value}
                </Text>
                <Text className="mt-1 text-xs text-slate-600">
                  {item.label}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View className="mt-5 rounded-3xl bg-white/90 p-5">
          <Text className="text-lg font-semibold text-slate-900">
            Achievement Vault
          </Text>
          <View className="mt-3 gap-3">
            {achievements.map((item) => (
              <View
                key={item.title}
                className="flex-row items-start gap-3 rounded-2xl bg-teal-50 px-3 py-3"
              >
                <View className="mt-0.5 h-9 w-9 items-center justify-center rounded-full bg-white">
                  <Ionicons name={item.icon} size={18} color="#0f766e" />
                </View>
                <View className="flex-1">
                  <Text className="text-sm font-semibold text-slate-900">
                    {item.title}
                  </Text>
                  <Text className="mt-1 text-xs leading-5 text-slate-600">
                    {item.body}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View className="mt-5 rounded-3xl bg-white/90 p-5">
          <Text className="text-lg font-semibold text-slate-900">
            Recent Journey
          </Text>
          <View className="mt-3 gap-2">
            {recentJourney.map((item, index) => (
              <View
                key={item.name + item.when}
                className="flex-row items-center justify-between rounded-xl bg-slate-50 px-3 py-3"
              >
                <View className="flex-row items-center gap-3">
                  <View className="h-7 w-7 items-center justify-center rounded-full bg-white">
                    <Text className="text-xs font-semibold text-teal-700">
                      {index + 1}
                    </Text>
                  </View>
                  <View>
                    <Text className="text-sm font-medium text-slate-900">
                      {item.name}
                    </Text>
                    <Text className="text-xs text-slate-500">{item.when}</Text>
                  </View>
                </View>
                <Text className="text-xs font-medium text-teal-700">
                  {item.status}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View className="mt-5 gap-3">
          <Link href="/notifications" asChild>
            <Pressable className="flex-row items-center justify-between rounded-2xl bg-white px-4 py-4">
              <View className="flex-row items-center gap-3">
                <Ionicons
                  name="notifications-outline"
                  size={20}
                  color="#0f172a"
                />
                <View>
                  <Text className="text-base text-slate-800">
                    Notifications
                  </Text>
                  <Text className="text-xs text-slate-500">
                    Tips, progress updates, reminders
                  </Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#475569" />
            </Pressable>
          </Link>

          <Link href="/settings" asChild>
            <Pressable className="flex-row items-center justify-between rounded-2xl bg-white px-4 py-4">
              <View className="flex-row items-center gap-3">
                <Ionicons name="settings-outline" size={20} color="#0f172a" />
                <View>
                  <Text className="text-base text-slate-800">Settings</Text>
                  <Text className="text-xs text-slate-500">
                    Privacy, style, and account controls
                  </Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#475569" />
            </Pressable>
          </Link>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
