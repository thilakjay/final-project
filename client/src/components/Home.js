import { useEffect, useState } from "react";
import IceCream from "./IceCream";
import styled from "styled-components";
import Filters from "./Filters";
import {motion} from "framer-motion";
import Pagination from "./Pagination";

const Home = () => {
    const [iceCreams, setIceCreams] = useState(null); //for holding all fetched info
    const [filtered, setFiltered] = useState(null); //for holding the filtered results

    // const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);

    //fetching all ice creams from BE
    useEffect(() => {
        const fetchIceCreams = async () => {
            // setLoading(true);
            const data = await fetch("/api/ice-creams");   
            const json = await data.json();
            setIceCreams(json.data);
            setFiltered(json.data);
            // setLoading(false);
        };    
        fetchIceCreams();
    }, []);

    //Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filtered && filtered.slice(indexOfFirstPost, indexOfLastPost)

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    return (
        <>
        {iceCreams && (
            <Wrapper>               
                <Filters 
                    iceCreams={iceCreams} 
                    setFiltered={setFiltered} 
                />
                <GridDiv layout>
                    {currentPosts ? (currentPosts.map(iceCream => 
                        <IceCream key={iceCream._id} iceCream={iceCream}/>
                    )) 
                    : (<h3>No ice creams listed under those filters. Please clear or remove a filter to view more ice creams </h3>)    
                    }
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
    /* justify-content: center; */
`;

const GridDiv = styled(motion.div)`
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(auto-fit, minmax(200px, 250px));
    grid-template-rows: repeat(auto-fit, minmax(250px, 300px));
    grid-column-gap: 2rem;
    margin: 50px;
    /* grid-row-gap : 1rem; */
`;