import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";

const metrics = [
  { label: "Scans", value: "48", icon: "scan-outline" as const },
  { label: "Identified", value: "32", icon: "planet-outline" as const },
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

const weeklyProgress = [
  { day: "Mon", score: 42 },
  { day: "Tue", score: 68 },
  { day: "Wed", score: 54 },
  { day: "Thu", score: 82 },
  { day: "Fri", score: 74 },
  { day: "Sat", score: 90 },
  { day: "Sun", score: 61 },
];

const quickActions = [
  {
    title: "Saved Mountains",
    subtitle: "12 places bookmarked",
    icon: "bookmark-outline" as const,
  },
  {
    title: "Trip Planner",
    subtitle: "3 upcoming itineraries",
    icon: "map-outline" as const,
  },
  {
    title: "Rewards",
    subtitle: "280 XP to next badge",
    icon: "diamond-outline" as const,
  },
];

export default function AccountScreen() {
  return (
    <View className="flex-1 bg-slate-50">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 28,
          paddingBottom: 44,
        }}
      >
        <View
          className="overflow-hidden rounded-[34px] border border-slate-200 bg-white px-5 pb-5 pt-5"
          style={{
            borderRadius: 34,
            overflow: "hidden",
            boxShadow: "0px 8px 24px rgba(15, 23, 42, 0.06)",
          }}
        >
          <View className="mb-5 flex-row items-center justify-between">
            <View>
              <Text className="text-xs font-semibold uppercase tracking-[2px] text-teal-700">
                MountainMax Profile
              </Text>
              <Text className="mt-1 text-sm text-slate-500">
                Your stats, progress, and saved places.
              </Text>
            </View>
            <Pressable className="h-10 w-10 items-center justify-center rounded-full bg-slate-100 active:scale-[0.98]">
              <Ionicons name="create-outline" size={18} color="#0f172a" />
            </Pressable>
          </View>

          <View className="flex-row items-center gap-4">
            <View className="h-20 w-20 items-center justify-center rounded-full border border-slate-200 bg-slate-100 p-1.5">
              <View className="h-full w-full items-center justify-center rounded-full bg-white">
                <Ionicons name="person" size={34} color="#334155" />
              </View>
            </View>

            <View className="flex-1">
              <Text className="text-[25px] font-semibold tracking-tight text-slate-900">
                Aarav Explorer
              </Text>
              <Text className="mt-0.5 text-slate-500">@aarav.summits</Text>
              <Text className="mt-2 text-xs uppercase tracking-wide text-slate-500">
                Summit Seeker · Level 5
              </Text>
            </View>
          </View>

          <View className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <View className="flex-row items-end justify-between">
              <View>
                <Text className="text-sm text-slate-500">
                  Profile completion
                </Text>
                <Text className="text-2xl font-semibold text-slate-900">
                  72%
                </Text>
              </View>
              <Text className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700">
                +140 XP to L6
              </Text>
            </View>

            <View className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
              <View className="h-full w-[72%] rounded-full bg-cyan-600" />
            </View>

            <View className="mt-4 flex-row gap-2">
              <View className="rounded-full border border-slate-200 bg-white px-3 py-1.5">
                <Text className="text-xs text-slate-600">
                  Explorer since 2023
                </Text>
              </View>
              <View className="rounded-full border border-slate-200 bg-white px-3 py-1.5">
                <Text className="text-xs text-slate-600">Google sign-in</Text>
              </View>
            </View>
          </View>
        </View>

        <View
          className="mt-6 rounded-3xl border border-slate-200 bg-white p-5"
          style={{
            borderRadius: 30,
            overflow: "hidden",
            boxShadow: "0px 6px 18px rgba(15, 23, 42, 0.05)",
          }}
        >
          <View className="flex-row items-center justify-between">
            <Text className="text-lg font-semibold text-slate-900">
              Performance Snapshot
            </Text>
            <Text className="text-xs font-medium text-slate-500">
              This month
            </Text>
          </View>
          <View className="mt-4 flex-row justify-between">
            {metrics.map((item) => (
              <View
                key={item.label}
                className="w-[31.5%] rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3"
              >
                <View className="h-7 w-7 items-center justify-center rounded-full bg-white">
                  <Ionicons name={item.icon} size={15} color="#0f6f97" />
                </View>
                <Text className="mt-2 text-[21px] font-semibold text-slate-900">
                  {item.value}
                </Text>
                <Text className="mt-0.5 text-xs text-slate-600">
                  {item.label}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View
          className="mt-5 rounded-3xl border border-slate-200 bg-white p-5"
          style={{
            borderRadius: 30,
            overflow: "hidden",
            boxShadow: "0px 6px 18px rgba(15, 23, 42, 0.05)",
          }}
        >
          <View className="flex-row items-center justify-between">
            <Text className="text-lg font-semibold text-slate-900">
              Weekly Activity
            </Text>
            <Ionicons name="bar-chart-outline" size={18} color="#64748b" />
          </View>

          <View className="mt-4 flex-row items-end justify-between">
            {weeklyProgress.map((item) => (
              <View key={item.day} className="items-center">
                <View className="h-24 w-7 justify-end rounded-xl border border-slate-200 bg-slate-100 p-1">
                  <View
                    className="rounded-[10px] bg-cyan-600"
                    style={{ height: `${item.score}%` }}
                  />
                </View>
                <Text className="mt-2 text-[11px] text-slate-500">
                  {item.day}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View className="mt-6 gap-3">
          {quickActions.map((item) => (
            <Pressable
              key={item.title}
              className="flex-row items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-4"
              style={{
                borderRadius: 16,
                overflow: "hidden",
                boxShadow: "0px 4px 14px rgba(15, 23, 42, 0.04)",
              }}
            >
              <View className="flex-row items-center gap-3">
                <View className="h-10 w-10 items-center justify-center rounded-full bg-slate-100">
                  <Ionicons name={item.icon} size={19} color="#0f766e" />
                </View>
                <View>
                  <Text className="text-[15px] font-semibold text-slate-900">
                    {item.title}
                  </Text>
                  <Text className="text-xs text-slate-600">
                    {item.subtitle}
                  </Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#334155" />
            </Pressable>
          ))}
        </View>

        <View
          className="mt-5 rounded-3xl border border-slate-200 bg-white p-5"
          style={{
            borderRadius: 30,
            overflow: "hidden",
            boxShadow: "0px 6px 18px rgba(15, 23, 42, 0.05)",
          }}
        >
          <Text className="text-lg font-semibold text-slate-900">
            Achievement Vault
          </Text>
          <View className="mt-3 gap-3">
            {achievements.map((item) => (
              <View
                key={item.title}
                className="flex-row items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3"
              >
                <View className="mt-0.5 h-9 w-9 items-center justify-center rounded-full bg-white">
                  <Ionicons name={item.icon} size={18} color="#0f6f97" />
                </View>
                <View className="flex-1">
                  <Text className="text-sm font-semibold text-slate-900">
                    {item.title}
                  </Text>
                  <Text className="mt-1 text-xs leading-5 text-slate-600">
                    {item.body}
                  </Text>
                </View>
                <Ionicons name="checkmark-circle" size={18} color="#0ea5a4" />
              </View>
            ))}
          </View>
        </View>

        <View className="mt-5 gap-3">
          <Link href="/notifications" asChild>
            <Pressable className="flex-row items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-4">
              <View className="flex-row items-center gap-3">
                <View className="h-9 w-9 items-center justify-center rounded-full bg-slate-100">
                  <Ionicons
                    name="notifications-outline"
                    size={19}
                    color="#0f6f97"
                  />
                </View>
                <View>
                  <Text className="text-base font-medium text-slate-800">
                    Notifications
                  </Text>
                  <Text className="text-xs text-slate-500">
                    Tips, reminders, progress updates
                  </Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#475569" />
            </Pressable>
          </Link>

          <Link href="/settings" asChild>
            <Pressable className="flex-row items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-4">
              <View className="flex-row items-center gap-3">
                <View className="h-9 w-9 items-center justify-center rounded-full bg-slate-100">
                  <Ionicons name="settings-outline" size={19} color="#0f766e" />
                </View>
                <View>
                  <Text className="text-base font-medium text-slate-800">
                    Settings
                  </Text>
                  <Text className="text-xs text-slate-500">
                    Privacy, appearance, account controls
                  </Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#475569" />
            </Pressable>
          </Link>

          <Pressable className="items-center rounded-2xl border border-slate-300 bg-white px-4 py-3.5">
            <Text className="text-sm font-semibold text-cyan-800">
              Share profile
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
