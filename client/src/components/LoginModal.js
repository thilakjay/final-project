import { UserContext } from "../context/context";
import { useContext, useEffect } from "react";
import styled from "styled-components";
import jwt_decode from "jwt-decode";
import {CgCloseO} from "react-icons/cg";

const LoginModal = () => {

    const {user, setUser, modal, setModal, loginMessage} = useContext(UserContext);

    const handleCallbackResponse = (response) => {
        //converts JWT token into a readable object
        const userObject = jwt_decode(response.credential);
        setUser(userObject);
    }

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: "166656954368-au0gh49iog78r9eor2p2m7ocl2navur2.apps.googleusercontent.com",
            callback: handleCallbackResponse
        }); 

        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            {theme: "outline", size: "large"}
        );
    }, []);

    return (
        <>
            {(!user && modal) && (
            <Modal className="modal">
                <Overlay onClick={() => {setModal(!modal)}} className="overlay"></Overlay>
                    <div className="modal-content">
                        <CgCloseO 
                            className="close-icon" 
                            fill="black" color="hotpink" 
                            size={25} 
                            onClick={() => {setModal(!modal)}} 
                        />
                        <h2>{loginMessage}</h2>                      
                        <div id="signInDiv" /> {/* google login button is rendered here */}                     
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
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        gap: 20px;
        position: absolute;
        top: 45%;
        left: 50%;
        transform: translate(-50%, -50%);
        line-height: 1.4;
        height: 400px;
        max-width: 250px;
        min-width: 250px;
        background-image: url("/images/login-splash.jpg");     
        background-repeat: no-repeat;
        background-position: center;
        border-radius: 5px;
        padding: 20px;
        z-index: 5;
    }

    h2 {
        position: relative;
        top: -150px;
        color: white;
        text-align: center;
    }

    .close-icon {
        position: relative;
        top: -17px;
        left: 110px;
        cursor: pointer;
    }
`;

const Overlay = styled(Modal)`
    background: rgba(49,49,49,0.4);
`;

