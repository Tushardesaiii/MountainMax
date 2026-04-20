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
         

          <Text className="mt-0  text-4xl font-light leading-tight text-slate-900">
            Welcome to <span className="font-bold text-teal-700 ">Mountain<span className="font-bold text-black ">Max</span></span>
          </Text>
          <Text className="mt-4 mb-4 text-base  leading-7 text-slate-700">
            Sign in to start scanning mountains, saving discoveries, and getting
            smarter adventure insights.
          </Text>
          {/* image embadding  */}
          <img src="https://imgs.search.brave.com/q5Xnkgsl03TdDu-Wl6psAmNEMs_QNF3SR0rtCYDvAkc/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE2/MDQ0Mjg4MDM4OTYt/YzFlNTE1MWQ0MTI4/P2ZtPWpwZyZxPTYw/Jnc9MzAwMCZpeGxp/Yj1yYi00LjEuMCZp/eGlkPU0zd3hNakEz/ZkRCOE1IeHpaV0Z5/WTJoOE9IeDhiVzkx/Ym5SaGFXNGxNakJ5/WVc1blpYeGxibnd3/Zkh3d2ZIeDhNQT09" alt=""  className="h-60 cover w-full pb-3 rounded-full shadow-black a"/>

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