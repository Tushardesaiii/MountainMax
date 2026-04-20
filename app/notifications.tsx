import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { ScrollView, Switch, Text, View } from "react-native";

export default function NotificationsScreen() {
  const [tips, setTips] = useState(true);
  const [scanAlerts, setScanAlerts] = useState(false);
  const [weeklySummary, setWeeklySummary] = useState(false);

  return (
    <ScrollView
      className="flex-1 bg-slate-50"
      contentContainerStyle={{ padding: 20, gap: 14 }}
    >
      <View className="rounded-3xl bg-white p-5">
        <View className="flex-row items-center gap-3">
          <Ionicons
            name="notifications-circle-outline"
            size={28}
            color="#0f766e"
          />
          <Text className="text-xl font-semibold text-slate-900">
            Notifications
          </Text>
        </View>
        <Text className="mt-3 text-sm leading-6 text-slate-600">
          Control which updates MountainMax sends. You can change these at any
          time.
        </Text>
      </View>

      <View className="rounded-3xl bg-white p-4">
        <ToggleRow
          title="Tips and educational content"
          subtitle="Get mountain facts and technique lessons"
          value={tips}
          onValueChange={setTips}
        />
        <ToggleRow
          title="Scan completed alerts"
          subtitle="Notify when cloud analysis completes"
          value={scanAlerts}
          onValueChange={setScanAlerts}
        />
        <ToggleRow
          title="Weekly progress summary"
          subtitle="A weekly summary of your discovered mountains"
          value={weeklySummary}
          onValueChange={setWeeklySummary}
          isLast
        />
      </View>
    </ScrollView>
  );
}

function ToggleRow({
  title,
  subtitle,
  value,
  onValueChange,
  isLast,
}: {
  title: string;
  subtitle: string;
  value: boolean;
  onValueChange: (nextValue: boolean) => void;
  isLast?: boolean;
}) {
  return (
    <View className={isLast ? "py-2" : "border-b border-slate-200 py-2"}>
      <View className="flex-row items-center justify-between">
        <View className="w-[78%]">
          <Text className="text-base font-medium text-slate-900">{title}</Text>
          <Text className="mt-1 text-sm text-slate-600">{subtitle}</Text>
        </View>
        <Switch value={value} onValueChange={onValueChange} />
      </View>
    </View>
  );
}
