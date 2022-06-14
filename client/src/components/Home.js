import { useEffect, useState } from "react";
import IceCream from "./IceCream";
import styled from "styled-components";
import Filters from "./Filters";
import {motion} from "framer-motion";
import Pagination from "./Pagination";

const Home = () => {
    const [iceCreams, setIceCreams] = useState(null); //for holding all fetched info
    const [filtered, setFiltered] = useState(null); //for holding the filtered results

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);

    //fetching all ice creams from BE
    useEffect(() => {
        const fetchIceCreams = async () => {         
            const data = await fetch("/api/ice-creams");   
            const json = await data.json();
            setIceCreams(json.data);
            setFiltered(json.data);
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
                    paginate={paginate}
                />
                <GridDiv layout>
                    {currentPosts && (currentPosts.map(iceCream => 
                        <IceCream key={iceCream._id} iceCream={iceCream}/>
                    ))}
                </GridDiv>
                {!filtered.length && (
                        <div className="no-ice-creams">
                            <h3>Woops! What a mess... Please remove a filter to see more ice creams.</h3>
                            <img src="images\no-ice-creams.jpg" alt="No ice cream results" />
                        </div>
                )}
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

    .no-ice-creams {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
`;

const GridDiv = styled(motion.div)`
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(auto-fit, minmax(200px, 250px));
    grid-template-rows: repeat(auto-fit, minmax(250px, 300px));
    grid-column-gap: 2rem;
    margin: 50px;
`;