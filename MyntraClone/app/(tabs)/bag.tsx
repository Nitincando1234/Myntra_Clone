import { Image, View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react-native";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "expo-router";

// const bagItems = [
//   {
//     id: 1,
//     name: "White Cotton T-Shirt",
//     brand: "H&M",
//     size: "L",
//     price: 799,
//     quantity: 1,
//     image:
//       "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop",
//   },
//   {
//     id: 2,
//     name: "Blue Denim Jacket",
//     brand: "Levis",
//     size: "M",
//     price: 2999,
//     quantity: 1,
//     image:
//       "https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?w=500&auto=format&fit=crop",
//   },
// ];

export default function Bag() {
    const router = useRouter();
    
    const [isLoading, setIsLoading] = useState(false);
    const [bag, setBag] = useState<any>(null);
    const { user } = useAuth();
    
    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = async () => {
        if(user) {
            try {
                setIsLoading(true);
                const bag = await axios.get(`https://myntra-clone-aado.onrender.com/bag/${user._id}`);
                setBag(bag.data);
            } catch(error) {
                console.log(error);
                setIsLoading(false);
            } finally {
                setIsLoading(false);
            }
        }
    };

    
    if(!user) {
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Shopping Bag</Text>
                </View>
                <View style={styles.emptyState}>
                    <ShoppingBag size={64} color="#ff3f6c"/>
                    <Text style={styles.emptyTitle}>Please Login to view your Bag</Text>
                    <TouchableOpacity style={styles.loginButton} onPress={() => router.push("/login")}>
                        <Text style={styles.loginButtonText}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    
    if(isLoading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#ff3f6c" />
            </View>
        );
    }

    const total = bag?.reduce(
        (sum: any, item: any) => sum + item.productId.price * item.quantity, 
    0);

    const handleDelete = async (itemid: any) =>{
        try {
            await axios.delete(`http://192.168.232.78:5000d}`);
            fetchProduct();
        } catch(error) {
            console.log(error);
        }
    };

    return (
    <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Shopping Bag</Text>
            </View>
            <ScrollView style={styles.content}>
                {bag?.map((item: any) => (
                    <View key={item._id} style={styles.bagItem}>
                        <Image source={{ uri: item.productId.images[0] }} style={styles.itemImage} />
                        <View style={styles.itemInfo}>
                            <Text style={styles.brandName}>{item.productId.brand}</Text>
                            <Text style={styles.itemName}>{item.productId.name}</Text>
                            <Text style={styles.itemName}>Size: {item.size}</Text>
                            <Text style={styles.itemPrice}>₹{item.productId.price}</Text>
                            <View style={styles.quantityContainer}>
                                <TouchableOpacity style={styles.quantityButton}>
                                    <Minus size={20} color="#3e3e3e"/>
                                </TouchableOpacity>
                                <Text style={styles.quantity}>{item.quantity}</Text>
                                <TouchableOpacity style={styles.quantityButton}>
                                    <Plus size={20} color="#3e3e3e" />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.removeButton}
                                    onPress={() => handleDelete(item._id)}
                                >
                                    <Trash2 size={20} color="#ff3f6c"/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>
            <View style={styles.footer}>
                <View style={styles.totalContainer}>
                    <Text style={styles.totalLabel}>Total Amount</Text>
                    <Text style={styles.totalAmount}>₹{total}</Text>
                </View>
                <TouchableOpacity onPress={() => router.push("/checkout")}
                    style={styles.checkoutButton}>
                    <Text style={styles.checkoutButtonText}>Place Order</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center", 
        backgroundColor: "#fff"
    }, 
    container: {
        flex: 1, 
        backgroundColor: "#fff"
    }, 
    content: {
        flex: 1, 
        padding: 15
    }, 
    header: {
        padding: 15, 
        paddingTop: 50, 
        backgroundColor: "#fff", 
        borderBottomWidth: 1, 
        borderBottomColor: "#f0f0f0"
    }, 
    headerTitle: {
        fontSize: 24, 
        fontWeight: "bold", 
        color: "#3e3e3e"
    }, 
    emptyState: {
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center", 
        padding: 20
    }, 
    emptyTitle: {
        fontSize: 18, 
        color: "#3e3e3e",
        marginTop: 20, 
        marginBottom: 20
    },
    loginButton: {
        backgroundColor: "#ff3f6c", 
        paddingHorizontal: 40, 
        paddingVertical: 15, 
        borderRadius: 10
    }, 
    loginButtonText: {
        color: "#fff", 
        fontSize: 16, 
        fontWeight: "bold"
    }, 
    bagItem: {
        flexDirection: "row", 
        backgroundColor: "#fff", 
        borderRadius: 10, 
        marginBottom: 15, 
        shadowColor: "#000",
        shadowOffset: {
            width: 0, 
            height: 2
        },
        shadowOpacity: 0.1, 
        shadowRadius: 3.84, 
        elevation: 5, 
        overflow: "hidden"
    }, 
    itemImage: {
        width: 100, 
        height: 120
    }, 
    itemInfo: {
        flex: 1, 
        padding: 45
    },
    itemPrice: {
        fontSize: 16, 
        fontWeight: "bold", 
        color: "#3e3e3e", 
        marginBottom: 10
    },  
    brandName: {
        fontSize: 14, 
        color: "#666", 
        marginBottom: 5
    }, 
    itemName: {
        fontSize: 16, 
        color: "#3e3e3e", 
        marginBottom: 10
    }, 
    priceContainer: {
        flexDirection: "row", 
        alignItems: "center"
    }, 
    price: {
        fontSize: 16, 
        fontWeight: "bold", 
        color: "#3e3e3e", 
        marginRight: 10
    }, 
    discount: {
        fontSize: 14, 
        color: "#ff3f6c"
    }, 
    removeButton: {
        padding: 15, 
        justifyContent: "center"
    }, 
    quantityContainer: {
        flexDirection: "row", 
        alignItems: "center"
    }, 
    quantityButton: {
        width: 30, 
        height: 30, 
        borderRadius: 15, 
        backgroundColor: "#f5f5f5", 
        justifyContent: "center", 
        alignItems: "center"
    }, 
    quantity: {
        marginHorizontal: 15, 
        fontSize: 16
    }, 
    footer: {
        padding: 15, 
        backgroundColor: "#fff", 
        borderTopWidth: 1, 
        borderTopColor: "#f0f0f0"
    }, 
    totalContainer: {
        flexDirection: "row", 
        justifyContent: "space-between", 
        alignItems: "center", 
        marginBottom: 15
    }, 
    totalLabel: {
        fontSize: 16, 
        color: "#3e3e3e"
    }, 
    totalAmount: {
        fontSize: 18, 
        fontWeight: "bold", 
        color: "#3e3e3e"
    }, 
    checkoutButton: {
        backgroundColor: "#ff3f6c", 
        padding: 15, 
        borderRadius: 10, 
        alignItems: "center"
    }, 
    checkoutButtonText: {
        color: "#fff", 
        fontSize: 16, 
        fontWeight: "bold"
    }
});