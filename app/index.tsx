import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

import { getIsLoggedIn } from "@/lib/auth";

export default function Index() {
  const [status, setStatus] = useState<"loading" | "in" | "out">("loading");

  useEffect(() => {
    let mounted = true;

    const hydrateAuth = async () => {
      const isLoggedIn = await getIsLoggedIn();
      if (!mounted) {
        return;
      }

      setStatus(isLoggedIn ? "in" : "out");
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

  return <Redirect href={status === "in" ? "/(tabs)" : "/login"} />;
}
