import { useEffect, useState } from "react";
import IceCream from "./IceCream";
import styled from "styled-components";
import Filters from "./Filters";
import {motion, AnimatePresence} from "framer-motion";
import Pagination from "./Pagination";

const Home = () => {
    const [iceCreams, setIceCreams] = useState(null); //for holding all fetched info
    const [filtered, setFiltered] = useState(null); //for holding the filtered results
    // const [activeFilters, setActiveFilters] = useState(""); //keeping track of what the current filters are

    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);

    //fetching all ice creams from BE
    useEffect(() => {
        const fetchIceCreams = async () => {
            setLoading(true);
            const data = await fetch("/api/ice-creams");   
            const json = await data.json();
            setIceCreams(json.data);
            setFiltered(json.data);
            setLoading(false);
        };    
        fetchIceCreams();
    }, []);

    //Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filtered && filtered.slice(indexOfFirstPost, indexOfLastPost)

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
        {iceCreams && (
            <Wrapper>               
                <Filters 
                    iceCreams={iceCreams} 
                    setFiltered={setFiltered} 
                    // activeFilters={activeFilters} 
                    // setActiveFilters={setActiveFilters}
                />
                
                <GridDiv layout>
                    {/* <AnimatePresence> */}
                    {currentPosts && currentPosts.map(iceCream => 
                        <IceCream key={iceCream._id} iceCream={iceCream}/>     
                    )}
                    {/* If no ice creams, tell user to remove or clear all filters. */}
                    {/* </AnimatePresence> */}
                </GridDiv>
                
                <Pagination postsPerPage={postsPerPage} totalPosts={filtered.length} paginate={paginate}/>
            </Wrapper>            
        )}
        </>
    );
}
export default Home;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* align-items: center; */
`;

const GridDiv = styled(motion.div)`
    display: grid;
    justify-content: center;
    /* align-items: center; */
    grid-template-columns: repeat(auto-fit, minmax(200px, 250px));
    grid-template-rows: repeat(auto-fit, minmax(250px, 300px));
    grid-column-gap: 2rem;
    margin: 0px;
    /* grid-row-gap : 1rem; */
`;