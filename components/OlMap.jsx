import React, { useRef } from 'react';

// Styles
import styles from "../styles/OlMap.module.css";

// Helpers
import { useEffectOnce } from "../helpers/helpers";

// Ol
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';


export default function OlMap()
{
    const mapRef = useRef();;

    useEffectOnce(() =>
    {
        new Map({
            target: mapRef.current,
            layers: [
                new TileLayer({
                    source: new OSM(),
                }),
            ],
            view: new View({
                center: [0, 0],
                zoom: 0,
            }),
        });
    }, []);

    return (
        <div className={styles.map_container}>
            <h1>Karte:</h1>
            <div ref={mapRef} className={styles.map} />
        </div>
    );
}