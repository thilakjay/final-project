import styled from "styled-components";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const IceCream = ({iceCream}) => {
    return (
        <motion.div 
            layout
            initial={{opacity: 0}} 
            animate={{opacity: 1}} 
            exit={{opacity: 0}}       
        >
            <Link to={`/ice-creams/${iceCream._id}`}>
                <Image src={`/images/icecreams/${iceCream.imageSrc}`} alt={iceCream.name} />
            </Link>
        </motion.div>
    );
}
export default IceCream;

const Image = styled.img`
    width: 100%;
    height: 75%;
    object-fit: cover;
    border-radius: 1rem;
    transition: 300ms ease-in-out;

    &:hover {
        transform: scale(1.20);
    }
    /* margin-bottom: 0rem; */
`;