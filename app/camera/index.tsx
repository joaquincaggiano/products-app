import { useRef, useState } from "react";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { Image, StyleSheet, View } from "react-native";
import ShutterButton from "@/camera/components/ShutterButton";
import PermissionsDenied from "@/camera/components/PermissionsDenied";
import MenuIconButton from "@/theme/components/MenuIconButton";
import { router } from "expo-router";
import ConfirmImageButton from "@/camera/components/ConfirmImageButton";

const CameraScreen = () => {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [selectedImage, setSelectedImage] = useState<string>();

  const cameraRef = useRef<CameraView>(null);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    <PermissionsDenied onPress={requestPermission} />;
  }

  const onShutterButtonPress = async () => {
    if (!cameraRef.current) return;

    const picture = await cameraRef.current.takePictureAsync({
      quality: 0.7,
    });

    console.log(picture);

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

  const onPictureAccepted = () => {
    // todo: implementar función
  }

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
