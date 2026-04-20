import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, Text, View } from "react-native";

const steps = [
  {
    title: "Scan Any Mountain",
    body: "Use camera or gallery and get instant insights around the mountain in your frame.",
    icon: "scan-circle-outline",
  },
  {
    title: "Learn What It Can Do",
    body: "Understand terrain type, climb challenge, best season, and practical adventure tips.",
    icon: "analytics-outline",
  },
  {
    title: "Build Your Adventure Profile",
    body: "Track your scans, get curated mountain education, and control all settings from one place.",
    icon: "trail-sign-outline",
  },
] as const;

export default function OnboardingScreen() {
  const [index, setIndex] = useState(0);
  const current = useMemo(() => steps[index], [index]);

  const isLast = index === steps.length - 1;

  return (
    <LinearGradient
      colors={["#d3f0ff", "#e7f7ff", "#f7fcff"]}
      className="flex-1 px-6 pt-16"
    >
      <View className="flex-1 justify-between pb-10">
        <View>
          <View className="h-24 w-24 items-center justify-center rounded-[32px] bg-white/80">
            <Ionicons name={current.icon} size={48} color="#0f766e" />
          </View>

          <Text className="mt-10 text-4xl font-semibold leading-tight text-slate-900">
            {current.title}
          </Text>
          <Text className="mt-4 text-base leading-7 text-slate-700">
            {current.body}
          </Text>
        </View>

        <View>
          <View className="mb-7 flex-row gap-2">
            {steps.map((step, dotIndex) => (
              <View
                key={step.title}
                className={
                  dotIndex === index
                    ? "h-2 w-8 rounded-full bg-teal-700"
                    : "h-2 w-3 rounded-full bg-teal-300"
                }
              />
            ))}
          </View>

          <Pressable
            onPress={() => {
              if (isLast) {
                router.replace("/(tabs)");
                return;
              }
              setIndex((value) => Math.min(value + 1, steps.length - 1));
            }}
            className="items-center rounded-2xl bg-teal-700 py-4"
          >
            <Text className="text-base font-semibold text-white">
              {isLast ? "Enter MountainMax" : "Continue"}
            </Text>
          </Pressable>

          {!isLast ? (
            <Pressable
              onPress={() => router.replace("/(tabs)")}
              className="mt-3 items-center py-3"
            >
              <Text className="text-sm text-slate-600">Skip for now</Text>
            </Pressable>
          ) : null}
        </View>
      </View>
    </LinearGradient>
  );
}
