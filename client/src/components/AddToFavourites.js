import { useState, useContext, useEffect } from "react";
import {FaHeart} from "react-icons/fa";
import styled from "styled-components";
import { UserContext } from "../context/context";
import Loader from "./Loader";
import EllipsisLoader from "./EllipsisLoader";

const AddToFavourites = ({iceCream}) => {

    const [favourite, setFavourite] = useState(false);
    const [loaded, setLoaded] = useState(false);

    const {
            user,  
            setModal, 
            setLoginMessage,
        } = useContext(UserContext); 

    useEffect(() => {
        fetchFavourite();
  }, []);          
    
  //fetch data on a specific ice cream
  const fetchFavourite = async () => {
    try{
        const data = await fetch(`/api/get-favourite`, {
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
        setFavourite(json.isFavourite);
        setLoaded(true);
        
    }catch(error) {
        console.log("Error caught:", error);
    };
  }

    const handleClickResponse = (e) => {   
        //if user submits post without first logging in, modal pops up to prompt login
        if(!user) {
            setLoginMessage("Please sign in first.");
            setModal(true);
            return; 
        }
        addToFavourites(); 
    };

    const addToFavourites = async () => {
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
    
            // const json = await data.json();
            // fetchFavourite();
            setFavourite(!favourite);
            
        }catch(error) {
            console.log("Error caught:", error);
        };
    }

    return (
            <>
            {!loaded ? <EllipsisLoader /> : (            
                <StyledButton onClick={(e) => {handleClickResponse(e)}}>
                    <div>
                        {favourite ? "Remove From Favourites" : "Add To Favourites"}
                    </div>
                    <FaHeart className="heart-icon"           
                        size={20} 
                        fill={favourite ? "hotpink" : "pink"}
                    />
                </StyledButton>    
            )}
            </>
    );
}
export default AddToFavourites;

const StyledButton = styled.button`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    outline: none;

    /* display: block; */
    margin: 0;
    padding: 0;
    border: none;
    background: transparent;
    cursor: pointer;
    text-align: left;
    /* &:active {
        color: inherit;   
    }  */

    .heart-icon {
        transition: 300ms ease;
        transform: scale(1);
    }

    &:hover {
        .heart-icon {
            transition: 300ms ease;
            transform: scale(1.25); 
        }
    }
`;
