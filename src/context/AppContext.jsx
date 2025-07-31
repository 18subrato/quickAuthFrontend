import { createContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from "react-hot-toast";

export const AppContext = createContext();

const AppProvider = ({ children }) => {

    axios.defaults.withCredentials = true;
    
    const navigate = useNavigate()
    const backend = import.meta.env.VITE_BACKEND_URL;
    const [themeMode, setThemeMode] = useState('light');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(false);

    function toggleMode() {
        setThemeMode((p) => p === 'light' ? 'dark' : 'light');
    }

    async function getAuthState(){
        try {
            const { data } = await axios.get(backend + '/api/auth/is-auth');
            if(data.success){
                setIsLoggedIn(true);
                getUserData();
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    async function getUserData() {
        try {
            const { data } = await axios.get(backend + '/api/user/data');
            if (data.success) {
                setUser(data.userData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(()=>{
        getAuthState();
    },[])


    const val = { themeMode, toggleMode, navigate, axios, isLoggedIn, setIsLoggedIn, user, setUser, backend, getUserData }

    return (
        <AppContext.Provider value={val}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider;
