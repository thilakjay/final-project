import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "mapbox-gl/dist/mapbox-gl.css";
import geoJSON from "./montreal-shops.json";

// import ReactMapGL, {Map, FullScreenControl} from "react-map-gl";

mapboxgl.accessToken = "pk.eyJ1IjoidGhpamF5IiwiYSI6ImNsNDVyZzdtMjAxZTgzYm1peTEzY24weGkifQ.9imSKNd-h85fxJYWEAPPqw";

const FindShop = () => {
    const [shops, setShops] = useState(null);
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
            new mapboxgl.Marker().setLngLat(feature.geometry.coordinates).addTo(map)
        });

        return () => map.remove();
    }, []);





  return (
      <Wrapper>
          <div ref={mapContainerRef} className="map-container" />
      </Wrapper>    
  );
}
export default FindShop;

const Wrapper = styled.div`

    width: 100%;
    height: 100%;

    .map-container {
        /* width: 500px; */
        height: 75vh;
    }
`;
