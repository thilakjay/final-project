import { useEffect, useState } from "react";

const Test = () => {
    const [shops, setShops] = useState(null);

    //fetching all ice creams from BE
    useEffect(() => {
        const fetchIceCreams = async () => {
            const data = await fetch("/api/all");   
            const json = await data.json();
            setShops(json.data);
        };    
        fetchIceCreams();
    }, []);

    return (
        <div>
            {shops && shops.map(shop => 
                <>
                    <h1>{shop.name}</h1>
                    {shop.iceCreams.map(iceCream => 
                        <div>
                            <p>{iceCream.flavour}</p> 
                            <img src={iceCream.imageSrc} />   
                        </div>
                    )}
                </>
            )}
        </div>
    );

}
export default Test;