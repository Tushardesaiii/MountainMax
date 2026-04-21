import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Image, Pressable, Text, View } from "react-native";

import { setIsLoggedIn } from "@/lib/auth";

export default function LoginScreen() {
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    // Prototype login: persisting session to gate app entry.
    await setIsLoggedIn(true);
    router.replace("/onboarding");
  };

  return (
    <LinearGradient
      colors={["#d7f1ff", "#edf8ff", "#f9fcff"]}
      className="flex-1 px-6 pt-16"
    >
      <View className="flex-1 justify-between pb-10">
        <View>
          <Text className="mt-0 text-4xl font-light leading-tight text-slate-900">
            Welcome to
            <Text className="font-bold text-teal-700"> Mountain</Text>
            <Text className="font-bold text-black">Max</Text>
          </Text>
          <Text className="mb-4 mt-4 text-base leading-7 text-slate-700">
            Sign in to start scanning mountains, saving discoveries, and getting
            smarter adventure.
          </Text>
          <View
            className="mt-6 overflow-hidden rounded-[34px] border border-white/80 bg-white"
            style={{ borderRadius: 34 }}
          >
            <Image
              source={{
                uri: "https://images.pexels.com/photos/29038684/pexels-photo-29038684.jpeg",
              }}
              style={{ width: "100%", height: 220, borderRadius: 34 }}
              resizeMode="cover"
            />
          </View>
        </View>

        <View className="gap-3">
          <Pressable
            disabled={loading}
            onPress={handleLogin}
            className="flex-row items-center justify-center gap-3 bg-slate-900 py-4"
            style={{ borderRadius: 20, overflow: "hidden" }}
          >
            <Ionicons name="logo-google" size={18} color="#fff" />
            <Text className="text-base font-semibold text-white">
              Continue with Google
            </Text>
          </Pressable>

          <Pressable
            disabled={loading}
            onPress={handleLogin}
            className="flex-row items-center justify-center gap-3 bg-teal-700 py-4"
            style={{ borderRadius: 20, overflow: "hidden" }}
          >
            <Ionicons name="call-outline" size={19} color="#fff" />
            <Text className="text-base font-semibold text-white">
              Continue with number
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
