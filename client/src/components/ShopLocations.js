import * as React from 'react';
import Map, { Marker } from 'react-map-gl';
import { useState, useEffect } from 'react';
import shops from "./montreal-shops.json";
import {MdOutlineIcecream} from "react-icons/md";

const ShopLocations = () => {
    const [viewport, setViewport] = useState({
        longitude: -73.7004,
        latitude: 45.5336,
        zoom: 10
    });

    return (
        <div>
            <Map
                initialViewState={viewport}
                style={{width: "50vw", height: "80vh"}}
                mapStyle="mapbox://styles/mapbox/streets-v11"
            >
            {shops.features.map(shop => (
                <Marker 
                    key={shop.properties._id} 
                    latitude={shop.geometry.coordinates[1]} 
                    longitude={shop.geometry.coordinates[0]}
                >
                    <MdOutlineIcecream size={25} fill="purple"/>
                </Marker>
            ))}
            </Map>
        </div>
  );
}
export default ShopLocations;