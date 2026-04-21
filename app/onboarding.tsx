import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
    ActivityIndicator,
    Animated,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StatusBar,
    Switch,
    Text,
    TextInput,
    View,
} from "react-native";

import {
    ExperienceLevel,
    saveOnboardingProfile,
    setOnboardingComplete,
} from "@/lib/onboarding";

const totalSteps = 3;

const experienceLevels: ExperienceLevel[] = [
  "Beginner",
  "Intermediate",
  "Advanced",
];

const goalChoices = [
  "Peak identification",
  "Trip planning",
  "Climbing progress",
  "Mountain education",
  "Photography spots",
  "Weather readiness",
] as const;

export default function OnboardingScreen() {
  const [step, setStep] = useState(0);
  const [fullName, setFullName] = useState("");
  const [homeCountry, setHomeCountry] = useState("");
  const [experience, setExperience] = useState<ExperienceLevel>("Beginner");
  const [goals, setGoals] = useState<string[]>(["Peak identification"]);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const fade = useRef(new Animated.Value(0)).current;
  const moveY = useRef(new Animated.Value(18)).current;

  useEffect(() => {
    fade.setValue(0);
    moveY.setValue(18);

    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 320,
        useNativeDriver: false,
      }),
      Animated.timing(moveY, {
        toValue: 0,
        duration: 320,
        useNativeDriver: false,
      }),
    ]).start();
  }, [step]);

  const progress = useMemo(() => {
    return `${((step + 1) / totalSteps) * 100}%` as const;
  }, [step]);

  const canStep1 =
    fullName.trim().length >= 2 && homeCountry.trim().length >= 2;

  const canStep2 = goals.length > 0;

  const disabled =
    submitting || (step === 0 && !canStep1) || (step === 1 && !canStep2);

  const toggleGoal = (goal: string) => {
    setGoals((prev) => {
      if (prev.includes(goal)) {
        if (prev.length === 1) return prev;
        return prev.filter((item) => item !== goal);
      }

      if (prev.length >= 3) {
        return [...prev.slice(1), goal];
      }

      return [...prev, goal];
    });
  };

  const handleBack = () => {
    if (step === 0) {
      router.back();
      return;
    }
    setStep((prev) => prev - 1);
  };

  const handleContinue = async () => {
    if (step === 0 && !canStep1) return;
    if (step === 1 && !canStep2) return;

    if (step < totalSteps - 1) {
      setStep((prev) => prev + 1);
      return;
    }

    try {
      setSubmitting(true);

      await saveOnboardingProfile({
        fullName: fullName.trim(),
        homeCountry: homeCountry.trim(),
        experience,
        goals,
        notificationsEnabled,
      });

      await setOnboardingComplete(true);
      router.replace("/(tabs)");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingTop: 24,
            paddingBottom: 40,
          }}
        >
          {/* HEADER */}
          <LinearGradient
            colors={["#0f172a", "#0f766e"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="overflow-hidden rounded-[34px] p-5"
            style={{
              borderRadius: 34,
              overflow: "hidden",
              boxShadow: "0px 10px 28px rgba(15, 23, 42, 0.14)",
            }}
          >
            <View className="flex-row items-start justify-between gap-4">
              <View className="flex-1 pr-2">
                <Text className="text-xs font-semibold uppercase tracking-[2px] text-cyan-100">
                  Step {step + 1} of {totalSteps}
                </Text>

                <Text className="mt-3 text-[32px] font-bold leading-[38px] text-white">
                  Build your{"\n"}Explorer Profile
                </Text>

                <Text className="mt-3 text-[15px] leading-7 text-cyan-50">
                  Personalized mountain scans, smarter recommendations, routes,
                  and weather insights.
                </Text>
              </View>

              <View className="h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                <Ionicons name="navigate-outline" size={24} color="#ffffff" />
              </View>
            </View>

            <View className="mt-5 h-2 rounded-full bg-white/15 overflow-hidden">
              <LinearGradient
                colors={["#67e8f9", "#ffffff"]}
                style={{
                  width: progress,
                  height: "100%",
                }}
              />
            </View>
          </LinearGradient>

          {/* CARD */}
          <Animated.View
            style={{
              opacity: fade,
              transform: [{ translateY: moveY }],
              borderRadius: 30,
              overflow: "hidden",
              boxShadow: "0px 8px 24px rgba(15, 23, 42, 0.08)",
            }}
            className="mt-5 rounded-[30px] border border-slate-100 bg-white px-5 py-6"
          >
            {/* STEP 1 */}
            {step === 0 && (
              <View>
                <Text className="text-2xl font-bold text-slate-900">
                  Your Basics
                </Text>

                <Text className="mt-3 text-[15px] leading-7 text-slate-500">
                  Start with a few details to personalize your experience.
                </Text>

                <View className="mt-7 gap-4">
                  <View>
                    <Text className="mb-3 text-xs font-semibold uppercase tracking-[1px] text-slate-500">
                      Full Name
                    </Text>

                    <TextInput
                      value={fullName}
                      onChangeText={setFullName}
                      placeholder="Aarav Explorer"
                      placeholderTextColor="#94a3b8"
                      className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-base text-slate-900"
                    />
                  </View>

                  <View>
                    <Text className="mb-3 text-xs font-semibold uppercase tracking-[1px] text-slate-500">
                      Country
                    </Text>

                    <TextInput
                      value={homeCountry}
                      onChangeText={setHomeCountry}
                      placeholder="India"
                      placeholderTextColor="#94a3b8"
                      className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-base text-slate-900"
                    />
                  </View>
                </View>
              </View>
            )}

            {/* STEP 2 */}
            {step === 1 && (
              <View>
                <Text className="text-2xl font-bold text-slate-900">
                  Experience & Goals
                </Text>

                <Text className="mt-3 text-[15px] leading-7 text-slate-500">
                  Choose your level and what matters most to you.
                </Text>

                <Text className="mt-7 mb-4 text-xs font-semibold uppercase tracking-[1px] text-slate-500">
                  Experience Level
                </Text>

                <View className="gap-3">
                  {experienceLevels.map((item) => {
                    const selected = item === experience;

                    return (
                      <Pressable
                        key={item}
                        onPress={() => setExperience(item)}
                        className={
                          selected
                            ? "rounded-2xl border border-teal-600 bg-teal-50 px-5 py-4"
                            : "rounded-2xl bg-slate-50 px-5 py-4"
                        }
                      >
                        <Text
                          className={
                            selected
                              ? "font-semibold text-teal-700"
                              : "font-medium text-slate-700"
                          }
                        >
                          {item}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>

                <Text className="mt-7 mb-4 text-xs font-semibold uppercase tracking-[1px] text-slate-500">
                  Goals (Max 3)
                </Text>

                <View className="flex-row flex-wrap gap-3">
                  {goalChoices.map((goal) => {
                    const selected = goals.includes(goal);

                    return (
                      <Pressable
                        key={goal}
                        onPress={() => toggleGoal(goal)}
                        className={
                          selected
                            ? "rounded-full border border-teal-600 bg-teal-50 px-4 py-3"
                            : "rounded-full bg-slate-100 px-4 py-3"
                        }
                      >
                        <Text
                          className={
                            selected
                              ? "text-xs font-semibold text-teal-700"
                              : "text-xs text-slate-600"
                          }
                        >
                          {goal}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>
            )}

            {/* STEP 3 */}
            {step === 2 && (
              <View>
                <Text className="text-2xl font-bold text-slate-900">
                  Final Setup
                </Text>

                <Text className="mt-3 text-[15px] leading-7 text-slate-500">
                  Enable alerts and complete your personalized setup.
                </Text>

                <View
                  className="mt-7 rounded-3xl border border-slate-200 bg-slate-50 p-5"
                  style={{ borderRadius: 24, overflow: "hidden" }}
                >
                  <View className="flex-row items-center justify-between">
                    <View className="flex-1 pr-5">
                      <Text className="font-semibold text-slate-900">
                        Smart Notifications
                      </Text>

                      <Text className="mt-2 text-xs leading-6 text-slate-500">
                        Weather, reminders, route updates, and weekly progress.
                      </Text>
                    </View>

                    <Switch
                      value={notificationsEnabled}
                      onValueChange={setNotificationsEnabled}
                      trackColor={{
                        false: "#cbd5e1",
                        true: "#0f766e",
                      }}
                      thumbColor="#fff"
                    />
                  </View>
                </View>

                <View
                  className="mt-5 rounded-3xl border border-teal-100 bg-teal-50 p-5"
                  style={{ borderRadius: 24, overflow: "hidden" }}
                >
                  <Text className="text-xs font-semibold uppercase tracking-[1px] text-teal-700">
                    Summary
                  </Text>

                  <Text className="mt-3 text-sm leading-6 text-slate-700">
                    {fullName || "Explorer"} • {homeCountry || "Global"} •{" "}
                    {experience}
                  </Text>
                </View>
              </View>
            )}
          </Animated.View>

          {/* ACTION */}
          <View className="mt-8 gap-4">
            <Pressable
              disabled={disabled}
              onPress={handleContinue}
              className="overflow-hidden rounded-2xl"
            >
              <LinearGradient
                colors={
                  disabled ? ["#cbd5e1", "#cbd5e1"] : ["#14b8a6", "#0f766e"]
                }
                className="items-center py-4"
              >
                {submitting ? (
                  <View className="flex-row items-center gap-2">
                    <ActivityIndicator color="#fff" />
                    <Text className="font-semibold text-white">Saving...</Text>
                  </View>
                ) : (
                  <Text className="text-base font-semibold text-white">
                    {step === totalSteps - 1 ? "Finish Setup" : "Continue"}
                  </Text>
                )}
              </LinearGradient>
            </Pressable>

            <Pressable onPress={handleBack} className="items-center py-2">
              <Text className="font-medium text-slate-500">
                {step === 0 ? "Back" : "Previous"}
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
