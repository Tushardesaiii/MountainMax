import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/haptic-tab";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarInactiveTintColor: "#64748b",
        tabBarStyle: {
          backgroundColor: Platform.OS === "android" ? "#ffffff" : "#f8fbff",
          borderTopWidth: 1,
          borderTopColor: Platform.OS === "android" ? "#e2e8f0" : "#d9eaf4",
          height: Platform.OS === "android" ? 72 : 82,
          paddingBottom: Platform.OS === "android" ? 8 : 12,
          paddingTop: Platform.OS === "android" ? 6 : 8,
          shadowColor: "#0f172a",
          shadowOpacity: Platform.OS === "android" ? 0.05 : 0.08,
          shadowRadius: Platform.OS === "android" ? 10 : 14,
          shadowOffset: { width: 0, height: -4 },
          elevation: Platform.OS === "android" ? 8 : 12,
        },
        tabBarLabelStyle: {
          fontSize: Platform.OS === "android" ? 12 : 11,
          fontWeight: Platform.OS === "android" ? "600" : "700",
          letterSpacing: 0.2,
          paddingBottom: Platform.OS === "android" ? 1 : 2,
        },
        tabBarItemStyle: {
          flex: 1,
          minWidth: 0,
          paddingTop: Platform.OS === "android" ? 0 : 2,
        },
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Scan",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              size={23}
              name={focused ? "scan" : "scan-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Discover",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              size={23}
              name={focused ? "compass" : "compass-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              size={23}
              name={focused ? "person-circle" : "person-circle-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
