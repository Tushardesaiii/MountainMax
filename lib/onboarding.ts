import AsyncStorage from "@react-native-async-storage/async-storage";

export type ExperienceLevel = "Beginner" | "Intermediate" | "Advanced";

export type OnboardingProfile = {
  fullName: string;
  homeCountry: string;
  experience: ExperienceLevel;
  goals: string[];
  notificationsEnabled: boolean;
};

const ONBOARDING_COMPLETE_KEY = "mountainmax.onboarding.complete";
const ONBOARDING_PROFILE_KEY = "mountainmax.onboarding.profile";

export async function getIsOnboardingComplete(): Promise<boolean> {
  const value = await AsyncStorage.getItem(ONBOARDING_COMPLETE_KEY);
  return value === "true";
}

export async function setOnboardingComplete(nextValue: boolean): Promise<void> {
  if (nextValue) {
    await AsyncStorage.setItem(ONBOARDING_COMPLETE_KEY, "true");
    return;
  }

  await AsyncStorage.removeItem(ONBOARDING_COMPLETE_KEY);
}

export async function saveOnboardingProfile(
  profile: OnboardingProfile,
): Promise<void> {
  await AsyncStorage.setItem(ONBOARDING_PROFILE_KEY, JSON.stringify(profile));
}

export async function getOnboardingProfile(): Promise<OnboardingProfile | null> {
  const value = await AsyncStorage.getItem(ONBOARDING_PROFILE_KEY);
  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value) as OnboardingProfile;
  } catch {
    return null;
  }
}
