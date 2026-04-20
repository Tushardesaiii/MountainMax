import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

import { setIsLoggedIn } from "@/lib/auth";

export default function LoginScreen() {
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    // Prototype login: persisting session to gate app entry.
    await setIsLoggedIn(true);
    router.replace("/(tabs)");
  };

  return (
    <LinearGradient
      colors={["#d7f1ff", "#edf8ff", "#f9fcff"]}
      className="flex-1 px-6 pt-16"
    >
      <View className="flex-1 justify-between pb-10">
        <View>
          <View className="h-20 w-20 items-center justify-center rounded-3xl bg-white/85">
            <Ionicons name="trail-sign-outline" size={40} color="#0f766e" />
          </View>

          <Text className="mt-8 text-4xl font-semibold leading-tight text-slate-900">
            Welcome to MountainMax
          </Text>
          <Text className="mt-4 text-base leading-7 text-slate-700">
            Sign in to start scanning mountains, saving discoveries, and getting
            smarter adventure insights.
          </Text>
        </View>

        <View className="gap-3">
          <Pressable
            disabled={loading}
            onPress={handleLogin}
            className="flex-row items-center justify-center gap-3 rounded-2xl bg-slate-900 py-4"
          >
            <Ionicons name="logo-google" size={18} color="#fff" />
            <Text className="text-base font-semibold text-white">
              Continue with Google
            </Text>
          </Pressable>

          <Pressable
            disabled={loading}
            onPress={handleLogin}
            className="flex-row items-center justify-center gap-3 rounded-2xl bg-teal-700 py-4"
          >
            <Ionicons name="logo-apple" size={19} color="#fff" />
            <Text className="text-base font-semibold text-white">
              Continue with Apple
            </Text>
          </Pressable>

          {loading ? (
            <View className="mt-2 flex-row items-center justify-center gap-2">
              <ActivityIndicator color="#0f766e" />
              <Text className="text-sm text-slate-600">Signing you in...</Text>
            </View>
          ) : null}
        </View>
      </View>
    </LinearGradient>
  );
}
