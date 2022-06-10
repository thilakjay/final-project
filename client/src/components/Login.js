import styled from "styled-components";
// import { Link, useHistory } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
// import { getOptionGroupUnstyledUtilityClass } from "@mui/base";
import { UserContext } from "../context/context";
import jwt_decode from "jwt-decode";

const Login = () => {

    const {user, setUser} = useContext(UserContext);

    const handleCallbackResponse = (response) => {
        console.log("Encoded JWT ID token: " + response.credential);
        const userObject = jwt_decode(response.credential);
        console.log(userObject);
        setUser(userObject);
    }

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: "166656954368-au0gh49iog78r9eor2p2m7ocl2navur2.apps.googleusercontent.com",
            callback: handleCallbackResponse
        }) 

        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            {theme: "outline", size: "large"}
        )
    }, [])
        
    return (
        <Wrapper>
            <LoginContainer>
                <div id="signInDiv" />
            </LoginContainer>
        </Wrapper>
    );
};

export default Login;

const Wrapper = styled.div`
padding-top: 100px;
display: flex;
align-items: center;
justify-content: center;
`;

const Form = styled.form`
padding: 20px;
input {
  width: 250px;
  height: 40px;
  outline: none;
}
button {
  width: 250px;
  height: 40px;
  padding: 7px 20px;
  font-size: 1.2rem;
  border: none;
  color: white;
  background-color: #1a1a1a;
}
p {
  font-size: 1.3rem;
}
a {
  color: #32cd32;
  text-decoration: none;
}
`;

const LoginContainer = styled.div`
padding-top: 15px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-evenly;
border-radius: 6px;
box-shadow: 5px 15px 31px 4px #dfdfdf;
width: 500px;
height: 35vh;
gap: 10px;
`;

const SignUpInfo = styled.div`
font-size: 14px;
`;

const LoginMessage = styled.div`
font-weight: 600;
color: #343a40;
`;
