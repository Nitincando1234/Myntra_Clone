import axios from "axios";
import { clearuserdata, getuserdata, saveuserdata } from "@/utils/storage";
import React, { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
    isAuthenticated: boolean;
    user: { _id: string, name: string, email: string } | null,
    signup: (fullname: string, email: string, password: string) => Promise<void>,
    login: (email: string, password: string) => Promise<void>,
    logout: () => void
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<{ _id: string, name: string, email: string } | null>(
        null
    );
    useEffect((() => {
        (async () => {
            const data = await getuserdata();
            if (data._id && data.name && data.email) {
                setUser({ _id: data._id, name: data.name, email: data.email });
            }
            setIsAuthenticated(true);
        })()
    }), []);    // to login when app starts

    const login = async (email: string, password: string) => {
        const res = await axios.post("http://192.168.150.78:5000/user/login", {
            email, password
        });
        const data = await res.data.user;
        if (data.fullname) {
            await saveuserdata(data._id, data.fullname, data.email);
            setUser({ _id: data._id, name: data.fullname, email: data.email });
            setIsAuthenticated(true);
            // console.log("Success!");
        } else
            throw new Error(data.message || "login failed");
    };

    const signup = async (fullname: string, email: string, password: string) => {
        const res = await axios.post("http://192.168.150.78:5000/user/signup", {
            fullname, email, password
        });
        const data = await res.data.user;
        if (data.fullname) {
            await saveuserdata(data._id, data.fullname, data.email);
            setUser({ _id: data._id, name: data.fullname, email: data.email });
            setIsAuthenticated(true);
        } else
            throw new Error(data.message || "Signup failed");
    };

    const logout = async () => {
        await clearuserdata();
        setUser(null);
        setIsAuthenticated(false);
    };

    return <AuthContext.Provider value={
        { isAuthenticated, user, signup, login, logout }
    }>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext)!;