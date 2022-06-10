import { useState } from "react";
import { UserContext } from "../context/context";
import { useContext, useEffect } from "react";
import styled from "styled-components";
import jwt_decode from "jwt-decode";
import {CgCloseO} from "react-icons/cg";

const LoginModal = () => {

    const {user, setUser, modal, setModal} = useContext(UserContext);

    const handleCallbackResponse = (response) => {
        // console.log("Encoded JWT ID token: " + response.credential);
        const userObject = jwt_decode(response.credential);
         // console.log(userObject);
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
        <>
            {(!user && modal) && (
            <Modal className="modal">
                <Overlay onClick={() => {setModal(!modal)}} className="overlay"></Overlay>
                    <div className="modal-content">
                        <div id="signInDiv" />
                        <CgCloseO fill="black" color="gray" size={25} onClick={() => {setModal(!modal)}} />
                        {/* <CloseDiv className="close-modal" onClick={() => {setModal(!modal)}}></CloseDiv> */}
                    </div>                       
            </Modal>
            )}
        </>
    );
}
export default LoginModal;

const Modal = styled.div`
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: fixed;
    z-index: 3;

    .modal-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 20px;
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
        line-height: 1.4;
        background: white;
        border-radius: 3px; 
        max-width: 600px;
        min-width: 250px;
        padding: 20px;
        z-index: 4;
    }
`;

const Overlay = styled(Modal)`
    background: rgba(49,49,49,0.8);
`;

const CloseDiv = styled.div`
    position: relative;
    display: flex;
    /* top: 10px; */
`;