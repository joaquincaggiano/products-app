import { useAuthStore } from "@/auth/store/useAuthStore";
import ThemedButton from "@/theme/components/ThemedButton";
import ThemedLink from "@/theme/components/ThemedLink";
import { ThemedText } from "@/theme/components/ThemedText";
import ThemedTextInput from "@/theme/components/ThemedTextInput";
import { useThemeColor } from "@/theme/hooks/useThemeColor";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  useWindowDimensions,
  View,
} from "react-native";

const RegisterScreen = () => {
  const { register } = useAuthStore();

  const { height } = useWindowDimensions();
  const backgroundColor = useThemeColor({}, "background");

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const onRegister = async () => {
    const { fullName, email, password } = form;

    if (fullName.trim().length === 0 || email.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    setIsLoading(true);
    const wasSuccessful = await register(fullName, email, password);
    setIsLoading(false);

    if (wasSuccessful) {
      router.replace("/");
      return;
    }

    Alert.alert("Error", "Error al registrar usuario");
  };

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
            value={form.fullName}
            onChangeText={(text) => setForm({ ...form, fullName: text })}
          />
          <ThemedTextInput
            placeholder="Correo electrónico"
            keyboardType="email-address"
            autoCapitalize="none"
            icon="mail-outline"
            value={form.email}
            onChangeText={(text) => setForm({ ...form, email: text })}
          />
          <ThemedTextInput
            placeholder="Contraseña"
            secureTextEntry={true}
            autoCapitalize="none"
            icon="lock-closed-outline"
            value={form.password}
            onChangeText={(text) => setForm({ ...form, password: text })}
          />
        </View>

        <ThemedButton
          icon="log-in-outline"
          onPress={onRegister}
          disabled={isLoading}
        >
          Crear cuenta
        </ThemedButton>

        <View className="flex-row items-center justify-center gap-2 mt-10">
          <ThemedText>¿Ya tienes una cuenta?</ThemedText>
          <ThemedLink href="/auth/login" style={{ fontSize: 16 }}>
            Ingresar
          </ThemedLink>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
