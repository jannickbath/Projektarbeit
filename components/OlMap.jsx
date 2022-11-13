import React, { useRef, useState } from 'react';

// Styles
import styles from "../styles/OlMap.module.css";

// Helpers
import { useEffectOnce } from "../helpers/helpers";

// Ol
import * as olProj from 'ol/proj';

import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import
{
    Circle as CircleStyle,
    Fill,
    Icon,
    Stroke,
    Style,
    Text
} from 'ol/style';

import { Map, View, Feature } from 'ol';
import OSM from 'ol/source/OSM';

export default function OlMap(props)
{
    const mapRef = useRef();
    const data = props.data;
    const locationCoords = olProj.fromLonLat(data.location.coordinates);

    const [map, setMap] = useState();

    /**
     * Marks a specific location
     * @param {array<Number>} coordinates Coordinates to mark
     * @param {string} label Text to show over marker
     * @return {void} void
     */
    function mark(coordinates, label, mapRef = null)
    {

        // Convert lat-longitude to ol format
        coordinates = olProj.fromLonLat(coordinates);

        /**
         * Outline of object (kind of border)
         */
        const defaultStroke = new Stroke({
            color: "white",
            width: 2
        });

        const defaultFill = new Fill({
            color: "black"
        });

        // Styles
        const styles = {
            'geoMarker': new Style({
                text: new Text({
                    text: label,
                    font: '18px Calibri,sans-serif',
                    overflow: true,
                    fill: defaultFill,
                    stroke: defaultStroke,
                    offsetY: -12
                }),
                image: new CircleStyle({
                    radius: 7,
                    fill: defaultFill,
                    stroke: defaultStroke
                }),
            }),
        };

        // styles.geoMarker.getText().setText(label);

        const geoMarker = new Feature({
            type: 'geoMarker',
            geometry: new Point(coordinates)
        });

        const vectorLayer = new VectorLayer({
            source: new VectorSource({
                features: [geoMarker],
            }),
            style: function (feature)
            {
                return styles[feature.get('type')];
            },
        });

        mapRef ?
            mapRef.addLayer(vectorLayer)
            :
            map.addLayer(vectorLayer);
    }

    useEffectOnce(() =>
    {
        const mapInstance = new Map({
            target: mapRef.current,
            layers: [
                new TileLayer({
                    source: new OSM(),
                }),
            ],
            view: new View({
                center: locationCoords,
                zoom: 12,
            }),
        });

        // Add a marker for each hotel
        data.hotels.forEach(hotel =>
        {
            mark(hotel["coordinates"], hotel["name"], mapInstance);
        });

        setMap(mapInstance);

    }, []);

    return (
        <>
            <div className={styles.map_container}>
                <h1>Karte:</h1>
                <div ref={mapRef} className={styles.map} />
            </div>
            <button onClick={() => mark(data.hotels[0]["coordinates"], data.hotels[0]["name"])}>Add marker</button>
        </>
    );
}