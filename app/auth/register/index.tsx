import ThemedButton from "@/theme/components/ThemedButton";
import ThemedLink from "@/theme/components/ThemedLink";
import { ThemedText } from "@/theme/components/ThemedText";
import ThemedTextInput from "@/theme/components/ThemedTextInput";
import { useThemeColor } from "@/theme/hooks/useThemeColor";
import {
  KeyboardAvoidingView,
  ScrollView,
  useWindowDimensions,
  View,
} from "react-native";

const RegisterScreen = () => {
  const { height } = useWindowDimensions();
  const backgroundColor = useThemeColor({}, "background");

  return (
    <KeyboardAvoidingView behavior="padding" className="flex-1">
      <ScrollView className="mx-10" style={{ backgroundColor }}>
        <View style={{ paddingTop: height * 0.35 }}>
          <ThemedText type="title">Registrar</ThemedText>
          <ThemedText style={{ color: "grey" }}>
            Por favor, ingrese sus datos
          </ThemedText>
        </View>

        <View className="mt-5 mb-10 gap-5">
          <ThemedTextInput
            placeholder="Nombre completo"
            autoCapitalize="words"
            icon="person-outline"
          />
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

        <ThemedButton icon="log-in-outline">Crear cuenta</ThemedButton>

        <View className="flex-row items-center justify-center gap-2 mt-10">
          <ThemedText>¿Ya tienes una cuenta?</ThemedText>
          <ThemedLink href="/auth/login" style={{fontSize: 16}}>Ingresar</ThemedLink>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
