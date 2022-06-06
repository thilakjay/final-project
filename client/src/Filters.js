import { useEffect } from "react";
import styled from "styled-components";

const Filters = ({shops, setFiltered, activeFilters, setActiveFilters}) => {
    
    useEffect(() => {
        if(activeFilters === "") {
            setFiltered = shops;
            return;
        }
        const filtered = shops.map(shop => {
            return shop.iceCreams.filter(iceCream => iceCream.tags.includes(activeFilters));
        });
        setFiltered(filtered);
    }, [activeFilters]);

    return (
        <div>
            <Button onClick={() => setActiveFilters("")}>Clear All</Button>
            <Button onClick={() => setActiveFilters("soft")}>Soft-Serve</Button>
            <Button onClick={() => setActiveFilters("hard")}>Hard/Scoop</Button>
        </div>
    );
}
export default Filters;

const Button = styled.button`
  
`;
