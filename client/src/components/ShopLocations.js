import Map, { Marker, Popup } from 'react-map-gl';
import { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import {MdOutlineIcecream} from "react-icons/md";
import { Rating } from "@mui/material";

const ShopLocations = () => {
    const [shops, setShops] = useState(null);
    const [selectedShop, setSelectedShop] = useState(null);
    const mapRef = useRef(null);

    const initialViewportState = {
        longitude: -73.7004,
        latitude: 45.5336,
        zoom: 10
    };

    //fetching all shops from BE
    useEffect(() => {
        const fetchShops = async () => {
            const data = await fetch("/api/shops");
            const json = await data.json();
            setShops(json.data);
        };
        fetchShops();
    }, []);    

    //puts shop location on center of map
    const centerOnMap = (lng, lat, zoom) => {
        mapRef.current.easeTo({
            center: [lng, lat],
            zoom: zoom,
            speed: 0.2,
            duration: 1000,
            easing(t) {
                return t;
            }
        });        
    };

    return (
        <Wrapper>
        <MapContainer>
            <nav>
                <ul>
                    <li><div onClick={() => centerOnMap(-73.8413, 45.4563, 13)}>West Island</div></li>
                    <li><div onClick={() => centerOnMap(-73.6303, 45.4722, 13)}>CDN/NDG</div></li>
                    <li><div onClick={() => centerOnMap(-73.6281, 45.5351, 13)}>Parc Ex./Villeray</div></li>
                    <li><div onClick={() => centerOnMap(-73.5851, 45.5233, 13)}>Plateau</div></li>
                    <li><div onClick={() => centerOnMap(-73.5983, 45.52417, 13)}>Mile End</div></li>
                    <li><div onClick={() => centerOnMap(-73.7435, 45.5743, 12)}>Laval</div></li>
                </ul>
            </nav>
            <Map
                ref={mapRef}
                initialViewState={initialViewportState}
                style={{width: "50vw", height: "80vh"}}
                mapStyle="mapbox://styles/mapbox/streets-v11"
            >
            {shops && shops.map(shop => (
                <Marker 
                    key={shop._id} 
                    longitude={shop.coordinates[0]}
                    latitude={shop.coordinates[1]} 
                    onClick={(e) => {
                        e.originalEvent.stopPropagation();
                        centerOnMap(shop.coordinates[0], shop.coordinates[1], 14);
                        // mapRef.current.easeTo({
                        //     center: [shop.coordinates[0], shop.coordinates[1]],
                        //     zoom: 14,
                        //     speed: 0.2,
                        //     duration: 1000,
                        //     easing(t) {
                        //         return t;
                        //     }
                        // });
                        setSelectedShop(shop);
                    }}
                >
                    <MdOutlineIcecream size={25} fill="red" style={{cursor: "pointer"}}/>
                    {selectedShop && (
                        <Popup 
                            anchor="bottom"
                            longitude={selectedShop.coordinates[0]}
                            latitude={selectedShop.coordinates[1]}
                            onClose={() => {                              
                                setSelectedShop(null);
                                // mapRef.current.easeTo({
                                //     center: [viewport.longitude, viewport.latitude],
                                //     zoom: viewport.zoom,
                                //     speed: 0.2,
                                //     duration: 1000,
                                //     easing(t) {
                                //         return t;
                                //     }
                                // });
                            }}
                        >                            
                            <div style={{display: "flex", gap: "5px", minWidth: "300px"}}>
                                <h3>{selectedShop.name}</h3>
                                <Rating 
                                    size="small" 
                                    value={selectedShop.googleRating} 
                                    precision={0.5} 
                                    readOnly />
                            </div>
                            <div>{selectedShop.address}</div>
                        </Popup>
                    )}
                </Marker>
            ))}
            </Map>
        </MapContainer>

        
        <ShopContainer>
                            
        {!selectedShop ? (
        <>
            <h1>Click a shop for more info</h1>
            <img className="ice-cream-cartoon" src="\images\icecream-shop-cartoon.png" />
        </>
        ) : (
        <>
            <h1>{selectedShop.name}</h1>
            <div>{selectedShop.address}</div>
            <a href={selectedShop.url}>{selectedShop.url}</a>
            <img src={`/images/shops/${selectedShop.imageSrc}`} alt={selectedShop.name} />
        </>
        )}                      
        </ShopContainer>

        </Wrapper>    
  );
}
export default ShopLocations;

const Wrapper = styled.div`
    display: flex;
    margin: 1rem;
`;

const MapContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50vw;
    /* border: 2px solid hotpink; */

    ul {
        display: flex;
        list-style-type: none;
        font-weight: bold;
        margin-bottom: 0.5rem;
        gap: 20px;
    }

    div {
        cursor: pointer;
    }
`;

const ShopContainer = styled.div`
    display: flex;
    width: 50vw;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    /* border: 2px solid green; */

    img {
        width: 40vw;
        max-height: 60vh;
    }

    .ice-cream-cartoon {
        width: 20vw;
    }
`;