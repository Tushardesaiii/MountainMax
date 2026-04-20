import AsyncStorage from "@react-native-async-storage/async-storage";

export const AUTH_KEY = "mountainmax.auth.loggedIn";

export async function getIsLoggedIn(): Promise<boolean> {
  const value = await AsyncStorage.getItem(AUTH_KEY);
  return value === "true";
}

export async function setIsLoggedIn(nextValue: boolean): Promise<void> {
  if (nextValue) {
    await AsyncStorage.setItem(AUTH_KEY, "true");
    return;
  }

  await AsyncStorage.removeItem(AUTH_KEY);
}
