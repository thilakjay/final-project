import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
    return (
        <HeaderSection>
            <NavLink exact to="/"> 
                <h1>CreM-T-L</h1>
            </NavLink>
            <div className="align-right">
                <NavLink exact to="/shop-locations"> 
                    <div>Find a shop</div>
                </NavLink>                
                <NavLink exact to="/login"> 
                    <div>Login</div>
                </NavLink>
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
