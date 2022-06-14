import styled from "styled-components";
import { Link } from "react-router-dom";
import { UserContext } from "../context/context";
import { useContext, useState } from "react";
import LoginModal from "./LoginModal";
import {RiArrowDropDownLine} from "react-icons/ri";
import {IoIceCreamOutline} from "react-icons/io5";

const Header = () => {

    const {user, setUser, modal, setModal, setLoginMessage} = useContext(UserContext);
    const [toggleUserMenu, setToggleUserMenu] = useState(false);

    const handleLogout = () => {
        setUser(null);
        setToggleUserMenu(false);
    }

    return (
        <HeaderSection>
            <StyledLink to="/"> 
                <IoIceCreamOutline size={40} color="white"/>
                <h1>crèMTL</h1>
            </StyledLink>
            <div className="align-right">
                <Link to="/shop-locations"> 
                    <div>Find a shop</div>
                </Link>                
                <div 
                    className="user-menu-container" 
                    onClick={() => {
                        setLoginMessage("Welcome!");
                        !user ? setModal(true) : setModal(false)}
                    }>
                    {user ? (<div 
                                onClick={() => {setToggleUserMenu(!toggleUserMenu)}} 
                                className="user-menu"
                             >
                                Welcome, {user.given_name} {user.family_name}! <RiArrowDropDownLine size={25}/>
                            </div>) 
                          :  (<div>Login</div>)
                    }
                    {user && toggleUserMenu && (
                     <DropDownDiv>
                        <div onClick={handleLogout}>Logout</div>
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
    margin-top: 0px; //!important removed
    color: white;
    background-color: hotpink;
    padding: 20px 80px;

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
`;

const DropDownDiv = styled.div`
    position: absolute;
    border: 1px white solid;
    padding: 1px 10px;
    border-radius: 3px;
    right: 110px;
    cursor: pointer;
`;
