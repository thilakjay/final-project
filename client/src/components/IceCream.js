import styled from "styled-components";

const IceCream = ({iceCream}) => {
    return (
        <div>
            <Image src={iceCream.imageSrc} alt={iceCream.name} />
        </div>
    );
}
export default IceCream;

const Image = styled.img`
    width: 100%;
    height: 75%;
    object-fit: cover;
    border-radius: 1rem;
    /* margin-bottom: 0rem; */
`;