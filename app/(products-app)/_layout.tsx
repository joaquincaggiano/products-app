import LogoutIconButton from "@/auth/components/LogoutIconButton";
import { useAuthStore } from "@/auth/store/useAuthStore";
import { useThemeColor } from "@/theme/hooks/useThemeColor";
import { Redirect, Stack } from "expo-router";
import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";

const CheckAuthenticationLayout = () => {
  const { status, checkStatus } = useAuthStore();
  const backgroundColor = useThemeColor({}, "background");
  useEffect(() => {
    checkStatus();
  }, []);

  if (status === "checking") {
    return (
      <View className="flex-1 items-center justify-center mb-2">
        <ActivityIndicator />
      </View>
    );
  }

  if (status === "unauthenticated") {
    return <Redirect href="/auth/login" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: { backgroundColor },
        contentStyle: { backgroundColor },
      }}
    >
      <Stack.Screen
        name="(home)/index"
        options={{
          title: "Productos",
          headerLeft: () => <LogoutIconButton />,
        }}
      />
    </Stack>
  );
};

export default CheckAuthenticationLayout;
