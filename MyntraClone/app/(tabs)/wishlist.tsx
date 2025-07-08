import { useRouter } from "expo-router";
import { Image, View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { Heart, Trash2 } from "lucide-react-native";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";

// const wishlistItems = [
//   {
//     id: 1,
//     name: "Premium Cotton T-Shirt",
//     brand: "H&M",
//     price: "₹799",
//     discount: "40% OFF",
//     image:
//       "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop",
//   },
//   {
//     id: 2,
//     name: "Slim Fit Denim Jacket",
//     brand: "Levis",
//     price: "₹2999",
//     discount: "30% OFF",
//     image:
//       "https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?w=500&auto=format&fit=crop",
//   },
// ];

export default function WishList() {
    const router = useRouter();
    const [wishlist, setWishlist] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { user }= useAuth();

    useEffect(() => {
        fetchProduct();
    }, [user]);

    const fetchProduct = async () => {
        if(user) {
            try {
                setIsLoading(true);
                const bag = await axios.get(`https://myntra-clone-aado.onrender.comonrender.com/wishlist/${user._id}`);
                setWishlist(bag.data);
            } catch(error) {
                console.log(error);
                setIsLoading(false);
            } finally {
                setIsLoading(false);
            }
        }
    };
    const handleDelete = async (itemid: any) => {
        try {
            await axios.delete(`https://myntra-clone-aado.onrender.comonrender.com/wishlist/${itemid}`);
            fetchProduct();
        } catch(error) {
            console.log(error);
        }
    };


    if(!user) {
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Wishlist</Text>
                </View>
                <View style={styles.emptyState}>
                    <Heart size={64} color="#ff3f6c"/>
                    <Text style={styles.emptyTitle}>Please Login to view your Wishlist</Text>
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

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Wishlist</Text>
            </View>
            <ScrollView style={styles.content}>
                {wishlist?.map((item: any) => (
                    <View key={item._id} style={styles.wishlistItem}>
                        <Image source={{ uri: item.productId.images[0] }} style={styles.itemImage}/>
                        <View style={styles.itemInfo}>
                            <Text style={styles.brandName}>{item.productId.brand}</Text>
                            <Text style={styles.itemName}>{item.productId.name}</Text>
                            <View style={styles.priceContainer}>
                                <Text style={styles.price}>{item.productId.price}</Text>
                                <Text style={styles.discount}>{item.productId.discount}</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.removeButton}
                            onPress={() => handleDelete(item._id)}
                         >
                            <Trash2 size={24} color="#ff3f6c"/>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
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
    wishlistItem: {
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
    }
});