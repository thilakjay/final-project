import { useEffect, useState } from "react";
import IceCream from "./IceCream";
import styled from "styled-components";
import Filters from "../Filters";

const Test = () => {
    const [shops, setShops] = useState(null); //for holding all fetched info
    const [filtered, setFiltered] = useState(null); //for holding the filtered info
    const [activeFilters, setActiveFilters] = useState(null); //keeping track of what the current filters are

    //fetching all ice creams from BE
    useEffect(() => {
        const fetchIceCreams = async () => {
            const data = await fetch("/api/all");   
            const json = await data.json();
            setShops(json.data);
            setFiltered(json.data);
        };    
        fetchIceCreams();
    }, []);

    return (
        <div>
            <Filters data={shops} setFiltered={setFiltered} activeFilters={activeFilters} setActiveFilters={setActiveFilters}/>
            <GridDiv>
            {shops && shops.map(shop => 
                <>
                    <h1>{shop.name}</h1>
                    {shop.iceCreams.map(iceCream => 
                        <IceCream iceCream={iceCream}/>
                    )}
                </>
            )}
            </GridDiv>
        </div>
    );

}
export default Test;

const GridDiv = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-column-gap: 1rem;
    /* grid-row-gap : 1rem; */
`;