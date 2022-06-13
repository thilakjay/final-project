import styled from "styled-components";

const ErrorMessage = ({error}) => {
    return (
        <Wrapper>
            <img src="/images/no-ice-creams.jpg" />
            <div>{error.message}</div>
        </Wrapper>
    );
}
export default ErrorMessage;

const Wrapper = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 100px;
    top: 30px;
    left: -150px;
    font-size: 13px;
    color: red;
    font-weight: bold;
    z-index: 2;
`;