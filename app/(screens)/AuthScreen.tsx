import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { loginUser, signupUser } from "../../scripts/Auth";
import { useRouter } from "expo-router"; // ✅ import router

export default function AuthScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter(); // ✅ get router instance

  const handleLogin = async () => {
    const { ok, data } = await loginUser(email, password);
    if (ok) {
      router.replace("/");
    } else {
      Alert.alert("Error", data.message || "Login failed");
    }
  };

  const handleSignup = async () => {
    const { ok, data } = await signupUser(email, password);
    if (ok) {
      Alert.alert("Success", "Signed up successfully!");
    } else {
      Alert.alert("Error", data.message || "Signup failed");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup / Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <View style={{ height: 10 }} />
      <Button title="Sign Up" onPress={handleSignup} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});
