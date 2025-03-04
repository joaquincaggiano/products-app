import { useAuthStore } from "../store/useAuthStore";
import { useThemeColor } from "@/theme/hooks/useThemeColor";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const LogoutIconButton = () => {
  const { logout } = useAuthStore();
  const primaryColor = useThemeColor({}, "primary");

  return (
    <TouchableOpacity onPress={logout} className="p-2">
      <Ionicons name="log-out-outline" size={24} color={primaryColor} />
    </TouchableOpacity>
  );
};

export default LogoutIconButton;
