import { useRef, useState } from "react";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { StyleSheet, View } from "react-native";
import ShutterButton from "@/camera/components/ShutterButton";
import PermissionsDenied from "@/camera/components/PermissionsDenied";

const CameraScreen = () => {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();

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

    // todo: guardar imagen
  };

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera} facing={facing}>
        <ShutterButton onPress={onShutterButtonPress} />
        {/* <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity> */}
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
