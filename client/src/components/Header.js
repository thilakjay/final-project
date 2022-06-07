import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";

const Header = () => {

    return (
        <HeaderSection>
            <NavLink exact to="/"> 
                <h1>CreM-T-L</h1>
            </NavLink>
            <NavLink exact to="/login"> 
                <div>Login</div>
            </NavLink>
            <NavLink exact to="/find-shop"> 
                <div>Find a shop</div>
            </NavLink>
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
`;
