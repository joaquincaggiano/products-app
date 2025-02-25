import { useAuthStore } from "@/auth/store/useAuthStore";
import { Redirect, Stack } from "expo-router";
import { useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";

const CheckAuthenticationLayout = () => {
  const { status, checkStatus } = useAuthStore();

  useEffect(() => {
    checkStatus();
  }, [])

  if (status === "checking") {
    return (
      <View className="flex-1 items-center justify-center mb-2">
        <ActivityIndicator />
      </View>
    );
  }

  if (status === "authenticated") {
    return <Redirect href="/auth/login" />
  }

  return (
    <Stack>
      <Stack.Screen name="(home)/index" options={{ title: "Productos" }} />
    </Stack>
  )
};

export default CheckAuthenticationLayout;
