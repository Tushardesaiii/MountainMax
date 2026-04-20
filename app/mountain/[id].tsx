import { Stack, useLocalSearchParams } from "expo-router";
import { ScrollView, Text, View } from "react-native";

import { MOUNTAINS } from "@/data/mountains";

export default function MountainDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const mountain = MOUNTAINS.find((item) => item.id === id);

  return (
    <>
      <Stack.Screen
        options={{
          title: mountain?.name ?? "Mountain Details",
          headerStyle: { backgroundColor: "#0F766E" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "700" },
          headerShadowVisible: false,
        }}
      />
      <ScrollView
        className="flex-1 bg-slate-50"
        contentContainerStyle={{ padding: 20 }}
      >
        {mountain ? (
          <View className="rounded-3xl bg-white p-3">
            <Text className="text-2xl font-semibold text-slate-900">
              {mountain.name}
            </Text>
            <Text className="mt-1 text-base text-slate-600">
              {mountain.country}
            </Text>

            <View className="mt-5 gap-4">
              <InfoRow label="Height" value={`${mountain.heightMeters} m`} />
              <InfoRow label="Challenge" value={mountain.challengeLevel} />
              <InfoRow label="Best season" value={mountain.bestSeason} />
              <InfoRow label="Geology" value={mountain.geology} multiline />
            </View>

            <Text className="mt-6 text-lg font-semibold text-slate-900">
              What it can do
            </Text>
            {mountain.whatItCanDo.map((line) => (
              <Text
                key={line}
                className="mt-3 text-sm leading-6 text-slate-700"
              >
                • {line}
              </Text>
            ))}

            <Text className="mt-6 text-lg font-semibold text-slate-900">
              Safety tips
            </Text>
            {mountain.safetyTips.map((line) => (
              <Text
                key={line}
                className="mt-3 text-sm leading-6 text-slate-700"
              >
                • {line}
              </Text>
            ))}
          </View>
        ) : (
          <View className="rounded-3xl bg-white p-5">
            <Text className="text-xl font-semibold text-slate-900">
              Mountain not found
            </Text>
            <Text className="mt-2 text-sm text-slate-600">
              The selected mountain is unavailable in this prototype dataset.
            </Text>
          </View>
        )}
      </ScrollView>
    </>
  );
}

function InfoRow({
  label,
  value,
  multiline,
}: {
  label: string;
  value: string;
  multiline?: boolean;
}) {
  return (
    <View>
      <Text className="text-xs uppercase tracking-wide text-slate-500">
        {label}
      </Text>
      <Text
        className={
          multiline
            ? "mt-1 text-sm leading-6 text-slate-700"
            : "mt-1 text-base text-slate-900"
        }
      >
        {value}
      </Text>
    </View>
  );
}
