import { useNavigate } from 'react-router';
import { UserProfile } from '../components/Model/User';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { loginAPI, registerAPI } from '../services/AuthService';
import { toast } from 'react-toastify';
import axios from 'axios';
type UserContextType = {
    user : UserProfile | null;
    token : string | null;
    registerUser: (email: string , username: string, password: string) => void;
    loginUser: (username: string, password: string) => void;
    logout: () => void;
    isLoggedIn: () => boolean;
};

type Pros = {
    children: React.ReactNode
};

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Pros) => {
    const navigate = useNavigate();
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isReady, setIsReady] = useState<boolean>(false);
    useEffect(() => {
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        if (user && token) {
            setUser(JSON.parse(user));
            setToken(token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        }
        setIsReady(true); 
    }, []);

    const registerUser = async (email: string, username: string, password: string) => {
        await registerAPI(email, username, password).then((res) =>{
            if(res){
                localStorage.setItem('token', res?.data.token);
                const userObj = {
                    username: res?.data.userName,
                    email: res?.data.email
                }
                localStorage.setItem('user', JSON.stringify(userObj));
                setToken(res?.data.token);
                setUser(userObj);
                toast.success("Registration successful");
                navigate('/search');
            }
        }).catch((e) => {
            toast.warning(e?.response?.data?.message || "Server error occurred");
        })
    };

    const loginUser = async ( UserName: string, password: string) => {
        await loginAPI(UserName, password).then((res) =>{
            if(res){
                localStorage.setItem('token', res?.data.token);
                const userObj = {
                    username: res?.data.userName,
                    email: res?.data.email
                }
                localStorage.setItem('user', JSON.stringify(userObj));
                setToken(res?.data.token);
                setUser(userObj);
                toast.success("login successful");
                navigate('/search');
            }
        }).catch((e) => {
            toast.warning(e?.response?.data?.message || "Server error occurred");
        })
    };

    const isLoggedIn = () => {
        return !!user;
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken("");
        setUser(null);
        navigate('/');
    };

    return (
        <UserContext.Provider value={{ user, token, registerUser, loginUser, logout, isLoggedIn }}>
            {isReady ? children : null}
        </UserContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(UserContext);
};