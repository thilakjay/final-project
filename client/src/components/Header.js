import styled from "styled-components";
import { Link } from "react-router-dom";
import { UserContext } from "../context/context";
import { useContext, useState, useRef } from "react";
import LoginModal from "./LoginModal";
import {RiArrowDropDownLine} from "react-icons/ri";
import {IoIceCreamOutline} from "react-icons/io5";
import { useEffect } from "react";


const Header = () => {

    const {
            user, 
            setUser, 
            modal, 
            setModal, 
            setLoginMessage,
            setFavourites
        } = useContext(UserContext);
        
    const [toggleUserMenu, setToggleUserMenu] = useState(false);

    const dropDown = useRef(null);

    const handleLogout = () => {
        setUser(null);
        setToggleUserMenu(false);
        setFavourites(null);
    }

    const handleDropDownClick = (e) => {
        if(!e.target.closest(`.${dropDown.current.className}`) && toggleUserMenu) {
            setToggleUserMenu(false);
        }
    }

    useEffect(() => {
        document.addEventListener("click", handleDropDownClick);

        return(() => {
            document.removeEventListener("click", handleDropDownClick);
        })
    });

    return (
        <HeaderSection>
            <StyledLink to="/"> 
                <IoIceCreamOutline size={55} color="white"/>
                <h1>crèMTL</h1>
            </StyledLink>
            <div className="align-right">
                <Link to="/shop-locations"> 
                    <div>Find a shop</div>
                </Link>                
                <div 
                    className="user-menu-container" 
                    // ref={dropDown}
                    onClick={() => {
                        setLoginMessage("Welcome!");
                        !user ? setModal(true) : setModal(false)}
                    }>
                    {user ? (<div 
                                onClick={() => {setToggleUserMenu(!toggleUserMenu)}} 
                                className="user-menu"
                                ref={dropDown}
                             >
                                Welcome, {user.given_name} {user.family_name}! <RiArrowDropDownLine size={25}/>
                            </div>) 
                          :  (<div>Login</div>)
                    }
                    {user && toggleUserMenu && (
                    //  <DropDownDiv>                      
                    //     <div onClick={handleLogout}>Logout</div>
                    //  </DropDownDiv>   
                    <DropDownDiv>
                        <ul>
                            <li>
                                <Link to="/shop-locations">Find a shop</Link>
                            </li>
                            <li>
                            <Link to="/favourites">Favourites</Link>
                            </li>   
                            <li>
                                <div onClick={handleLogout}>Logout</div>
                            </li>                                                      
                        </ul>    
                    </DropDownDiv>  
                    )}
                </div>
                {modal && <LoginModal />}
            </div>
        </HeaderSection>        
    );
};
export default Header;

const HeaderSection = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    margin-top: 0px;
    color: white;
    background-color: hotpink;
    padding: 20px 80px;
    font-size: 20px;

    /* for some responsiveness */
    @media screen and (max-width: 600px) {
        background-color: lightblue;
        padding: 20px 20px;
    } 

    a {
        color: white;
    }

    & > div {
        display: flex;
        align-items: center;
    }

    .align-right {
        display: flex;
        justify-content: space-between;
        gap: 120px;
    }

    .user-menu-container {
        cursor: pointer;
    }

    .user-menu {
        display: flex;
    }
`;

const StyledLink = styled(Link)`
    display: flex;
    align-self: center;
    justify-content: center;

    h1 {
        font-size: 40px; 
    }
`;

const DropDownDiv = styled.div`
    position: absolute;
    border: 4px pink solid;
    background-color: hotpink;
    border-radius: 3px;
    right: 110px;
    cursor: pointer;
    z-index: 2;

    ul {
        list-style-type: none;
        padding: 0;

        li {
            padding: 5px 8px;
            &:hover {
                background-color: pink;
                transition: 200ms ease-in-out;
            }
        }
    }
`;
