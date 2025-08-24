import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { getProducts } from "../../scripts/products"; // ✅ import API

type Product = {
  _id: string;
  name: string;
  category: string;
  subcategory: string;
  price: number;
  image: string; // just the filename
  specialOffer: boolean;
  discount: number;
};

export default function HomeScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { ok, data } = await getProducts();
    if (ok) {
      setProducts(data);
    } else {
      Alert.alert("Error", data.message || "Failed to fetch products");
    }
    setLoading(false);
  };

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => [...prev, product]);
    Alert.alert("Added to cart", `${product.name} added to cart`);
  };

  // 🔹 Helper function to get local image
  const getImage = (imageName: string) => {
    switch (imageName) {
      case "onion.jpg":
        return require("../../assets/images/Product/onion.jpg");
      case "potato.jpg":
        return require("../../assets/images/Product/Potato.jpg");
      case "tomato.jpg":
        return require("../../assets/images/Product/tomato.jpg");
      default:
        return require("../../assets/images/profile.png"); // fallback
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <Image
              source={getImage(item.image)}
              style={styles.productImage}
            />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>₹{item.price}</Text>
            {item.discount > 0 && (
              <Text style={styles.productDiscount}>{item.discount}% Off</Text>
            )}
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => handleAddToCart(item)}
            >
              <Text style={styles.addButtonText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        )}
        numColumns={2}
        contentContainerStyle={styles.flatListContent}
      />

      {cartItems.length > 0 && (
        <TouchableOpacity
          style={styles.viewCartButton}
          onPress={() => router.push("../(screens)/CartScreen")}
        >
          <Text style={styles.viewCartText}>View Cart ({cartItems.length})</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  flatListContent: { padding: 10 },
  productCard: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 5,
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
  },
  productImage: { width: 100, height: 100, resizeMode: "contain" },
  productName: { fontSize: 14, fontWeight: "bold", marginTop: 5 },
  productPrice: { fontSize: 14, color: "green", marginTop: 2 },
  productDiscount: { fontSize: 12, color: "red", marginTop: 2 },
  addButton: {
    marginTop: 5,
    backgroundColor: "green",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  addButtonText: { color: "#fff", fontWeight: "bold" },
  viewCartButton: {
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
    backgroundColor: "orange",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  viewCartText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
