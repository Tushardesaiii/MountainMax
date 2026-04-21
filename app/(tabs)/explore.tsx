import { Ionicons } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

import { MOUNTAINS } from "@/data/mountains";

export default function DiscoverScreen() {
  const tabBarHeight = useBottomTabBarHeight();

  const featured = MOUNTAINS.slice(0, 4);

  return (
    <LinearGradient
      colors={["#f8fbff", "#ffffff", "#ffffff"]}
      className="flex-1"
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 28,
          paddingBottom: tabBarHeight + 36,
        }}
      >
        {/* Header */}
        <View
          className="rounded-[30px] border border-slate-200 bg-white px-5 py-5"
          style={{
            borderRadius: 30,
            overflow: "hidden",
            boxShadow: "0px 8px 24px rgba(15, 23, 42, 0.06)",
          }}
        >
          <View className="flex-row items-start justify-between">
            <View className="flex-1 pr-4">
              <Text className="text-xs font-semibold uppercase tracking-[2px] text-teal-700">
                Explore the world
              </Text>
              <Text className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                Discover Mountains
              </Text>
              <Text className="mt-2 text-sm leading-6 text-slate-500">
                Curated peaks, routes, and summit details designed for quick
                browsing on mobile.
              </Text>
            </View>

            <View className="h-12 w-12 items-center justify-center rounded-2xl bg-teal-50">
              <Ionicons name="compass" size={22} color="#0f766e" />
            </View>
          </View>
        </View>

        {/* Hero Card */}
        <LinearGradient
          colors={["#0f766e", "#0ea5a4"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="mt-8 rounded-[30px] p-6"
          style={{ borderRadius: 30, overflow: "hidden" }}
        >
          <Text className="text-xs font-semibold tracking-[2px] text-white">
            MOUNTAINMAX PICKS
          </Text>

          <Text className="mt-3 text-3xl font-bold text-white leading-tight">
            Plan Your Next
            {"\n"}Adventure Escape
          </Text>

          <Text className="mt-3 text-sm leading-6 text-white">
            Find peaks, seasons, routes and climb difficulty instantly.
          </Text>

          <Pressable className="mt-5 p-4 self-start rounded-full bg-white px-5 py-3 active:scale-[0.97]">
            <Text className="text-sm font-semibold text-slate-900">
              {/* search icon */}

              <Ionicons name="search-outline" size={22} color="#0f172a" />
            </Text>
          </Pressable>
        </LinearGradient>

        {/* Quick Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mt-8"
        >
          <View className="flex-row gap-3">
            {["Popular", "Beginner", "Snow Peaks", "Asia", "Adventure"].map(
              (item) => (
                <View
                  key={item}
                  className="rounded-full border border-slate-200 bg-white px-5 py-3"
                >
                  <Text className="text-sm font-medium text-slate-700">
                    {item}
                  </Text>
                </View>
              ),
            )}
          </View>
        </ScrollView>

        {/* Featured */}
        <View className="mt-10 flex-row items-center justify-between">
          <Text className="text-2xl font-bold text-slate-900">
            Featured Peaks
          </Text>

          <Text className="text-sm font-semibold text-teal-700">See all</Text>
        </View>

        <View className="mt-5 gap-5">
          {featured.map((item, index) => (
            <Link key={item.id} href={`/mountain/${item.id}`} asChild>
              <Pressable
                className="overflow-hidden rounded-[28px] border border-slate-100 bg-white active:scale-[0.985]"
                style={{
                  borderRadius: 28,
                  overflow: "hidden",
                  boxShadow: "0px 6px 20px rgba(15, 23, 42, 0.06)",
                }}
              >
                {/* Image */}
                <Image
                  source={{
                    uri:
                      index % 2 === 0
                        ? "https://images.pexels.com/photos/18131619/pexels-photo-18131619.jpeg"
                        : "https://images.pexels.com/photos/35066466/pexels-photo-35066466.jpeg",
                  }}
                  className="h-52 w-full"
                  resizeMode="cover"
                />

                {/* Content */}
                <View className="p-5">
                  <View className="flex-row items-start justify-between">
                    <View className="flex-1 pr-4">
                      <Text className="text-xl font-bold text-slate-900">
                        {item.name}
                      </Text>

                      <Text className="mt-1 text-sm text-slate-500">
                        {item.country}
                      </Text>
                    </View>

                    <View className="rounded-full bg-slate-100 px-3 py-2">
                      <Text className="text-xs font-semibold text-slate-700">
                        {item.heightMeters} m
                      </Text>
                    </View>
                  </View>

                  <View className="mt-4 flex-row gap-2">
                    <View className="rounded-full bg-teal-50 px-4 py-2">
                      <Text className="text-xs font-semibold text-teal-700">
                        {item.challengeLevel}
                      </Text>
                    </View>

                    <View className="rounded-full bg-orange-50 px-4 py-2">
                      <Text className="text-xs font-semibold text-orange-700">
                        {item.bestSeason}
                      </Text>
                    </View>
                  </View>
                </View>
              </Pressable>
            </Link>
          ))}
        </View>

        {/* Bottom CTA */}
        <LinearGradient
          colors={["#111827", "#1e293b"]}
          className="mt-10 rounded-[28px] p-6"
          style={{ borderRadius: 28, overflow: "hidden" }}
        >
          <Text className="text-2xl font-bold text-white">Ready to Scan?</Text>

          <Text className="mt-2 text-sm leading-6 text-white">
            Upload any mountain image and get instant intelligence.
          </Text>

          <View className="mt-5 flex-row items-center gap-2">
            <Ionicons name="scan-outline" size={18} color="#fff" />
            <Text className="text-sm font-semibold text-white">
              Open Scanner
            </Text>
          </View>
        </LinearGradient>
      </ScrollView>
    </LinearGradient>
  );
}
