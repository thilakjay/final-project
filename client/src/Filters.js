import { useEffect } from "react";
import styled from "styled-components";

const Filters = ({data, setFiltered, activeFilters, setActiveFilters}) => {
    
    useEffect(() => {
        
    })

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
