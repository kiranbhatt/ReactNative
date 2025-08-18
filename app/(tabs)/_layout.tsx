import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Headers from "@/components/Headers"; // 👈 import your existing component

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        header: () => <Headers />, // 👈 use your custom header everywhere
        tabBarActiveTintColor: "green",
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: "Orders",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          title: "Categories",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
      name="index"
      options={{
        href: null, // 👈 hides "index" from tab bar
      }}
/>
    </Tabs>
  );
}
