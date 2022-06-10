import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "../context/context";
import { useContext, useState } from "react";
import LoginModal from "./LoginModal";
import {RiArrowDropDownLine} from "react-icons/ri";

const Header = () => {

    const {user, setUser, modal, setModal} = useContext(UserContext);

    return (
        <HeaderSection>
            <Link exact to="/"> 
                <h1>CrèM-T-L</h1>
            </Link>
            <div className="align-right">
                <Link exact to="/shop-locations"> 
                    <div>Find a shop</div>
                </Link>                
                {/* <NavLink exact to="/login">  */}
                <div onClick={() => {!user ? setModal(true) : setModal(false)}}>
                    {user ? `Welcome, ${user.given_name} ${user.family_name}!` : `Login`}
                </div>
                {modal && <LoginModal />}
                {/* </NavLink> */}
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

    .align-right {
        display: flex;
        justify-content: space-between;
        gap: 100px;
        margin-right: 100px;
    }
`;
