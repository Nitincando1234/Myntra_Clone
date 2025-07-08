import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useRouter } from "expo-router";
import { ChevronRight, CreditCard, MapPin, Package, Truck } from "lucide-react-native";
import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native";

const orders = [
 {
  id: "ORD123456",
  date: "15 Mar 2024",
  status: "Delivered",
  items: [
   {
    id: 1,
    name: "White Cotton T-Shirt",
    brand: "H&M",
    size: "L",
    price: 799,
    image:
     "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop",
   },
   {
    id: 2,
    name: "Blue Denim Jacket",
    brand: "Levis",
    size: "M",
    price: 2999,
    image:
     "https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?w=500&auto=format&fit=crop",
   },
  ],
  total: 4087,
  shippingAddress: "123 Main Street, Apt 4B, New York, NY 10001",
  paymentMethod: "Credit Card ending in 4242",
  tracking: {
   number: "TRK789012345",
   carrier: "FedEx",
   estimatedDelivery: "15 Mar 2024",
   currentLocation: "New York City Hub",
   status: "Delivered",
   timeline: [
    {
     status: "Delivered",
     location: "New York, NY",
     timestamp: "15 Mar 2024, 14:30",
    },
    {
     status: "Out for Delivery",
     location: "New York City Hub",
     timestamp: "15 Mar 2024, 09:15",
    },
    {
     status: "Arrived at Delivery Facility",
     location: "New York Distribution Center",
     timestamp: "14 Mar 2024, 23:45",
    },
    {
     status: "Order Shipped",
     location: "New Jersey Warehouse",
     timestamp: "13 Mar 2024, 16:20",
    },
    {
     status: "Order Confirmed",
     location: "Online",
     timestamp: "12 Mar 2024, 10:00",
    },
   ],
  },
 },
 {
  id: "ORD123457",
  date: "10 Mar 2024",
  status: "Delivered",
  items: [
   {
    id: 3,
    name: "Summer Dress",
    brand: "ONLY",
    size: "S",
    price: 1299,
    image:
     "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&auto=format&fit=crop",
   },
  ],
  total: 1398,
  shippingAddress: "123 Main Street, Apt 4B, New York, NY 10001",
  paymentMethod: "Credit Card ending in 4242",
  tracking: {
   number: "TRK789012346",
   carrier: "UPS",
   estimatedDelivery: "10 Mar 2024",
   currentLocation: "Delivered",
   status: "Delivered",
   timeline: [
    {
     status: "Delivered",
     location: "New York, NY",
     timestamp: "10 Mar 2024, 15:45",
    },
    {
     status: "Order Shipped",
     location: "New Jersey Warehouse",
     timestamp: "08 Mar 2024, 11:30",
    },
    {
     status: "Order Confirmed",
     location: "Online",
     timestamp: "07 Mar 2024, 09:15",
    },
   ],
  },
 },
];

export default function Orders() {
 const router = useRouter();
 const { user } = useAuth();
 const [isLoading, setIsLoading] = useState(false);
 const [orders, setOrder] = useState<any>(null);
 const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
 const toggleorderDetails = (orderId: string) => {
  setExpandedOrder(expandedOrder === orderId ? null : orderId);
 };

 useEffect(() => {
    const fetchorder = async () => {
        if(user) {
            try {
                setIsLoading(true);
                const product = await axios
                    .get(`http://192.168.150.78:5000/order/user/${user._id}`);
                setOrder(product.data);
            } catch(error) {
                console.log(error);
                setIsLoading(false);
            } finally {
                setIsLoading(false);
            }
        }
    };
    fetchorder();
 }, [user]);

 if(isLoading) {
    return (
        <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#ff3f6c" />
        </View>
    );
 }
 if(!orders) {
    return (
        <View style={styles.container}>
            <Text>Order Not Found</Text>
        </View>
    );
 }

  return (
    <SafeAreaView style={styles.rootContainer}>
        <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.headerTitle}>My Orders</Text>
        </View>

        <ScrollView style={styles.content}>
            {orders.map((order:any) => (
            <View key={order._id} style={styles.orderCard}>
                <TouchableOpacity
                style={styles.orderHeader}
                onPress={() => toggleorderDetails(order._id)}
                >
                <View>
                    <Text style={styles.orderId}>Order #{order._id}</Text>
                    <Text style={styles.orderDate}>{order.date}</Text>
                </View>
                <View style={styles.statusContainer}>
                    {/* <Package size={16} color="#00b852" /> */}
                    <Text style={styles.orderStatus}>{order.status}</Text>
                </View>
                </TouchableOpacity>

                <View style={styles.itemsContainer}>
                {order.items.map((item:any) => {
                    return (
                        <View key={item._id} style={styles.orderItem}>
                        <Image
                            source={{ uri: item.productId.images }}
                            style={styles.itemImage}
                        />
                        <View style={styles.itemInfo}>
                            <Text style={styles.brandName}>{item.productId.brand}</Text>
                            <Text style={styles.itemName}>{item.productId.name}</Text>
                            <Text style={styles.itemSize}>Size: {item.productId.size}</Text>
                            <Text style={styles.itemPrice}>₹{item.productId.price}</Text>
                        </View>
                        </View>
                    );
                })}
                </View>

                {expandedOrder === order._id && (
                <View style={styles.orderDetails}>
                    <View style={styles.detailSection}>
                    <View style={styles.detailHeader}>
                        <MapPin size={20} color="#3e3e3e" />
                        <Text style={styles.detailTitle}>Shipping Address</Text>
                    </View>
                    <Text style={styles.detailText}>{order.shippingAddress}</Text>
                    </View>

                    <View style={styles.detailSection}>
                    <View style={styles.detailHeader}>
                        <CreditCard size={20} color="#3e3e3e" />
                        <Text style={styles.detailTitle}>Payment Method</Text>
                    </View>
                    <Text style={styles.detailText}>{order.paymentMethod}</Text>
                    </View>

                    <View style={styles.detailSection}>
                    <View style={styles.detailHeader}>
                        <Truck size={20} color="#3e3e3e" />
                        <Text style={styles.detailTitle}>Tracking Information</Text>
                    </View>
                    <View style={styles.trackingInfo}>
                        <Text style={styles.trackingNumber}>
                        Tracking Number: {order.tracking.number}
                        </Text>
                        <Text style={styles.trackingCarrier}>
                        Carrier: {order.tracking.carrier}
                        </Text>
                    </View>

                    <View style={styles.timeline}>
                        {order.tracking.timeline.map((event:any, index:any) => (
                        <View key={index} style={styles.timelineEvent}>
                            <View style={styles.timelinePoint} />
                            <View style={styles.timelineContent}>
                            <Text style={styles.timelineStatus}>
                                {event.status}
                            </Text>
                            <Text style={styles.timelineLocation}>
                                {event.location}
                            </Text>
                            <Text style={styles.timelineTimestamp}>
                                {event.timestamp}
                            </Text>
                            </View>
                            {index !== order.tracking.timeline.length - 1 && (
                            <View style={styles.timelineLine} />
                            )}
                        </View>
                        ))}
                    </View>
                    </View>
                </View>
                )}

                <View style={styles.orderFooter}>
                <View style={styles.totalContainer}>
                    <Text style={styles.totalLabel}>Order Total</Text>
                    <Text style={styles.totalAmount}>₹{order.total}</Text>
                </View>
                <TouchableOpacity
                    style={styles.detailsButton}
                    onPress={() => toggleorderDetails(order._id)}
                >
                    <Text style={styles.detailsButtonText}>
                    {expandedOrder === order._id ? "Hide Details" : "View Details"}
                    </Text>
                    <ChevronRight size={20} color="#ff3f6c" />
                </TouchableOpacity>
                </View>
            </View>
            ))}
        </ScrollView>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1, 

    }, 
    container: {
        flex: 1, 
        backgroundColor: "#fff"
    }, 
    loaderContainer: {
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center", 
        backgroundColor: "#fff"
    }, 
    header: {
        padding: 15, 
        // paddingTop: 30, 
        backgroundColor: "#fff", 
        borderBottomWidth: 1, 
        borderBottomColor: "#f0f0f0"
    }, 
    headerTitle: {
        fontSize: 24, 
        fontWeight: "bold", 
        color: "#3e3e3e"
    }, 
    content: {
        flex: 1, 
        padding: 15, 
        marginBottom: 48
    }, 
    orderCard: {
        backgroundColor: "#fff", 
        borderRadius: 10, 
        marginBottom: 24, 
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
    orderHeader: {
        flexDirection: "row", 
        justifyContent: "space-between", 
        alignItems: "center",
        padding: 15, 
        borderBottomWidth: 1, 
        borderBottomColor: "#f0f0f0"
    }, 
    orderId: {
        fontSize: 16, 
        fontWeight: "bold", 
        color: "#3e3e3e"
    }, 
    orderDate: {
        fontSize: 14, 
        color: "#666", 
        marginTop: 2
    }, 
    statusContainer: {
        flexDirection: "row",
        alignItems: "center", 
        backgroundColor: "#e6f4ea", 
        paddingHorizontal: 10, 
        paddingVertical: 5, 
        borderRadius: 15
    }, 
    orderStatus: {
        fontSize: 14, 
        color: "#00b8522", 
        marginLeft: 5
    }, 
    itemsContainer: {
        padding: 15
    }, 
    orderItem: {
        flexDirection: "row",
        marginBottom: 15
    }, 
    itemImage: {
        width: 80, 
        height: 100,
        borderRadius: 5
    }, 
    itemInfo: {
        flex: 1, 
        marginLeft: 15
    },
    brandName: {
        fontSize: 14, 
        color: "#666", 
        marginBottom: 2
    }, 
    itemName: {
        fontSize: 16, 
        color: "#3e3e3e", 
        marginBottom: 2
    }, 
    itemSize: {
        fontSize: 14, 
        color: "#666", 
        marginBottom: 2
    }, 
    itemPrice: {
        fontSize: 16, 
        margin: 8, 
        fontWeight: "bold", 
        color: "#3e3e3e"
    }, 
    orderDetails: {
        padding: 15, 
        borderTopWidth: 1, 
        borderTopColor: "#f0f0f0"
    }, 
    detailSection: {
        marginBottom: 20
    }, 
    detailHeader: {
        flexDirection: "row", 
        alignItems: "center", 
        marginBottom: 10
    }, 
    detailTitle: {
        fontSize: 16, 
        fontWeight: "bold", 
        color: "#3e3e3e", 
        marginLeft: 10
    }, 
    detailText: {
        fontSize: 14, 
        color: "#666", 
        lineHeight: 20
    }, 
    trackingInfo: {
        marginBottom: 15
    }, 
    trackingNumber: {
        fontSize: 14, 
        color: "#666", 
        marginBottom: 5
    }, 
    trackingCarrier: {
        fontSize: 14, 
        color: "#666"
    }, 
    timeline: {
        marginTop: 15
    }, 
    timelineEvent: {
        flexDirection: "row", 
        marginBottom: 20, 
        position: "relative"
    }, 
    timelinePoint: {
        width: 12, 
        height: 12, 
        borderRadius: 6, 
        backgroundColor: "#ff3f6c", 
        marginTop: 5
    }, 
    timelineLine: {
        position: "absolute", 
        left: 5, 
        top: 17, 
        width: 2, 
        height: "100%", 
        backgroundColor: "#f0f0f0"
    }, 
    timelineContent: {
        marginLeft: 15, 
        flex: 1
    }, 
    timelineStatus: {
        fontSize: 14, 
        fontWeight: "bold", 
        color: "#3e3e3e", 
        marginBottom: 2
    }, 
    timelineLocation: {
        fontSize: 14, 
        color: "#666", 
        marginBottom: 2
    }, 
    timelineTimestamp: {
        fontSize: 12, 
        color: "#999"
    }, 
    orderFooter: {
        padding: 15, 
        marginBottom: 45, 
        borderTopWidth: 1, 
        borderTopColor: "#f0f0f0"
    }, 
    totalContainer: {
        flexDirection: "row", 
        justifyContent: "space-between", 
        alignItems: "center", 
        marginBottom: 10
    }, 
    totalLabel: {
        fontSize: 16, 
        color: "#666"
    }, 
    totalAmount: {
        fontSize: 18, 
        fontWeight: "bold", 
        color: "#3e3e3e"
    }, 
    detailsButton: {
        flexDirection: "row", 
        alignItems: "center", 
        justifyContent: "center", 
    }, 
    detailsButtonText: {
        fontSize: 16, 
        color: "#ff3f6c", 
        marginRight: 5
    }
});