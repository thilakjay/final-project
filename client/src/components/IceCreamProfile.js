import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";


const IceCreamProfile = () => {
    const [iceCream, setIceCream] = useState(null);
    const [shop, setShop] = useState(null);
    const {_id} = useParams();

    useEffect(() => {
        const fetchIceCream = async () => {
            const data = await fetch(`/api/ice-creams/${_id}`);   
            const json = await data.json();
            setIceCream(json.data.iceCream);
            setShop(json.data.shop);
        };    
        fetchIceCream();
    }, []);

    return (
        <>
        {(iceCream && shop) && (
            <Wrapper>

                <IceCreamInfoContainer>
                    <img src={iceCream.imageSrc} alt={iceCream.flavour} />
                </IceCreamInfoContainer> 

                <ShopInfoContainer>
                    <div>{shop.name}</div>
                </ShopInfoContainer>
            </Wrapper>                
        )}        
        </>
    );

}
export default IceCreamProfile;

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px black solid;
    height: 95vh;
`;

const IceCreamInfoContainer = styled.div`
    border: 1px solid hotpink;
`;

const ShopInfoContainer = styled.div`
    border: 1px solid green;
`;

