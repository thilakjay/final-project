import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "../context/context";
import { useContext, useState } from "react";
import LoginModal from "./LoginModal";
import {RiArrowDropDownLine} from "react-icons/ri";

const Header = () => {

    const {user, setUser, modal, setModal} = useContext(UserContext);
    const [toggleUserMenu, setToggleUserMenu] = useState(false);

    const handleLogout = () => {
        setUser(null);
        setToggleUserMenu(false);
    }

    return (
        <HeaderSection>
            <Link exact to="/"> 
                <h1>CrèM-T-L</h1>
            </Link>
            <div className="align-right">
                <Link exact to="/shop-locations"> 
                    <div>Find a shop</div>
                </Link>                
                <div className="user-menu-container" onClick={() => {!user ? setModal(true) : setModal(false)}}>
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
    margin-top: 0px !important;
    color: white;
    background-color: hotpink;
    padding: 20px 20px;

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
        gap: 100px;
        margin-right: 100px;
    }

    .user-menu-container {
        cursor: pointer;
    }

    .user-menu {
        display: flex;
    }
`;

const DropDownDiv = styled.div`
    position: absolute;
    border: 1px white solid;
    padding: 0px 10px;
    border-radius: 3px;
    right: 150px;
    cursor: pointer;
`;
