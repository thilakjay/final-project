import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const IceCreamProfile = () => {
    const [iceCream, setIceCream] = useState(null);
    const {_id} = useParams();

    useEffect(() => {
        const fetchIceCream = async () => {
            const data = await fetch(`/api/ice-creams/${_id}`);   
            const json = await data.json();
            setIceCream(json.data);
        };    
        fetchIceCream();
    }, []);

}
export default IceCreamProfile;