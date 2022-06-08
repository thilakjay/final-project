import { createContext, useState, useEffect, useReducer, useContext } from "react";

// export const FilterContext = createContext();

// export const FilterProvider = ({children}) => {

//     const [state, dispatch] = useReducer(reducer, {
//         bySoft: false,
//         byHard: false,
//         byGelato: false,
//         byVegan: false,
//         byFruit: false,
//         byConfection: false,
//         byNut: false,
//         bySpice: false,
//         byLocal: false,
//         byInternational: false,
//         byRating: 0
//     });
    
//     return (
//         <FilterContext.Provider
//             value={{
//                 state,
//                 dispatch
//             }}
//         >
//             {children}
//         </FilterContext.Provider>
//     );
// }

//context to pass user logged-in status across App.
export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = usePersistedState("user", null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

//custom hook for keeping track of the user that is logged in
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

