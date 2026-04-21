import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import { PlatformPressable } from "@react-navigation/elements";
import * as Haptics from "expo-haptics";
import { useEffect, useRef } from "react";
import { Animated, Platform } from "react-native";

export function HapticTab(props: BottomTabBarButtonProps) {
  const isFocused = Boolean(props.accessibilityState?.selected);

  const scale = useRef(new Animated.Value(isFocused ? 1 : 0.98)).current;
  const bgOpacity = useRef(new Animated.Value(isFocused ? 1 : 0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: isFocused ? 1 : 0.98,
        friction: 8,
        tension: 150,
        useNativeDriver: false,
      }),

      Animated.timing(bgOpacity, {
        toValue: isFocused ? 1 : 0,
        duration: 220,
        useNativeDriver: false,
      }),
    ]).start();
  }, [isFocused]);

  const onPressIn = (ev: any) => {
    props.onPressIn?.(ev);

    if (Platform.OS === "ios") {
      void Haptics.selectionAsync();
    }
  };

  return (
    <PlatformPressable
      {...props}
      onPressIn={onPressIn}
      hitSlop={10}
      pressRetentionOffset={12}
      android_disableSound
      style={[
        props.style,
        {
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          minWidth: 0,
          alignSelf: "stretch",
          paddingVertical: Platform.OS === "android" ? 6 : 8,
        },
      ]}
      android_ripple={{ color: "#dbeafe", borderless: false }}
    >
      <Animated.View
        style={{
          width: "100%",
          maxWidth: Platform.OS === "android" ? 108 : 120,
          height: Platform.OS === "android" ? 50 : 54,
          borderRadius: 18,
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          transform: [{ scale }],
        }}
      >
        <Animated.View
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: Platform.OS === "android" ? "#e3f2fd" : "#ECFDF5",
            borderRadius: 18,
            opacity: bgOpacity,
          }}
        />

        {props.children}
      </Animated.View>
    </PlatformPressable>
  );
}
