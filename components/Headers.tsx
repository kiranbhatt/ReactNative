import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Location from "expo-location";
import { useRouter } from "expo-router";

export default function Headers() {
  const [address, setAddress] = useState("Fetching location...");
  const [deliveryTime] = useState("9 minutes");
  const router = useRouter();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setAddress("Permission denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      let reverseGeocode = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (reverseGeocode.length > 0) {
        const place = reverseGeocode[0];
        setAddress(`${place.name || ""}, ${place.city || ""}`);
      }
    })();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* 🔹 Top Header (logo + profile) */}
      <View style={styles.header}>
        {/* Left Side: Logo + Text */}
        <View style={styles.left}>
          <Image
            source={require("../assets/images/logo.png")}
            style={styles.logo}
          />
          <View>
            <Text style={styles.tagline}>NimbleHome - agile & effortless</Text>
            <Text style={styles.delivery}>⏱ Delivery in {deliveryTime}</Text>
            <Text style={styles.address}>📍 {address}</Text>
          </View>
        </View>

        {/* Right Side: Profile */}
        <TouchableOpacity onPress={() => router.push("/profile")}>
          <Image
            source={require("../assets/images/profile.png")}
            style={styles.profile}
          />
        </TouchableOpacity>
      </View>

      {/* 🔹 Search Bar full width */}
      <View style={styles.searchWrapper}>
        <TextInput
          placeholder="Search for products, categories..."
          placeholderTextColor="gray"
          style={styles.searchInput}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#fff",
  },

  left: {
    flexDirection: "row",
    alignItems: "flex-start",
    flex: 1,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
    resizeMode: "contain",
  },
  tagline: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  delivery: {
    fontSize: 12,
    color: "green",
    marginTop: 2,
  },
  address: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  profile: {
    width: 35,
    height: 35,
    borderRadius: 18,
    marginLeft: 10,
  },
    header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,         // ✅ separates header
    borderBottomColor: "#eee",    // ✅ light divider
    zIndex: 2,                    // ✅ ensure header stays on top
  },

  searchWrapper: {
    marginTop: 0,                 // ✅ no gap "inside" header
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginHorizontal: 16,
    marginBottom: 8,   
    shadowColor: "#000",
  shadowOpacity: 0.1,
  shadowRadius: 3,
  elevation: 2, // ✅ works for Android           // ✅ extra breathing room
  },

  searchInput: {
    fontSize: 14,
    color: "#000",
  },
  
});
