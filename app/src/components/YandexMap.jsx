import React from "react";
import { YMaps, Map, Placemark } from "react-yandex-maps";

function YandexMap({ dataPlacemarks, newCoordinates }) {
    const [currentLatitude, setLatitude] = React.useState(false);
    const [currentLongitude, setLongitude] = React.useState(false);

    React.useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
        });
        // 59.9293952;
        // 30.3497216;
    }, []);

    React.useEffect(() => {
        if (newCoordinates) {
            setLatitude(newCoordinates[0]);
            setLongitude(newCoordinates[1]);
        }
    }, [newCoordinates, currentLatitude, currentLongitude]);

    return (
        <>
            {currentLatitude ? (
                <YMaps>
                    <Map
                        state={{
                            center: [+currentLatitude, +currentLongitude],
                            zoom: 9,
                        }}
                    >
                        <Placemark
                            modules={["geoObject.addon.balloon"]}
                            geometry={[currentLatitude, currentLongitude]}
                            properties={{
                                balloonContent:
                                    currentLatitude && "Ваше местоположение",
                            }}
                        />

                        {dataPlacemarks.map((item, index) => (
                            <Placemark
                                key={index}
                                modules={["geoObject.addon.balloon"]}
                                geometry={[item.latitude, item.longitude]}
                                properties={{
                                    balloonContent: item.name,
                                }}
                            />
                        ))}
                    </Map>
                </YMaps>
            ) : (
                "Loading..."
            )}
        </>
    );
}

export default YandexMap;
