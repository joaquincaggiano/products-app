import ThemedButton from "@/theme/components/ThemedButton";
import { ThemedText } from "@/theme/components/ThemedText";
import ThemedTextInput from "@/theme/components/ThemedTextInput";
import {
  KeyboardAvoidingView,
  ScrollView,
  useWindowDimensions,
  View,
} from "react-native";

const LoginScreen = () => {
  const { height } = useWindowDimensions();
  return (
    <KeyboardAvoidingView behavior="padding" className="flex-1">
      <ScrollView className="mx-10">
        <View style={{ paddingTop: height * 0.35 }}>
          <ThemedText type="title">Ingresar</ThemedText>
          <ThemedText style={{ color: "grey" }}>
            Por favor, ingrese sus datos
          </ThemedText>
        </View>

        <View className="mt-5 mb-10 gap-5">
          <ThemedTextInput
            placeholder="Correo electrónico"
            keyboardType="email-address"
            autoCapitalize="none"
            icon="mail-outline"
          />
          <ThemedTextInput
            placeholder="Contraseña"
            secureTextEntry={true}
            autoCapitalize="none"
            icon="lock-closed-outline"
          />
        </View>

        <ThemedButton icon="log-in-outline">Ingresar</ThemedButton>

        <View className="flex-row items-center justify-center gap-2 mt-10">
          <ThemedText>¿No tienes una cuenta?</ThemedText>
          <ThemedText>Regístrate</ThemedText>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
