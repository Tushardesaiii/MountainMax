import { Ionicons } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { useState } from "react";
import {
    ActivityIndicator,
    Image,
    ImageBackground,
    Pressable,
    ScrollView,
    Text,
    View,
} from "react-native";

import { MountainInfo, detectMountainFromUri } from "@/data/mountains";

type ScanState = "idle" | "analyzing" | "result" | "no-mountain";

const featuredMountainPhoto =
  "https://images.pexels.com/photos/9470957/pexels-photo-9470957.jpeg";

export default function ScanScreen() {
  const tabBarHeight = useBottomTabBarHeight();
  const [scanState, setScanState] = useState<ScanState>("idle");
  const [selectedUri, setSelectedUri] = useState<string | null>(null);
  const [mountain, setMountain] = useState<MountainInfo | null>(null);

  const runAnalysis = (uri: string) => {
    setSelectedUri(uri);
    setScanState("analyzing");

    setTimeout(() => {
      const result = detectMountainFromUri(uri);
      if (result) {
        setMountain(result);
        setScanState("result");
      } else {
        setMountain(null);
        setScanState("no-mountain");
      }
    }, 1200);
  };

  const handleCamera = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (permission.status !== "granted") {
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      quality: 0.8,
      allowsEditing: true,
    });
    if (!result.canceled && result.assets[0]?.uri) {
      runAnalysis(result.assets[0].uri);
    }
  };

  const handleGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      quality: 0.8,
      allowsEditing: true,
    });
    if (!result.canceled && result.assets[0]?.uri) {
      runAnalysis(result.assets[0].uri);
    }
  };

  return (
    <ImageBackground
      source={{ uri: featuredMountainPhoto }}
      resizeMode="cover"
      className="flex-1"
    >
      <LinearGradient
        colors={[
          "rgba(2, 12, 24, 0.28)",
          "rgba(2, 12, 24, 0.74)",
          "rgba(236, 246, 252, 0.96)",
          "rgba(248, 252, 255, 1)",
        ]}
        locations={[0, 0.34, 0.6, 1]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        className="flex-1"
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingTop: 20,
            paddingBottom: tabBarHeight + 32,
          }}
        >
          <View className="rounded-3xl border border-white/20 bg-white/10 p-5">
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-xs font-semibold uppercase tracking-[2px] text-cyan-100">
                  Alpine Intelligence
                </Text>
                <Text className="mt-2 text-3xl font-bold text-white">
                  MountainMax
                </Text>
              </View>

              <View className="h-14 w-14 items-center justify-center rounded-2xl border border-white/30 bg-white/15">
                <Ionicons name="triangle" size={24} color="#ffffff" />
              </View>
            </View>

            <Text className="mt-4 text-base leading-7 text-cyan-50">
              Scan mountain photos and get instant summit intelligence with a
              clean expedition workflow.
            </Text>

            <View className="mt-4 flex-row gap-2">
              <View className="rounded-full border border-white/25 bg-white/15 px-3 py-1.5">
                <Text className="text-xs font-medium text-white">AI Match</Text>
              </View>
              <View className="rounded-full border border-white/25 bg-white/15 px-3 py-1.5">
                <Text className="text-xs font-medium text-white">
                  Terrain IQ
                </Text>
              </View>
              <View className="rounded-full border border-white/25 bg-white/15 px-3 py-1.5">
                <Text className="text-xs font-medium text-white">
                  Altitude Data
                </Text>
              </View>
            </View>
          </View>

          <View className="mt-6 rounded-3xl border border-slate-200 bg-white/95 p-4 shadow-sm">
            <Text className="text-sm font-semibold uppercase tracking-[1.5px] text-slate-500">
              Start Scan
            </Text>

            <View className="mt-3 gap-3">
              <Pressable
                onPress={handleCamera}
                className="flex-row items-center justify-center gap-2 rounded-2xl bg-teal-700 py-4"
              >
                <Ionicons name="camera-outline" size={20} color="#ffffff" />
                <Text className="text-base font-semibold text-white">
                  Scan with Camera
                </Text>
              </Pressable>

              <Pressable
                onPress={handleGallery}
                className="flex-row items-center justify-center gap-2 rounded-2xl bg-slate-900 py-4"
              >
                <Ionicons name="images-outline" size={20} color="#ffffff" />
                <Text className="text-base font-semibold text-white">
                  Choose from Gallery
                </Text>
              </Pressable>
            </View>

        
          </View>

          {selectedUri ? (
            <View className="mt-6 overflow-hidden rounded-3xl border border-white/80 bg-white/85">
              <Image
                source={{ uri: selectedUri }}
                style={{ width: "100%", height: 220 }}
                resizeMode="cover"
              />
            </View>
          ) : null}

          {scanState === "analyzing" ? (
            <View className="mt-6 rounded-3xl bg-white/95 p-5">
              <View className="flex-row items-center gap-3">
                <ActivityIndicator color="#0f766e" />
                <Text className="text-base text-slate-800">
                  Analyzing terrain and mountain signatures...
                </Text>
              </View>
            </View>
          ) : null}

          {scanState === "result" && mountain ? (
            <View className="mt-6 rounded-3xl border border-white/80 bg-white/95 p-5">
              <Text className="text-2xl font-semibold text-slate-900">
                {mountain.name}
              </Text>
              <Text className="mt-1 text-base text-slate-600">
                {mountain.country}
              </Text>
              <Text className="mt-4 text-sm leading-6 text-slate-700">
                {mountain.geology}
              </Text>

              <View className="mt-4 flex-row gap-2">
                <View className="rounded-full bg-alpine-100 px-3 py-2">
                  <Text className="text-xs font-medium text-teal-800">
                    {mountain.heightMeters} m
                  </Text>
                </View>
                <View className="rounded-full bg-alpine-100 px-3 py-2">
                  <Text className="text-xs font-medium text-teal-800">
                    {mountain.challengeLevel}
                  </Text>
                </View>
              </View>

              <Link href={`/mountain/${mountain.id}`} asChild>
                <Pressable className="mt-5 items-center rounded-2xl bg-teal-700 py-3">
                  <Text className="text-sm font-semibold text-white">
                    View full mountain intelligence
                  </Text>
                </Pressable>
              </Link>
            </View>
          ) : null}

          {scanState === "no-mountain" ? (
            <View className="mt-6 rounded-3xl border border-white/80 bg-white/95 p-5">
              <Text className="text-xl font-semibold text-slate-900">
                No mountain found
              </Text>
              <Text className="mt-2 text-sm leading-6 text-slate-700">
                Try a clearer mountain photo with more landscape context, then
                scan again.
              </Text>
            </View>
          ) : null}
        </ScrollView>
      </LinearGradient>
    </ImageBackground>
  );
}
