import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useRouter } from 'expo-router';
import { ChevronRight, Search } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';

// const categories = [
//   {
//     id: 1,
//     name: "Men",
//     image:
//       "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=500&auto=format&fit=crop",
//   },
//   {
//     id: 2,
//     name: "Women",
//     image:
//       "https://images.unsplash.com/photo-1649899240929-a19a0dcf02fb?q=80&w=415&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=500&auto=format&fit=crop",
//   },
//   {
//     id: 3,
//     name: "Kids",
//     image:
//       "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=500&auto=format&fit=crop",
//   },
//   {
//     id: 4,
//     name: "Beauty",
//     image:
//       "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&auto=format&fit=crop",
//   },
// ];

// const products = [
//   {
//     id: 1,
//     name: "Casual White T-Shirt",
//     brand: "Roadster",
//     price: "₹499",
//     discount: "60% OFF",
//     image:
//       "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop",
//   },
//   {
//     id: 2,
//     name: "Denim Jacket",
//     brand: "Levis",
//     price: "₹2499",
//     discount: "40% OFF",
//     image:
//       "https://images.unsplash.com/photo-1600804889194-e6fbf08ddb39?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=500&auto=format&fit=crop",
//   },
//   {
//     id: 3,
//     name: "Summer Dress",
//     brand: "ONLY",
//     price: "₹1299",
//     discount: "50% OFF",
//     image:
//       "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&auto=format&fit=crop",
//   },
//   {
//     id: 4,
//     name: "Classic Sneakers",
//     brand: "Nike",
//     price: "₹3499",
//     discount: "30% OFF",
//     image:
//       "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop",
//   },
// ];

const deals = [
  {
    id: 1,
    title: "Under ₹599",
    image:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "40-70% Off",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&auto=format&fit=crop",
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProduct] = useState<any>(null);
  const [categories, setCategory] = useState<any>(null);
  const { user } = useAuth();

  const handleProductPress = (productId: number) => {
    if (!user) {
      router.push("/login");
    } else {
      router.push(`/product/${productId}` as any);
    }
  };

  useEffect(() => {
    const fetchproduct = async () => {
          try {
            setIsLoading(true);
            const product = await axios.get("http://192.168.150.78:5000/product");
            setProduct(product.data);
          } 
          catch(error) {
            console.log(error);
            setIsLoading(false);
          }
          finally {
            setIsLoading(false);
          }
    };
    const fetchcategories = async () => {
          try {
            setIsLoading(true);
            const cat = await axios.get("http://192.168.150.78:5000/category");
            setCategory(cat.data);
          } 
          catch(error) {
            console.log(error);
            setIsLoading(false);
          }
          finally {
            setIsLoading(false);
          }
    };
    fetchproduct();
    fetchcategories();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>Myntra</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Search size={24} color="#3e3e3e" />
        </TouchableOpacity>
      </View>

      <Image source={{}}></Image>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            SHOP BY CATEGORY
          </Text>
          <TouchableOpacity style={styles.searchButton}>
            <Text style={styles.viewAllText}>View All</Text>
            <ChevronRight />
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesScroll}
        >
          {isLoading ? (
            <ActivityIndicator 
             size="large"
             color="#ff3f6c"
             style={styles.loader}
            />
          ) : (
            (!categories || categories.length === 0) ? (
              <Text style={styles.emptyText}>No categories available</Text>
            ) : (
          categories.map((category: any) => (
            <TouchableOpacity key={category._id} style={styles.categoryCard}>
              <Image source={{ uri: category.image }} style={styles.categoryImage}/>
              <Text style={styles.categoryName}>{category.name}</Text>
            </TouchableOpacity>
          ))
            )
          )}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            DEALS OF THE DAY
          </Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.dealsScroll}
        >
          {deals.map((deal: any) => (
            <TouchableOpacity key={deal.id} style={styles.dealsCard}>
              <Image source={{ uri: deal.image }} style={styles.dealImage} />
              <View style={styles.dealOverlay}>
                <Text style={styles.dealTitle}>
                  {deal.title}
                </Text>
              </View>
            </TouchableOpacity>
          )
          )}
        </ScrollView>
      </View>

        <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            TRENDING NOW
          </Text>
        </View>
        <View style={styles.productsGrid}>
          {isLoading ? (
            <ActivityIndicator
              size="large"
              color="#ff3f6c"
              style={styles.loader}
            />
          ) : !products || products.length === 0 ? (
            <Text style={styles.emptyText}>No Product available</Text>
          ) : ( 
            <View style={styles.productsGrid}>
              {products.map((product: any) => (
                <TouchableOpacity
                  key={product._id}
                  style={styles.productCard}
                  onPress={() => handleProductPress(product._id)}
                >
                  <Image
                    source={{ uri: product.images[0] }}
                    style={styles.productImage}
                  />
                  <View style={styles.productInfo}>
                    <Text style={styles.brandName}>{product.brand}</Text>
                    <Text style={styles.productName}>{product.name}</Text>
                    <View style={styles.priceRow}>
                      <Text style={styles.productPrice}>{product.price}</Text>
                      <Text style={styles.discount}>{product.discount}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>        
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    paddingTop: 50,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0"
  },
  logo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3e3e3e"
  },
  searchButton: {
    padding: 8
  },
  viewAllText: {
    color: "#ff3f6c",
    marginRight: 5
  },
  categoryCard: {
    width: 100,
    marginHorizontal: 8
  },
  categoriesScroll: {
    marginHorizontal: -15
  },
  categoryImage: {
    width: 100, 
    height: 100, 
    borderRadius: 50
  }, 
  categoryName: {
    textAlign: "center", 
    marginTop: 8, 
    fontSize: 14, 
    color: "#3e3e3e"
  }, 
  dealImage: {
    width: "100%", 
    height: "100%"
  }, 
  dealOverlay: {
    position: "absolute", 
    bottom: 0,
    left: 0, 
    right: 0, 
    backgroundColor: "rgba(0, 0, 0, 0.4)", 
    padding: 15
  }, 
  dealTitle: {
    color: "#fff", 
    fontSize: 18, 
    fontWeight: "bold"
  }, 
  dealsScroll: {
    marginHorizontal: -15
  },
  dealsCard: {
    width: 280, 
    height: 150, 
    marginHorizontal: 8, 
    borderRadius: 10, 
    overflow: "hidden"
  },   
  section: {
    padding: 15
  },
  sectionTitle: {
    fontSize: 18, 
    fontWeight: "bold", 
    color: "#3e3e3e"
  }, 
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15
  }, 
  productsGrid: {
    flexDirection: "row", 
    flexWrap: "wrap", 
    marginHorizontal: -6
  }, 
  productCard: {
    width: "48%", 
    marginHorizontal: "1%", 
    marginBottom: 15,
    backgroundColor: "#fff", 
    borderRadius: 10, 
    shadowColor: "#000", 
    shadowOffset: {
      width: 0, height: 2
    }, 
    shadowOpacity: 0.1,
    shadowRadius: 3.84, 
    elevation: 5
  }, 
  productImage: {
    width: "100%", 
    height: 200, 
    borderTopLeftRadius: 10, 
    borderTopRightRadius: 10
  }, 
  productName: {
    fontSize: 16, 
    marginBottom: 5
  }, 
  productInfo: {
    padding: 10, 
  }, 
  priceRow: {
    flexDirection: "row", 
    alignItems: "center"
  }, 
  productPrice: {
    fontSize: 16, 
    fontWeight: "bold", 
    color: "#3e3e3e", 
    marginRight: 8
  }, 
  brandName: {
    fontSize: 14, 
    color: "#666", 
    marginBottom: 2
  }, 
  discount: {
    fontSize: 14, 
    color: "#ff3f6c", 
    fontWeight: "500"
  }, 
  loader: {
    flex: 1, 
    alignItems: "center", 
    justifyContent: "center", 
    marginTop: 50
  }, 
  emptyText: {
    textAlign: "center", 
    marginTop: 20, 
    fontSize: 16, 
    color: "#666"
  }
});
