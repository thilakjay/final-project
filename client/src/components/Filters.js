import { useEffect, useReducer, useState } from "react";
import styled from "styled-components";
import filterData from "./filterUtils";

const Filters = ({iceCreams, setFiltered, activeFilters, setActiveFilters}) => {
    const [tagsList, setTagsList] = useState([]);
    const [toggleFilter, setToggleFilter] = useState(false);
    const [filterOn, setFilterOn] = useState(filterData);
    console.log(filterData);
    
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
        // console.log("tags:", tagsList);
        // console.log(filtered);
        
    }, [tagsList, iceCreams]);

    const handleFilter = (filterTag) => {
        //adds a filter tag if it's not already included as a filter
        if(!tagsList.includes(filterTag)){
            setTagsList([...tagsList, filterTag]);
            // e.target.style.backgroundColor = "black";
            // e.target.style.color = "white";
            // console.log(e.target);
        }else { //removes the filter tag from array if tag already exists
            const newTagList = tagsList.filter(tag => tag !== filterTag);
            // e.target.classList.remove("filterOn");
            // e.target.style.backgroundColor = "";
            // e.target.style.color = "black";
            setTagsList(newTagList);
            // console.log(e.target);
        }
    }

    return (
        <Wrapper>
            {/* <Button onClick={() => {
                setFiltered(iceCreams);
                setTagsList([])}}>Clear All</Button>
            <Button onClick={(e) => {
                                handleFilter(e,"soft");
                                setFilterOn(!filterOn);
                    }}
            >
                        Soft-Serve
            </Button>
            <Button onClick={(e) => handleFilter(e,"hard")}>Hard/Scoop</Button>
            <Button onClick={(e) => handleFilter(e,"gelato")}>Gelato</Button>
            <Button onClick={(e) => handleFilter(e,"vegan")}>Vegan</Button>
            <Button onClick={(e) => handleFilter(e,"fruit")}>Fruity</Button>
            <Button onClick={(e) => handleFilter(e,"confection")}>Confections</Button>
            <Button onClick={(e) => handleFilter(e,"nut")}>Nutty</Button>
            <Button onClick={(e) => handleFilter(e,"spice")}>Spiced</Button>
            <Button onClick={(e) => handleFilter(e,"tea")}>Tea</Button>
            <Button onClick={(e) => handleFilter(e,"local")}>Local</Button>
            <Button onClick={(e) => handleFilter(e,"international")}>International</Button> */}
            
            <Button onClick={() => {
                setFilterOn(filterOn.map(elem => {
                    return {...elem, filter: false}
                }));
                setFiltered(iceCreams);
                setTagsList([])}}>Clear All
            </Button>

            {filterOn.map((filter, i) => 
                <Button filterToggle={filter.filter} onClick={() => {
                    //refactor later to another function (toggleStateHandler)
                    let copiedFilter = [...filterOn];
                    copiedFilter[i].filter = !copiedFilter[i].filter;
                    // setFilterOn([...filterOn, filter.filter = !copiedFilter]);
                    setFilterOn(copiedFilter);
                    handleFilter(filter.name)}}>{filter.label}</Button>
            )}
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
    /* .filterOn {
        background-color: blue;
        color: white;
    } */

    transition: 200ms ease;
    background-color: ${({filterToggle}) => filterToggle ? "black" : ""};
    color: ${({filterToggle}) => filterToggle ? "white" : ""};
`;
