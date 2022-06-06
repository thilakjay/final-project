import { createContext, useState, useEffect, useReducer, useContext } from "react";

export const FilterContext = createContext();

export const FilterProvider = ({children}) => {

    const [state, dispatch] = useReducer(reducer, {
        bySoft: false,
        byHard: false,
        byGelato: false,
        byVegan: false,
        byFruit: false,
        byConfection: false,
        byNut: false,
        bySpice: false,
        byLocal: false,
        byInternational: false,
        byRating: 0
    });
    
    return (
        <FilterContext.Provider
            value={{
                state,
                dispatch
            }}
        >
            {children}
        </FilterContext.Provider>
    );

}

