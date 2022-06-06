import { useEffect, useState } from "react";
import styled from "styled-components";

const Filters = ({iceCreams, setFiltered, activeFilters, setActiveFilters}) => {
    const [tagsList, setTagsList] = useState([]);
    
    useEffect(() => {
        //I don't understand this fully, ask Andrew about this
        let targetNumberOfMatches = tagsList.length;
        let filtered = [];

        iceCreams.forEach(iceCream => {
            let numberOfMatches = 0;
            tagsList.forEach(tag => {
                if(iceCream.tags.includes(tag)) numberOfMatches++;
            });
            if(numberOfMatches === targetNumberOfMatches) {
                filtered.push(iceCream);
            }
        })

        setFiltered(filtered);
        console.log("tags:", tagsList);
        console.log(filtered);
        
    }, [tagsList, iceCreams]);

    const handleFilter = (filterTag) => {
        //adds a filter tag if it's not already included as a filter
        if(!tagsList.includes(filterTag)){
            setTagsList([...tagsList, filterTag]);
        }else { //removes the filter tag from array if tag already exists
            const newTagList = tagsList.filter(tag => tag !== filterTag);
            setTagsList(newTagList);
        }
    }

    return (
        <Wrapper>
            <Button onClick={() => {
                setFiltered(iceCreams);
                setTagsList([])}}>Clear All</Button>
            <Button onClick={() => handleFilter("soft")}>Soft-Serve</Button>
            <Button onClick={() => handleFilter("hard")}>Hard/Scoop</Button>
            <Button onClick={() => handleFilter("gelato")}>Gelato</Button>
            <Button onClick={() => handleFilter("vegan")}>Vegan</Button>
            <Button onClick={() => handleFilter("fruit")}>Fruity</Button>
            <Button onClick={() => handleFilter("confection")}>Confections</Button>
            <Button onClick={() => handleFilter("nut")}>Nutty</Button>
            <Button onClick={() => handleFilter("spice")}>Spiced</Button>
            <Button onClick={() => handleFilter("tea")}>Tea</Button>
            <Button onClick={() => handleFilter("local")}>Local</Button>
            <Button onClick={() => handleFilter("international")}>International</Button>
        </Wrapper>
    );
}
export default Filters;

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    gap: 2rem;
`;

const Button = styled.button`
  
`;
