import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, GeoJSON, useMapEvents, Polyline } from "react-leaflet";
import axios from "axios";

const LocationMarker = ({ addMarker }) => {
    useMapEvents({
        click(e) {
            addMarker(e.latlng);
        },
    });
    return null;
};

const getColor = (eemi_grade) => {

    // console.log(eemi_grade);
    if (eemi_grade >= 1 && eemi_grade < 1.5) return "blue";
    if (eemi_grade >= 1.5 && eemi_grade < 2.5) return "lightgreen";
    if (eemi_grade >= 2.5 && eemi_grade < 3.5) return "darkgreen";
    if (eemi_grade >= 3.5 && eemi_grade < 4.5) return "yellow";
    if (eemi_grade >= 4.5 && eemi_grade <= 5) return "red";
    return "gray"; // Default color
};

const styleFeature = (feature) => {
    // const eemi = feature.properties.eemi; // Assuming `eemi` is a property in your GeoJSON
    return {
        color: getColor(eemi),
        weight: 2,
        opacity: 1,
        fillOpacity: 0.7,
    };
};

// const DropdownEemi = ({ onChange }) => {
//     return (
//       <select onChange={(e) => onChange(e.target.value)}>
//         {evaluations.map((eval) => (
//           <option key={eval} value={eval}>
//             {eval}
//           </option>
//         ))}
//       </select>
//     );
//   };


const MapLayout = ({ selectedEemiGrade }) => {
    let initKey = 0;
    const [geoData, setGeoData] = useState(0);
    const [polyLineMarkers, setPolyLineMarkers] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("http://localhost:5000/roads"); // Ensure json-server is running
                if (res.data && res.data.type === "FeatureCollection") {
                    setGeoData(res.data.features); // Set GeoJSON correctly

                    setPolyLineMarkers((res.data.features).map(feature => {
                        const arrayPolyLine = [];
                        const lineCoordinateArray = feature.geometry.coordinates.map(coordinate => (coordinate.reverse()))
                        arrayPolyLine.push(lineCoordinateArray)

                        // console.log ([{"eemiGrade": feature.properties.eemi_grade,"color": feature.properties && getColor(feature.properties.eemi_grade.selectedEemiGrade) ,"coordinates": arrayPolyLine}]);
                        return [{ "eemiGrade": feature.properties.eemi_grade, "color": feature.properties.eemi_grade && getColor(feature.properties.eemi_grade[selectedEemiGrade]), "coordinates": arrayPolyLine }];
                    }))
                } else {
                    console.error("Invalid GeoJSON format:", res.data);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        console.log(selectedEemiGrade);
        fetchData();
    }, [selectedEemiGrade]);


    return (
        <MapContainer id="mapContainer" center={[50.04843529944133, 10.2353326]} zoom={13} >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {/* {geoData && <GeoJSON data={geoData} style={geoData} />} */}

            {polyLineMarkers &&
                polyLineMarkers.map(lineElement => (
                    <Polyline key={initKey++} pathOptions={{ color: lineElement[0].color, weight: 3 }} positions={lineElement[0].coordinates} />
                ))
            }
        </MapContainer>
    );

};

export default MapLayout;