import { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, Animated, SafeAreaView, StatusBar, Alert } from "react-native";
import { useRouter } from "expo-router";
import { CameraView, useCameraPermissions, BarcodeScanningResult } from "expo-camera";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";

export default function UnifiedScannerScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanMode, setScanMode] = useState("auto"); // "auto", "barcode", "food"
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const [takingPicture, setTakingPicture] = useState(false);
  const cameraRef = useRef(null);
  const router = useRouter();
  
  // Animation values
  const scanAnimation = useRef(new Animated.Value(0)).current;
  const loadingOpacity = useRef(new Animated.Value(0)).current;
  
  // Start scanning animation
  useEffect(() => {
    if (!scanned && permission?.granted && !loading) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scanAnimation, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true
          }),
          Animated.timing(scanAnimation, {
            toValue: 0,
            duration: 1500,
            useNativeDriver: true
          })
        ])
      ).start();
    } else {
      scanAnimation.setValue(0);
    }
  }, [scanned, permission?.granted, loading]);
  
  // Loading animation
  useEffect(() => {
    if (loading) {
      Animated.timing(loadingOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true
      }).start();
    } else {
      Animated.timing(loadingOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true
      }).start();
    }
  }, [loading]);
  
  useEffect(() => {
    if (permission && !permission.granted) {
      requestPermission();
    }
  }, [permission]);

  const handleBarCodeScanned = async ({ type, data }: BarcodeScanningResult) => {
    if (scanned || loading || takingPicture || scanMode === "food") return;
    
    setScanned(true);
    setLoading(true);
    
    // Simulate API call with a timeout
    setTimeout(() => {
      setLoading(false);
      // Navigate to product details with dummy data
      router.push({
        pathname: "/(logfood)/productscreen",
        params: { 
          foodName: "Scanned Product",
          scanMethod: "barcode"
        }
      });
    }, 1500);
  };

  const handleCaptureFood = async () => {
    if (takingPicture || loading || !cameraReady || (scanMode === "barcode" && !scanned)) return;
    
    setTakingPicture(true);
    setLoading(true);
    
    try {
      // Simulate taking a photo
      if (cameraRef.current) {
        // Just for visual effect - we'll take a picture but not use it
        await cameraRef.current.takePictureAsync();
      }
      
      // Simulate processing delay
      setTimeout(() => {
        setLoading(false);
        setTakingPicture(false);
        
        // Navigate to product screen with dummy data
        router.push({
          pathname: "/(logfood)/productscreen",
          params: { 
            foodName: "Apple",
            scanMethod: "food"
          }
        });
      }, 2000);
    } catch (error) {
      console.error("Error capturing image:", error);
      Alert.alert(
        "Camera Error", 
        "We couldn't capture the image. Please try again.",
        [{ text: "OK", style: "default" }]
      );
      setLoading(false);
      setTakingPicture(false);
    }
  };
  
  // Switch scan mode
  const toggleScanMode = () => {
    setScanMode(scanMode === "barcode" ? "food" : "barcode");
    setScanned(false);
  };

  if (!permission) {
    return (
      <SafeAreaView className="flex-1 bg-black items-center justify-center">
        <StatusBar barStyle="light-content" />
        <Ionicons name="scan-outline" size={48} color="#ffffff" />
        <ActivityIndicator size="small" color="#ffffff" className="mt-4" />
        <Text className="text-white mt-2 font-medium">Preparing scanner...</Text>
      </SafeAreaView>
    );
  }

  if (!permission.granted) {
    return (
      <SafeAreaView className="flex-1 bg-black items-center justify-center p-6">
        <StatusBar barStyle="light-content" />
        <Ionicons name="camera" size={64} color="#ffffff" />
        <Text className="text-white text-xl font-bold mt-4">Camera Access Required</Text>
        <Text className="text-white text-center mt-2">
          We need camera access to scan food items and barcodes.
        </Text>
        <TouchableOpacity 
          className="bg-blue-500 px-6 py-3 rounded-full mt-6"
          onPress={requestPermission}
        >
          <Text className="text-white font-semibold">Allow Camera Access</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          className="mt-4 px-6 py-3"
          onPress={() => router.back()}
        >
          <Text className="text-white">Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-black">
      <StatusBar barStyle="light-content" />
      
      <View className="flex-1">
        <CameraView
          ref={cameraRef}
          style={{ flex: 1 }}
          onCameraReady={() => setCameraReady(true)}
          onBarcodeScanned={scanMode !== "food" ? (scanned ? undefined : handleBarCodeScanned) : undefined}
          barcodeScannerSettings={{
            barcodeTypes: ["ean13", "ean8", "upc_e", "upc_a"],
          }}
        >
          {/* Header with mode selector */}
          <View className="items-center pt-2 flex-row justify-center">
            <Text className="text-white text-xl font-bold px-2">
              {scanMode === "food" ? "Food Scanner" : scanMode === "barcode" ? "Barcode Scanner" : "Smart Scanner"}
            </Text>
          </View>
          
          {/* Mode selector pills */}
          <View className="flex-row justify-center mt-2">
            <View className="flex-row bg-gray-800 rounded-full p-1">
              <TouchableOpacity 
                className={`px-4 py-2 rounded-full ${scanMode !== "barcode" ? "" : "bg-blue-500"}`}
                onPress={() => setScanMode("barcode")}
              >
                <Text className="text-white">Barcode</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                className={`px-4 py-2 rounded-full ${scanMode === "auto" ? "bg-blue-500" : ""}`}
                onPress={() => setScanMode("auto")}
              >
                <Text className="text-white">Auto</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                className={`px-4 py-2 rounded-full ${scanMode === "food" ? "bg-blue-500" : ""}`}
                onPress={() => setScanMode("food")}
              >
                <Text className="text-white">Food</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Scanning box */}
          <View className="flex-1 items-center justify-center">
            <View className="w-96  h-96 border-2 border-white rounded-lg border-opacity-70 overflow-hidden">
              {/* Animated scanning line */}
              <Animated.View 
                className="w-full h-2 bg-blue-500 opacity-80"
                style={{
                  transform: [
                    { 
                      translateY: scanAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 250]
                      })
                    }
                  ]
                }}
              />
            </View>
            <Text className="text-white text-lg mt-4 text-center px-8">
              {scanMode === "food" 
                ? "Position food in frame and tap capture" 
                : scanMode === "barcode" 
                  ? "Align barcode within the frame" 
                  : "Align barcode or position food in frame"}
            </Text>
          </View>
          
          {/* Camera not ready indicator */}
          {!cameraReady && (
            <View className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-70 justify-center items-center">
              <ActivityIndicator size="small" color="#ffffff" />
              <Text className="text-white mt-2">Camera initializing...</Text>
            </View>
          )}
          
          {/* Bottom controls */}
          <View className="absolute bottom-0 left-0 right-0 p-8">
            <BlurView intensity={30} className="rounded-full overflow-hidden">
              <View className="flex-row items-center justify-between p-4">
                <TouchableOpacity 
                  className="w-12 h-12 rounded-full bg-gray-700 bg-opacity-50 justify-center items-center"
                  onPress={() => router.back()}
                >
                  <Ionicons name="arrow-back" size={24} color="#ffffff" />
                </TouchableOpacity>
                
                <TouchableOpacity 
                  className="w-20 h-20 rounded-full bg-white justify-center items-center"
                  onPress={scanMode === "food" || (scanMode === "auto" && scanned) ? handleCaptureFood : () => setScanned(false)}
                  disabled={loading || (scanMode === "barcode" && !scanned) || !cameraReady}
                >
                  <View className="w-16 h-16 rounded-full bg-blue-500 justify-center items-center">
                    {loading ? (
                      <ActivityIndicator size="small" color="#ffffff" />
                    ) : scanMode === "food" || (scanMode === "auto" && scanned) ? (
                      <Ionicons name="camera" size={32} color="#ffffff" />
                    ) : scanned ? (
                      <Ionicons name="refresh" size={32} color="#ffffff" />
                    ) : (
                      <Ionicons name="scan" size={32} color="#ffffff" />
                    )}
                  </View>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  className="w-12 h-12 rounded-full bg-gray-700 bg-opacity-50 justify-center items-center"
                  onPress={toggleScanMode}
                >
                  <Ionicons name={scanMode === "food" ? "barcode-outline" : "restaurant-outline"} size={24} color="#ffffff" />
                </TouchableOpacity>
              </View>
            </BlurView>
          </View>
        </CameraView>
      </View>
      
      {/* Loading overlay */}
      <Animated.View 
        className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-70 justify-center items-center"
        style={{ opacity: loadingOpacity, pointerEvents: loading ? 'auto' : 'none' }}
      >
        <View className="bg-white bg-opacity-10 p-6 rounded-2xl">
          <ActivityIndicator size="large" color="#ffffff" />
          <Text className="text-white font-medium mt-4 text-center">
            {scanMode === "food" ? "Identifying food..." : "Fetching product data..."}
          </Text>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}