import React from "react";
import { YMaps, Map, Placemark } from "react-yandex-maps";

function Mapper({ placemarker }) {
    const [currentLatitude, setLatitude] = React.useState(false);
    const [currentLongitude, setLongitude] = React.useState(false);

    React.useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
            debugger;
        });
        // 59.9293952;
        // 30.3497216;
    }, []);

    return (
        <>
            {currentLatitude ? (
                <YMaps>
                    <Map
                        defaultState={{
                            center: [currentLatitude, currentLongitude],
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

                        {placemarker.map((item, index) => (
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

export default Mapper;
