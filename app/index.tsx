import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

import { getIsLoggedIn } from "@/lib/auth";
import { getIsOnboardingComplete } from "@/lib/onboarding";

export default function Index() {
  const [status, setStatus] = useState<"loading" | "out" | "onboarding" | "in">(
    "loading",
  );

  useEffect(() => {
    let mounted = true;

    const hydrateAuth = async () => {
      const isLoggedIn = await getIsLoggedIn();
      if (!mounted) {
        return;
      }

      if (!isLoggedIn) {
        setStatus("out");
        return;
      }

      const isOnboardingComplete = await getIsOnboardingComplete();
      if (!mounted) {
        return;
      }

      setStatus(isOnboardingComplete ? "in" : "onboarding");
    };

    hydrateAuth();

    return () => {
      mounted = false;
    };
  }, []);

  if (status === "loading") {
    return (
      <View className="flex-1 items-center justify-center bg-slate-50">
        <ActivityIndicator color="#0f766e" />
      </View>
    );
  }

  if (status === "out") {
    return <Redirect href="/login" />;
  }

  if (status === "onboarding") {
    return <Redirect href="/onboarding" />;
  }

  return <Redirect href="/(tabs)" />;
}
