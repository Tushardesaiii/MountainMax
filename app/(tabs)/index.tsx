import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

import { MountainInfo, detectMountainFromUri } from "@/data/mountains";

type ScanState = "idle" | "analyzing" | "result" | "no-mountain";

export default function ScanScreen() {
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
    <LinearGradient
      colors={["#dff6ff", "#ecf9ff", "#f8fcff"]}
      className="flex-1"
    >
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
        <Text className="text-3xl font-semibold text-slate-900">
          MountainMax
        </Text>
        <Text className="mt-2 text-base leading-7 text-slate-700">
          Scan a mountain photo to discover what it is, how it formed, and what
          adventure value it offers.
        </Text>

        <View className="mt-6 gap-3">
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

        {selectedUri ? (
          <View className="mt-6 overflow-hidden rounded-3xl bg-white/85">
            <Image
              source={{ uri: selectedUri }}
              style={{ width: "100%", height: 220 }}
              resizeMode="cover"
            />
          </View>
        ) : null}

        {scanState === "analyzing" ? (
          <View className="mt-6 rounded-3xl bg-white/90 p-5">
            <View className="flex-row items-center gap-3">
              <ActivityIndicator color="#0f766e" />
              <Text className="text-base text-slate-800">
                Analyzing terrain and mountain signatures...
              </Text>
            </View>
          </View>
        ) : null}

        {scanState === "result" && mountain ? (
          <View className="mt-6 rounded-3xl bg-white/95 p-5">
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
          <View className="mt-6 rounded-3xl bg-white/95 p-5">
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
  );
}
