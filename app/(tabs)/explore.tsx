import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, Text, View } from "react-native";

import { MOUNTAINS } from "@/data/mountains";

const learningCards = [
  {
    title: "How mountain detection works",
    body: "MountainMax evaluates slope profile, ridgeline shape, horizon composition, and texture context.",
    icon: "hardware-chip-outline",
  },
  {
    title: "Preparation essentials",
    body: "Pack layered clothing, hydration tools, emergency contacts, and weather-aware route plans.",
    icon: "medkit-outline",
  },
  {
    title: "Trail etiquette",
    body: "Leave no trace, respect local culture, and prioritize nature-safe adventure behavior.",
    icon: "leaf-outline",
  },
] as const;

export default function DiscoverScreen() {
  return (
    <LinearGradient
      colors={["#f4fbff", "#def2fb", "#edf5ff"]}
      className="flex-1"
    >
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 32 }}>
        <Text className="text-3xl font-semibold text-slate-900">Discover</Text>
        <Text className="mt-2 text-sm leading-6 text-slate-700">
          Explore mountain intelligence, planning hints, and practical knowledge
          before your next climb.
        </Text>

        <View className="mt-6 gap-3">
          {learningCards.map((card) => (
            <View key={card.title} className="rounded-3xl bg-white/90 p-5">
              <View className="flex-row items-start gap-3">
                <View className="h-10 w-10 items-center justify-center rounded-xl bg-alpine-100">
                  <Ionicons name={card.icon} size={20} color="#0f766e" />
                </View>
                <View className="flex-1">
                  <Text className="text-base font-semibold text-slate-900">
                    {card.title}
                  </Text>
                  <Text className="mt-2 text-sm leading-6 text-slate-700">
                    {card.body}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        <Text className="mt-7 text-lg font-semibold text-slate-900">
          Featured mountains
        </Text>
        <View className="mt-3 gap-3">
          {MOUNTAINS.map((item) => (
            <View key={item.id} className="rounded-2xl bg-white/90 px-4 py-4">
              <Text className="text-base font-semibold text-slate-900">
                {item.name}
              </Text>
              <Text className="mt-1 text-sm text-slate-600">
                {item.country}
              </Text>
              <Text className="mt-2 text-xs text-slate-500">
                Best season: {item.bestSeason}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
