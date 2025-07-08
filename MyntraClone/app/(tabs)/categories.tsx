import { Image } from 'expo-image';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';

import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Search, X } from 'lucide-react-native';
import axios from 'axios';

// const categories = [
//   {
//     id: 1,
//     name: "Men",
//     subcategories: [
//       "T-Shirts",
//       "Shirts",
//       "Jeans",
//       "Trousers",
//       "Suits",
//       "Activewear",
//     ],
//     image:
//       "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=500&auto=format&fit=crop",
//     products: [
//       {
//         id: 1,
//         name: "Casual White T-Shirt",
//         brand: "Roadster",
//         price: 499,
//         discount: "60% OFF",
//         image:
//           "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop",
//       },
//       {
//         id: 2,
//         name: "Denim Jacket",
//         brand: "Levis",
//         price: 2499,
//         discount: "40% OFF",
//         image:
//           "https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?w=500&auto=format&fit=crop",
//       },
//     ],
//   },
//   {
//     id: 2,
//     name: "Women",
//     subcategories: [
//       "Dresses",
//       "Tops",
//       "Ethnic Wear",
//       "Western Wear",
//       "Activewear",
//     ],
//     image:
//       "https://images.unsplash.com/photo-1649899240929-a19a0dcf02fb?q=80&w=415&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=500&auto=format&fit=crop",
//     products: [
//       {
//         id: 3,
//         name: "Summer Dress",
//         brand: "ONLY",
//         price: 1299,
//         discount: "50% OFF",
//         image:
//           "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&auto=format&fit=crop",
//       },
//     ],
//   },
//   {
//     id: 3,
//     name: "Kids",
//     subcategories: [
//       "Boys Clothing",
//       "Girls Clothing",
//       "Infants",
//       "Toys",
//       "School Essentials",
//     ],
//     image:
//       "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=500&auto=format&fit=crop",
//     products: [],
//   },
//   {
//     id: 4,
//     name: "Beauty",
//     subcategories: [
//       "Makeup",
//       "Skincare",
//       "Haircare",
//       "Fragrances",
//       "Personal Care",
//     ],
//     image:
//       "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&auto=format&fit=crop",
//     products: [],
//   },
//   {
//     id: 5,
//     name: "Accessories",
//     subcategories: ["Watches", "Bags", "Jewellery", "Sunglasses", "Belts"],
//     image:
//       "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop",
//     products: [],
//   },
// ];

export default function TabTwoScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategory] = useState<any>(null);
  
  useEffect(() => {
    const fetchproduct = async () => {
          try {
            setIsLoading(true);
            const cat = await axios.get("https://myntra-clone-aado.onrender.com/category");
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
  }, []);

  if(isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator color="#ff3f6c" size="large" />
      </View>
    );
  }
  if(!categories) {
    return (
      <View style={styles.container}>
       <Text>Unable to Load Categories!</Text>
      </View>
    );
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSelectedCategory(null);
    setSelectedSubCategory(null);
  };
  const clearSearch = () => {
    setSearchQuery("");
    setSelectedCategory(null);
    setSelectedSubCategory(null);
  };
  const handleCategorySelect = (categoryId: number) => {
    setSelectedCategory(categoryId);
    setSelectedSubCategory(null);
    setSearchQuery("");
  };
  const handleSubCategorySelect = (subcatgeoryId: string) => {
    setSelectedSubCategory(subcatgeoryId);
    setSearchQuery("");
  }
  const filterCategories = categories?.filter(
    (category: any) => 
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.subcategory.some((subcategory: any) => 
        subcategory.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      category.productId.some(
        (product: any) => 
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchQuery.toLowerCase())
      ) 
  );

  const selectedcategorydata = selectedCategory
    ? categories?.find((cat: any) => cat._id === selectedCategory)
    : null;
  
  const renderProducts = (products: (typeof categories)[0]["products"]) => {
    return products?.map((product: any) => (
      <TouchableOpacity
        key={product._id}
        onPress={() => router.push(`/product/${product._id}`)}
        style={styles.productCard}
      >
      <Image source={{uri: product.images[0] }} style={styles.productImage}/>
      <View style={styles.productInfo}>
      <Text style={styles.brandName}>{product.brand}</Text>
      <Text style={styles.productName}>{product.name}</Text>
        <View style={styles.priceRow}>
          <Text style={styles.price}>{product.price}</Text>
          <Text style={styles.discount}>{product.discount}</Text>
        </View>
      </View>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Categories</Text>
      </View >
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#666" style={styles.searchIcon}/>
          <TextInput placeholder="Search for products, brands & more" 
                    value={searchQuery}
                    onChangeText={handleSearch}
                    style={styles.searchInput}
          />
          {searchQuery !== "" && (
            <TouchableOpacity onPress={clearSearch}>
              <X size={20} color="#666"/>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <ScrollView style={styles.content}>
        {!selectedCategory && (
          <View style={styles.categoriesGrid}>
            {filterCategories?.map((category: any) => (
              <TouchableOpacity
              style={styles.categoryCard}
              key={category._id}
              onPress={() => handleCategorySelect(category._id)}
              >
                <Image source={{uri: category.image}} style={styles.categoryImage}/>
                <View style={styles.categoryInfo}>
                  <Text style={styles.categoryName}>{category.name}</Text>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                  >
                    <View style={styles.subcategories}>
                      {category?.subcategory?.map((sub: any, index: any) => (
                        // sub = subcategory
                        <TouchableOpacity
                          style={styles.subcategoryTag}
                          key={index}
                          onPress={() => handleSubCategorySelect(sub)}
                        >
                          <Text style={styles.subCategoryText}>{sub}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </ScrollView>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
              {selectedcategorydata && (
        <View style={styles.categoryDetail}>
          <View style={styles.categoryHeader}>
            <TouchableOpacity onPress={() => setSelectedCategory(null)}
               style={styles.backButton}
              >
              <Text style={styles.backButtonText}>← Back to Categories</Text>
            </TouchableOpacity>
            <Text style={styles.categoryTitle}>{selectedcategorydata.name}</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.subcategoriesScroll}
          >
            {selectedcategorydata.subcategory.map(
              (sub: any, index: any) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.subcategoryButton, 
                  selectedSubCategory === sub && styles.selectedSubcategory
                ]}
                onPress={() => handleSubCategorySelect(sub)}
              >
                <Text
                  style={[
                    styles.subcategoryButtonText,
                    selectedSubCategory === sub &&
                      styles.selectedSubCategory,
                  ]}
                >{sub}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View style={styles.productsGrid}>
            {renderProducts(selectedcategorydata?.productId)}
          </View>
        </View>
      )}
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
  searchContainer: {
    padding: 15, 
    backgroundColor: "#fff", 
    borderBottomWidth: 1, 
    borderBottomColor: "#f0f0f0"
  }, 
  searchInputContainer: {
    flexDirection: "row", 
    alignItems: "center", 
    backgroundColor: "#f5f5f5",
    borderRadius: 10, 
    padding: 10
  }, 
  searchIcon: {
    marginRight: 10
  }, 
  searchInput: {
    flex: 1, 
    fontSize: 16, 
    color: "#3e3e3e"
  }, 
  content: {
    flex: 1
  }, 
  categoryHeader: {
    marginBottom: 15
  }, 
  categoryDetail: {
    flex: 1, 
    padding: 15
  }, 
  backButton: {
    marginBottom: 15
  }, 
  backButtonText: {
    color: "#ff3f6c", 
    fontSize: 16
  }, 
  categoriesGrid: {
    padding: 15
  }, 
  categoryTitle: {
    fontSize: 24, 
    fontWeight: "bold", 
    color: "#3e3e3e"
  }, 
  categoryCard: {
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
    elevation:5, 
    overflow: "hidden"
  }, 
  categoryName: {
    fontSize: 18, 
    fontWeight: "bold", 
    color: "#3e3e3e", 
    marginBottom: 10
  }, 
  categoryImage: {
    width: "100%", 
    height: 150
  }, 
  categoryInfo: {
    padding: 15
  }, 
  subcategories: {
    flexDirection: "row", 
    flexWrap: "wrap"
  }, 
  subcategoryTag: {
    backgroundColor: "#f5f5f5", 
    paddingHorizontal: 12, 
    paddingVertical: 6, 
    borderRadius: 15, 
    marginRight: 8, 
    marginBottom: 8
  }, 
  subCategoryText: {
    fontSize: 14, 
    color: "#666"
  }, 
  subcategoriesScroll: {
    marginBottom: 15
  }, 
  subcategoryButton: {
    paddingHorizontal: 20, 
    paddingVertical: 10, 
    borderRadius: 20, 
    backgroundColor: "#f5f5f5", 
    marginRight: 10
  }, 
  selectedSubCategory: {
    backgroundColor: "#ff3f6c"
  }, 
  subcategoryButtonText: {
    fontSize: 14, 
    color: "#3e3e3e"
  }, 
  selectedSubcategory: {
    backgroundColor: "#ff3f6c"
  }, 
  productCard: {
    width: "48%", 
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
  productImage: {
    width: "100%", 
    height: 200, 
    resizeMode: "cover"
  }, 
  productInfo: {
    padding: 10
  }, 
  brandName: {
    fontSize: 14,
    color: "#666", 
    marginBottom: 4
  }, 
  productName: {
    fontSize: 16, 
    color: "#3e3e3e", 
    marginBottom: 8
  },
  productsGrid: {
    flexDirection: "row", 
    flexWrap: "wrap",
    justifyContent: "space-between"
  }, 
  priceRow: {
    flexDirection: "row",
    alignItems: "center"
  }, 
  price: {
    fontSize: 16, 
    fontWeight: "bold", 
    color: "#3e3e3e", 
    marginRight: 8
  }, 
  discount: {
    fontSize: 14, 
    color: "#ff3f6c"
  }
});
