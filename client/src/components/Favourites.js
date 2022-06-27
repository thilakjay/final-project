import styled from "styled-components"
import { useContext, useEffect } from "react";
import { UserContext } from "../context/context";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";
import Loader from "./Loader";

const Favourites = () => {

    const {
        user, 
        favourites,
        setFavourites
    } = useContext(UserContext); 

    useEffect(() => {
        fetchFavourites();
    }, []);

    const fetchFavourites = async () => {
        try{
            const data = await fetch(`/api/get-favourites`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({userEmail: user.email}),
            });
    
            const json = await data.json();
            setFavourites(json.favourites);
            
        }catch(error) {
            console.log("Error caught:", error);
        };
      }

    //create remove favourite function
    const removeFavourite = async (iceCream) => {
        try{
            const data = await fetch(`/api/add-ice-cream`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    userEmail: user.email,
                    iceCream: iceCream
                }),
            });
    
            const json = await data.json();
            setFavourites(json.favourites);
            
        }catch(error) {
            console.log("Error caught:", error);
        };
    }
   
    return (
        <>
            <Heading>My Favourites</Heading>
            <Wrapper>
            {!favourites ? <Loader /> : (
            <>
                {favourites.map(elem => 
                    <ImageContainer key={elem._id}>
                        <Link to={`/ice-creams/${elem._id}`}><img src={`/images/icecreams/${elem.imageSrc}`} alt={elem.flavour} /></Link>
                        {elem.flavour}
                        <Rating value={elem.rating} precision={0.5} size="small" readOnly />
                        <StyledButton onClick={() => removeFavourite(elem)}>Remove</StyledButton>
                    </ImageContainer>   
                )}
                {favourites && favourites.length === 0 && (
                    <div className="no-favourites">
                        <h3>Woops! You don't have any favourites at the moment.</h3>
                        <img src="images\no-ice-creams.jpg" alt="No ice cream results" />
                    </div>
                )}
            </>     
            )}
            </Wrapper>
        </>            
    );
}
export default Favourites;

const Heading = styled.h1`
    text-align: center;
    margin: 30px;
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;

    .no-favourites {
        display: flex;
        flex-direction: column;

        h3 {
            text-align: center;
            color: hotpink;
        }
    }
`;

const ImageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 20vw;
    height: 32vh;

    img {
        width: 12vw;
        height: 30vh;
        border-radius: 3px;
    }
`;

const StyledButton = styled.button`
    border: none;
    border-radius: 5px;
    padding: 5px 15px;
    margin: 10px;
    background-color: hotpink;
    color: white;
    cursor: pointer;

    &:hover {
        color: pink;
    }
`;