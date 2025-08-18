import { useRouter } from "expo-router";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { View, ActivityIndicator } from "react-native";

export default function Index() {
  const { user, loading } = useAuth(); // 👈 get loading too
  const router = useRouter();

  useEffect(() => {
    if (!loading) { // 👈 wait until AsyncStorage check finishes
      if (user) {
        router.replace("/(tabs)/home");
      } else {
        router.replace("/(screens)/AuthScreen");
      }
    }
  }, [user, loading, router]);

  if (loading) {
    // splash / loader while checking AsyncStorage
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return null;
}
