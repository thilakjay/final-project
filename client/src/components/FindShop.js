import { useState, useEffect, useRef, createRef } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { Rating } from "@mui/material";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "mapbox-gl/dist/mapbox-gl.css";
import geoJSON from "./montreal-shops.json";
import {MdOutlineIcecream} from "react-icons/md";

// import ReactMapGL, {Map, FullScreenControl} from "react-map-gl";

mapboxgl.accessToken = "pk.eyJ1IjoidGhpamF5IiwiYSI6ImNsNDVyZzdtMjAxZTgzYm1peTEzY24weGkifQ.9imSKNd-h85fxJYWEAPPqw";

const Marker = ({onClick, children, feature}) => {
    const _onClick = (e) => {
        onClick(feature.properties);
    };

    return (
        <MdOutlineIcecream size={25} fill="hotpink" onClick={_onClick} style={{cursor: "pointer"}}>
            {children}
        </MdOutlineIcecream>
    );
}

const FindShop = () => {
    const [shops, setShops] = useState(null);
    const [selectedShop, setSelectedShop] = useState(null);
    const mapContainerRef = useRef(null);
    // const map = useRef(null);
    const [lng, setLng] = useState(-73.5673);
    const [lat, setLat] = useState(45.5017);
    const [zoom, setZoom] = useState(10);

    //fetching all shops from BE
    useEffect(() => {
        const fetchShops = async () => {
        const data = await fetch("/api/shops");
        const json = await data.json();
        setShops(json.data);
        };
        fetchShops();
    }, []);

    useEffect(() => {
        // if(map.current) return;
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        });

        // create default markers
        geoJSON.features.map(feature => {     
            // create a react ref for each marker
            const ref = createRef();

            //create a mew DOM node amd save it to the ref
            ref.current = document.createElement("div");

            // render a Marker component on our new DOM node
            ReactDOM.render(
                <Marker onClick={markerClicked} feature={feature} />, 
                ref.current
            );  
            //create a marker and popup at new DOM node    
            new mapboxgl.Marker(ref.current)
                .setLngLat(feature.geometry.coordinates)
                .setPopup(
                    new mapboxgl.Popup({offset: 25})
                    .setHTML(`
                            <h3>${feature.properties.name}</h3>
                            <p>${feature.properties.address}</p>`
                    )
                )
                .addTo(map)
        });
        return () => map.remove();
    }, []);

    const markerClicked = (shop) => {
        // window.alert(shop.name);
        setSelectedShop(shop);
    }

  return (
    <>  
        {selectedShop && (
         <Wrapper>
            <div ref={mapContainerRef} className="map-container" />
            <div className="shop-container">
                <div>{selectedShop.name}</div>
                <div>{selectedShop.address}</div>
                <div>{selectedShop.url}</div>
                <div>{selectedShop.googleRating}</div>
                <div>{selectedShop.fbRating}</div>
            </div>
        </Wrapper>             
        )}
    </>         
  );
}
export default FindShop;

const Wrapper = styled.div`
    display: flex;
    width: 100%;
    height: 100%;

    .map-container {
        width: 50vw;
        height: 75vh;
        z-index: 0;
        border: 2px solid hotpink;
    }

    .shop-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 50vw;
        height: 75vh;
        z-index: 0;
        border: 2px solid blue;
    }

`;

const Button = styled.button`  
        /* background-image: url('cone.png');
        background-size: cover;
        width: 10px;
        height: 10px;
        /* border-radius: 50%; */
        /* cursor: pointer;
        z-index: 5; */ 

`;
