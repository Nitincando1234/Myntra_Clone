import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import { Eye, EyeOff } from "lucide-react-native";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";


export default function Login() {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showpassword, setshowpassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const handleLogin = async () => {
        try{
            setIsLoading(true);
            await login(email, password);
            router.replace("/(tabs)");
        } 
        catch(error) {
            console.log(error);
        } 
        finally {
            setIsLoading(false);
        }     
    }
    return (
        <View style={styles.container}>
            <Image source={{uri: "https://plus.unsplash.com/premium_photo-1679056835084-7f21e64a3402?q=80&w=2070&auto=format&fit=crop"}}
                style={styles.backgroundImage}
            />
            <View style={styles.formContainer}>
                <Text style={styles.title}>Welcome to Myntra</Text>
                <Text style={styles.subtitle}>Login to continue shopping</Text>
                <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} autoCapitalize="none" />
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.passwordInput}
                        placeholder="Password"
                        value={password}
                        onChangeText={(text) => {
                            setPassword(text);
                        }}
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
                <TouchableOpacity onPress={handleLogin} style={styles.button}
                 disabled={isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>LOGIN</Text>
                    )}
                </TouchableOpacity>
                <TouchableOpacity style={styles.signupLink} onPress={ () => { router.replace("/signup"); } }>
                    <Text style={styles.signupText}>Don&#39;t have an Account? Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: "#fff"
    }, 
    backgroundImage: {
        width: "100%", 
        height: "50%", 
        position: "absolute", 
        top: 0
    }, 
    formContainer: {
        flex: 1, 
        justifyContent: "center", 
        padding: 20, 
        backgroundColor: "rgba(255, 255, 255, 0.9)", 
        marginTop: "60%", 
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
        color: "#666", 
        marginBottom: 30
    }, 
    input: {
        backgroundColor: "#f5f5f5", 
        padding: 15, 
        borderRadius: 10, 
        marginBottom: 15, 
        fontSize: 16
    }, 
    button: {
        backgroundColor: "#ff3f6c", 
        padding: 15, 
        borderRadius: 10, 
        alignItems: "center", 
        marginTop: 10, 
        marginBottom: 124
    }, 
    buttonText: {
        color: "#fff", 
        fontSize: 16, 
        fontWeight: "bold"
    }, 
    signupLink: {
        marginTop: 20, 
        alignItems: "center"
    }, 
    signupText: {
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
})
