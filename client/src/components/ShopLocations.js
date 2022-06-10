// import * as React from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import {MdOutlineIcecream} from "react-icons/md";
import { Rating } from "@mui/material";

const ShopLocations = () => {
    const [shops, setShops] = useState(null);
    const [selectedShop, setSelectedShop] = useState(null);
    const mapRef = useRef(null);

    //make this stateless - regular object
    const [viewport, setViewport] = useState({
        longitude: -73.7004,
        latitude: 45.5336,
        zoom: 10
    });

    //fetching all shops from BE
    useEffect(() => {
        const fetchShops = async () => {
            const data = await fetch("/api/shops");
            const json = await data.json();
            setShops(json.data);
        };
        fetchShops();
    }, []);    

    return (
        <Wrapper>
        <MapContainer>
            <Map
                ref={mapRef}
                initialViewState={viewport}
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
                        mapRef.current.easeTo({
                            center: [shop.coordinates[0], shop.coordinates[1]],
                            zoom: 13,
                            speed: 0.2,
                            duration: 1000,
                            easing(t) {
                                return t;
                            }
                        });
                        setSelectedShop(shop);
                    }}
                >
                    <MdOutlineIcecream size={25} fill="purple" style={{cursor: "pointer"}}/>
                    {selectedShop && (
                        <Popup 
                            anchor="bottom"
                            longitude={selectedShop.coordinates[0]}
                            latitude={selectedShop.coordinates[1]}
                            onClose={() => {                              
                                setSelectedShop(null);
                                mapRef.current.easeTo({
                                    center: [viewport.longitude, viewport.latitude],
                                    zoom: viewport.zoom,
                                    speed: 0.2,
                                    duration: 1000,
                                    easing(t) {
                                        return t;
                                    }
                                });
                            }}
                        >                            
                            <div>
                                <h3>{selectedShop.name}</h3>
                                <Rating 
                                    size="small" 
                                    value={parseFloat(selectedShop.googleRating)} 
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
        {!selectedShop ? <h1>Click a shop for more info</h1> : (
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
`;

const MapContainer = styled.div`
    display: flex;
    width: 50vw;
    border: 2px solid hotpink;
`;

const ShopContainer = styled.div`
    display: flex;
    width: 50vw;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border: 2px solid green;

    img {
        width: 400px;
    }
`;