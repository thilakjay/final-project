import { createContext, useState, useEffect } from "react";

//context to pass user logged-in status across App.
export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = usePersistedState("user", null);
    const [favourites, setFavourites] = useState(null);
    const [modal, setModal] = useState(false);
    const [loginMessage, setLoginMessage] = useState("");
    
    return (
        <UserContext.Provider 
            value={{ 
                user, 
                setUser, 
                modal, 
                setModal, 
                loginMessage, 
                setLoginMessage,
                favourites,
                setFavourites 
            }}>
            {children}
        </UserContext.Provider>
    );
};

//custom hook for storing user in localStorage
const usePersistedState = (localStorageName, initialValue) => {
    const [state, setState] = useState(() => {
        const storedValue = window.localStorage.getItem(localStorageName);

        return storedValue !== null ? JSON.parse(storedValue) : initialValue;
    });

    useEffect(() => {
        window.localStorage.setItem(localStorageName, JSON.stringify(state));
    }, [state]);
    
    return [state, setState];
};

