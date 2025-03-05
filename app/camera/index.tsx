import { useRef, useState } from "react";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import * as MediaLibrary from "expo-media-library";
import { Alert, Image, StyleSheet, View } from "react-native";
import ShutterButton from "@/camera/components/ShutterButton";
import MenuIconButton from "@/theme/components/MenuIconButton";
import ConfirmImageButton from "@/camera/components/ConfirmImageButton";
import GetPermissions from "@/camera/components/GetPermissions";

const CameraScreen = () => {
  const [facing, setFacing] = useState<CameraType>("back");
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [selectedImage, setSelectedImage] = useState<string>();
  const [mediaPermission, requestMediaPermission] =
    MediaLibrary.usePermissions();

  const cameraRef = useRef<CameraView>(null);

  const onRequestPermissions = async () => {
    try {
      const { status: cameraStatus } = await requestCameraPermission();
      const { status: mediaStatus } = await requestMediaPermission();

      if (cameraStatus !== "granted" || mediaStatus !== "granted") {
        throw new Error("Permisos denegados");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Error al solicitar permisos");
    }
  };

  if (!cameraPermission || !mediaPermission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!cameraPermission.granted || !mediaPermission.granted) {
    // Camera permissions are not granted yet.
    <GetPermissions onPress={onRequestPermissions} />;
  }

  const onShutterButtonPress = async () => {
    if (!cameraRef.current) return;

    const picture = await cameraRef.current.takePictureAsync({
      quality: 0.7,
    });

    if (!picture?.uri) return;

    setSelectedImage(picture.uri);

    // todo: guardar imagen
  };

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const onReturnCancel = () => {
    // todo: limpiar estado
    router.dismiss();
  };

  const onPictureAccepted = async () => {
    if (!selectedImage) return;

    await MediaLibrary.createAssetAsync(selectedImage);

    router.dismiss();
  };

  const onRetakePicture = () => {
    setSelectedImage(undefined);
  };

  if (selectedImage) {
    return (
      <View style={styles.container}>
        <Image source={{ uri: selectedImage }} style={styles.camera} />

        <ConfirmImageButton onPress={onPictureAccepted} />

        <MenuIconButton
          onPress={onRetakePicture}
          icon="close-outline"
          size={30}
          color="white"
          style={styles.returnCancelButton}
        />

        <MenuIconButton
          onPress={onReturnCancel}
          icon="arrow-back-outline"
          size={30}
          color="white"
          style={styles.returnCancelButton}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera} facing={facing}>
        <ShutterButton onPress={onShutterButtonPress} />

        <MenuIconButton
          onPress={toggleCameraFacing}
          icon="camera-reverse-outline"
          size={30}
          color="white"
          style={styles.flipCameraButton}
        />

        <MenuIconButton
          onPress={() => {}}
          icon="images-outline"
          size={30}
          color="white"
          style={styles.galleryButton}
        />

        <MenuIconButton
          onPress={onReturnCancel}
          icon="arrow-back-outline"
          size={30}
          color="white"
          style={styles.returnCancelButton}
        />
      </CameraView>
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
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },

  flipCameraButton: {
    width: 50,
    height: 50,
    borderRadius: 32,
    backgroundColor: "#17202A",
    position: "absolute",
    bottom: 40,
    right: 32,
    justifyContent: "center",
    alignItems: "center",
  },

  galleryButton: {
    width: 50,
    height: 50,
    borderRadius: 32,
    backgroundColor: "#17202A",
    position: "absolute",
    bottom: 40,
    left: 32,
    justifyContent: "center",
    alignItems: "center",
  },

  returnCancelButton: {
    width: 50,
    height: 50,
    borderRadius: 32,
    backgroundColor: "#17202A",
    position: "absolute",
    top: 40,
    left: 32,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CameraScreen;
