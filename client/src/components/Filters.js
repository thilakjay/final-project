import { useEffect, useState } from "react";
import styled from "styled-components";
import filterData from "./filterUtils";

const Filters = ({iceCreams, setFiltered, paginate}) => {
    const [tagsList, setTagsList] = useState([]);
    const [filterOn, setFilterOn] = useState(filterData);
    
    useEffect(() => {
        //algorithm for filling an array with items that match the filtered tags
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
    }, [tagsList, iceCreams]);

    const handleFilter = (filterTag) => {
        //adds a filter if it's not already included as a filter
        if(!tagsList.includes(filterTag)){
            setTagsList([...tagsList, filterTag]);
        }else { 
            //removes the filter tag from array if tag already exists
            const newTagsList = tagsList.filter(tag => tag !== filterTag);
            setTagsList(newTagsList);      
        }
        //set back to page 1 every time a filter is added or removed
        paginate(1);
    }

    return (
        <Wrapper>            
            <h3>Please select your filter(s):</h3>
            {/* clears filters and resets it to include all ice creams */}
            <Button onClick={() => {
                setFilterOn(filterOn.map(elem => {
                    return {...elem, filter: false}
                }));
                setFiltered(iceCreams);
                setTagsList([])}}
            >
              Clear All
            </Button>

            {/* creates a button for each filter tag */}
            {filterOn.map((filter, i) => 
                <Button key={i} filterToggle={filter.filter} onClick={() => {
                    //refactor later to another function (toggleStateHandler)
                    let copiedFilter = [...filterOn];
                    copiedFilter[i].filter = !copiedFilter[i].filter;
                    setFilterOn(copiedFilter);
                    handleFilter(filter.name)}}
                >
                  {filter.label}
                </Button>
            )}
        </Wrapper>
    );
}
export default Filters;

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 2rem;
    margin: 0 25px;
`;

const Button = styled.button`
  align-items: center;
  appearance: none;
  background-color: #fff;
  border-radius: 24px;
  border-style: none;
  box-shadow: rgba(0, 0, 0, .2) 0 3px 5px -1px,rgba(0, 0, 0, .14) 0 6px 10px 0,rgba(0, 0, 0, .12) 0 1px 18px 0;
  box-sizing: border-box;
  color: #FAAFBA;
  cursor: pointer;
  display: inline-flex;
  fill: currentcolor;
  font-size: 14px;
  font-weight: 500;
  height: 48px;
  justify-content: center;
  letter-spacing: .25px;
  line-height: normal;
  max-width: 100%;
  overflow: visible;
  padding: 2px 20px;
  position: relative;
  text-align: center;
  text-transform: none;
  transition: box-shadow 280ms cubic-bezier(.4, 0, .2, 1),opacity 15ms linear 30ms,transform 270ms cubic-bezier(0, 0, .2, 1) 0ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: auto;
  will-change: transform,opacity;
  z-index: 0;
  outline: ${({filterToggle}) => filterToggle ? "2px solid hotpink" : "none"};


&:hover {
  background: #F6F9FE;
  color: hotpink;
}

&:active {
  box-shadow: 0 4px 4px 0 rgb(60 64 67 / 30%), 0 8px 12px 6px rgb(60 64 67 / 15%);
  outline: none;
}

/* &:focus {
  outline: none;
  border: 2px solid #4285f4;
} */

&:not(:disabled) {
  box-shadow: rgba(60, 64, 67, .3) 0 1px 3px 0, rgba(60, 64, 67, .15) 0 4px 8px 3px;
}

&:not(:disabled):hover {
  box-shadow: rgba(60, 64, 67, .3) 0 2px 3px 0, rgba(60, 64, 67, .15) 0 6px 10px 4px;
}

&:not(:disabled):focus {
  box-shadow: rgba(60, 64, 67, .3) 0 1px 3px 0, rgba(60, 64, 67, .15) 0 4px 8px 3px;
}

&:not(:disabled):active {
  box-shadow: rgba(60, 64, 67, .3) 0 4px 4px 0, rgba(60, 64, 67, .15) 0 8px 12px 6px;
}

&:disabled {
  box-shadow: rgba(60, 64, 67, .3) 0 1px 3px 0, rgba(60, 64, 67, .15) 0 4px 8px 3px;
}    

`;

