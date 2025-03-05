import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useThemeColor } from "@/theme/hooks/useThemeColor";
import { PermissionResponse } from "expo-camera";

interface Props {
  onPress: () => Promise<PermissionResponse>;
}

const PermissionsDenied = ({ onPress }: Props) => {
  const primaryColor = useThemeColor({}, "primary");

  return (
    <View
      style={{
        ...styles.container,
        marginHorizontal: 30,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={styles.message}>
        We need your permission to show the camera and the gallery
      </Text>
      <TouchableOpacity
        onPress={onPress}
        style={{ backgroundColor: primaryColor }}
        className="rounded-md p-4 w-full justify-center items-center"
      >
        <Text className="text-white text-lg font-kanit">Grant permission</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
});

export default PermissionsDenied;
