import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import { Eye, EyeOff } from "lucide-react-native";
import { useState } from "react"
import { View, Image, StyleSheet, ScrollView, TextInput, Text, TouchableOpacity, ActivityIndicator } from "react-native";

function Signup() {
    const router = useRouter();
    const { signup } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        fullname: "", email: "", password: ""
    });
    const [showpassword, setshowpassword] = useState(false);
    const [errors, setErrors] = useState({
        fullname: "", email: "", password: ""
    });
    const validateForm = () => {
        const newerrors = {
            fullname: "", email: "", password: "",
        };
        let isvalid = true;
        if (!formData.fullname.trim()) {
            newerrors.fullname = "Full Name is required"; isvalid = false;
        }
        if (!formData.email) {
            newerrors.email = "Email is required"; isvalid = false;
        }
        else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newerrors.email = "Please enter a valid email"; isvalid = false;
        }
        if (!formData.password) {
            newerrors.password = "Password is required"; isvalid = false;
        }
        else if (formData.password.length < 8) {
            newerrors.password = "Password must be atleast 8 characters"; isvalid = false;
        }

        setErrors(newerrors);
        return isvalid;
    }

    const handleSignup = async () => {
        if(validateForm()){
            try{
                setIsLoading(true);
                await signup(formData.fullname, formData.email, formData.password);
                router.replace("/(tabs)");
            } 
            catch(error) {
                console.log(error);
            } 
            finally {
                setIsLoading(false);
            }   
        }
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
            <Image
                source={{ uri: "https://plus.unsplash.com/premium_photo-1679056835084-7f21e64a3402?q=80&w=2070&auto=format&fit=crop" }}
                style={styles.backgroundImage}
                />

            <View style={styles.formContainer}>
                <Text style={styles.title}>Create Account</Text>
                <Text style={styles.subtitle}>Join Myntra and discover amazing fashion</Text>
                <View style={styles.inputGroup}>
                    <TextInput style={[styles.input, errors.fullname && styles.inputError]}
                        placeholder="Full Name"
                        value={formData.fullname}
                        onChangeText={(text) =>
                            setFormData({ ...formData, fullname: text })
                        }
                    />{errors.fullname ? (
                        <Text style={styles.errorText}>{errors.fullname}</Text>
                    ) : null}
                </View>
                <View style={styles.inputGroup}>
                    <TextInput
                        style={[styles.input, errors.email && styles.inputError]}
                        placeholder="Email"
                        value={formData.email}
                        onChangeText={(text) =>
                            setFormData({ ...formData, email: text })
                        }
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />{errors.email ? (
                        <Text style={styles.errorText}>{errors.email}</Text>
                    ) : null}
                </View>
                <View style={styles.inputGroup}>
                    <View style={[styles.passwordContainer, errors.password && styles.inputError]}>
                        <TextInput
                            style={[styles.passwordInput]}
                            placeholder="Password"
                            value={formData.password}
                            onChangeText={(text) =>
                                setFormData({ ...formData, password: text })
                            }
                            secureTextEntry={!showpassword}
                            autoCapitalize="none"
                        />
                        <TouchableOpacity
                            style={styles.eyeIcon}
                            onPress={() => setshowpassword(!showpassword)}
                        >
                            {showpassword ? (
                                <EyeOff size={20} color="#666" />
                            ) : <Eye size={20} color="#666" />}
                        </TouchableOpacity>
                    </View>
                    {errors.password ? (
                    <Text style={styles.errorText}>{errors.password}</Text>
                    ) : null}
            </View>
                <TouchableOpacity
                 style={styles.button}
                 onPress={handleSignup}
                 disabled={isLoading}
                > 
                    {isLoading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>Signup</Text>
                    )}
                </TouchableOpacity>
                <TouchableOpacity
                 style={styles.loginLink} 
                 onPress={() => router.replace("/login")}
                >
                 <Text style={styles.loginText}>Already have an Account? Login</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

export default Signup;

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: "#fff"
    }, 
    scrollContent: {
        flexGrow: 1
    }, 
    backgroundImage: {
        width: "100%", 
        height: 100, 
        position: "absolute", 
        top: 0
    }, 
    formContainer: { 
        flex: 1, 
        padding: 20, 
        backgroundColor: "rgba(255, 255, 255, 0.9)", 
        marginTop: 250, 
        borderTopLeftRadius: 30, 
        borderTopRightRadius: 30
    }, 
    title: {
        fontSize: 28, 
        fontWeight: "bold", 
        marginBottom: 10, 
        color: "#3e3e3e"
    }, 
    subtitle: {
        fontSize: 16, 
        color: "#3e3e3e", 
        marginBottom: 30
    }, 
    inputGroup: {
        marginBottom: 15
    }, 
    input: {
        backgroundColor: "#f5f5f5", 
        padding: 15, 
        borderRadius: 10, 
        fontSize: 16
    }, 
    inputError: {
        borderWidth: 1, 
        borderColor: "#ff3f6c"
    }, 
    errorText: {
        color: "#ff3f6c", 
        fontSize: 12, 
        marginTop: 5, 
        marginLeft: 5
    }, 
    button: {
        backgroundColor: "#ff3f6c", 
        padding: 15, 
        borderRadius: 10, 
        alignItems: "center", 
        marginTop: 20
    },
    buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    }
    ,  
    loginLink: {
        marginTop: 20, 
        alignItems: "center"
    }, 
    loginText: {
        color: "#ff3f6c", 
        fontSize: 16
    }, 
    eyeIcon: {
        padding: 15
    }, 
    passwordContainer: {
        flexDirection: "row", 
        alignItems: "center", 
        backgroundColor: "#f5f5f5", 
        borderRadius: 10
    }, 
    passwordInput: {
        flex: 1, 
        padding: 15, 
        fontSize: 16
    }
});