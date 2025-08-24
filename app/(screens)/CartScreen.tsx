import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import { useAuth } from "@/context/AuthContext";
import {
  getCart,
  updateCartItem,
  removeCartItem,
} from "../../scripts/cart";

type CartItem = {
  _id: string;
  product: {
    _id: string;
    name: string;
    price: number;
    image: string;
  };
  quantity: number;
};

export default function CartScreen() {
  const { user } = useAuth();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [coupon, setCoupon] = useState("");
  const [deliveryCharge] = useState(30); // fixed example
  const [handlingCharge] = useState(10);

  useEffect(() => {
    if (user) fetchCart();
  }, [user]);

  const fetchCart = async () => {
    setLoading(true);
    const { ok, data } = await getCart(user!);
    if (ok) setCart(data);
    else Alert.alert("Error", data.message || "Cannot fetch cart");
    setLoading(false);
  };

  const handleQuantityChange = async (itemId: string, quantity: number) => {
    if (quantity < 1) return;
    await updateCartItem(user!, itemId, quantity);
    setCart((prev) =>
      prev.map((c) => (c._id === itemId ? { ...c, quantity } : c))
    );
  };

  const handleRemove = async (itemId: string) => {
    await removeCartItem(user!, itemId);
    setCart((prev) => prev.filter((c) => c._id !== itemId));
  };

  const itemsTotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const grandTotal = itemsTotal + deliveryCharge + handlingCharge;

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Checkout</Text>

      {/* Cart Items */}
      {cart.map((item) => (
        <View key={item._id} style={styles.cartItem}>
          <Text style={styles.itemName}>{item.product.name}</Text>
          <Text>Price: ₹{item.product.price}</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              onPress={() =>
                handleQuantityChange(item._id, item.quantity - 1)
              }
            >
              <Text style={styles.qtyBtn}>-</Text>
            </TouchableOpacity>
            <Text style={styles.qtyText}>{item.quantity}</Text>
            <TouchableOpacity
              onPress={() =>
                handleQuantityChange(item._id, item.quantity + 1)
              }
            >
              <Text style={styles.qtyBtn}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleRemove(item._id)}>
              <Text style={styles.removeBtn}>Remove</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      {/* Coupon */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Use Coupon</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter coupon code"
          value={coupon}
          onChangeText={setCoupon}
        />
      </View>

      {/* Bill Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Bill Details</Text>
        <Text>Items Total: ₹{itemsTotal}</Text>
        <Text>Delivery Charges: ₹{deliveryCharge}</Text>
        <Text>Handling Charges: ₹{handlingCharge}</Text>
        <Text style={styles.grandTotal}>Grand Total: ₹{grandTotal}</Text>
      </View>

      {/* Address */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Delivery Address</Text>
        <Text>Your saved address here</Text>
        <TouchableOpacity>
          <Text style={styles.changeBtn}>Change</Text>
        </TouchableOpacity>
      </View>

      {/* Payment */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Option</Text>
        <Text>COD / Online Payment</Text>
      </View>

      <TouchableOpacity style={styles.placeOrderBtn}>
        <Text style={styles.placeOrderText}>Place Order ₹{grandTotal}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#f9f9f9" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: { fontSize: 24, fontWeight: "bold", textAlign: "center", margin: 10 },
  cartItem: {
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
  },
  itemName: { fontWeight: "bold", fontSize: 16 },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  qtyBtn: {
    fontSize: 20,
    width: 30,
    textAlign: "center",
    backgroundColor: "#ddd",
    borderRadius: 5,
    marginHorizontal: 5,
  },
  qtyText: { fontSize: 16, marginHorizontal: 5 },
  removeBtn: { color: "red", marginLeft: 10 },
  section: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
  },
  sectionTitle: { fontWeight: "bold", fontSize: 16, marginBottom: 5 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 5,
    borderRadius: 5,
  },
  grandTotal: { fontWeight: "bold", fontSize: 16, marginTop: 5 },
  changeBtn: { color: "blue", marginTop: 5 },
  placeOrderBtn: {
    backgroundColor: "green",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
  },
  placeOrderText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
