import styled from "styled-components";
import { Link } from "react-router-dom";

const IceCream = ({iceCream}) => {
    return (
        <div>
            <Link to={`/ice-creams/${iceCream._id}`}>
                <Image src={iceCream.imageSrc} alt={iceCream.name} />
            </Link>
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