import React from "react";
import "./App.css";
import AddPlacemark from "./components/AddPlacemark";
import Auth from "./components/auth/Auth";
import ListPlacemarks from "./components/ListPlacemarks";
import YandexMap from "./components/YandexMap";
import axios from "axios";

function App() {
    const [noPlacemarks, setNoPlacemarks] = React.useState(false);
    const [passedAuthorization, setPassedAuthorization] = React.useState(false);
    const [dataPlacemarks, setPlacemarker] = React.useState([]);
    const [hidePlacemarker, setHidePlacemarker] = React.useState(false);
    const [newCoordinates, setNewCoordinates] = React.useState(false);

    React.useEffect(() => {
        if (passedAuthorization) {
            getBaloons();
        }
    }, [passedAuthorization]);

    const getBaloons = () => {
        let id_user = localStorage.getItem("id_user");

        axios
            .post("http://localhost:80/getBaloons/", {
                id_user: id_user,
            })
            .then((resultat) => {
                if (resultat.data !== "[]") {
                    let dataFromServer = JSON.parse(resultat.data);

                    const initialValue = [];

                    for (let i = 0; i < dataFromServer.length; i++) {
                        initialValue.push({
                            id: i,
                            name: dataFromServer[i].name,
                            latitude: dataFromServer[i].latitude,
                            longitude: dataFromServer[i].longitude,
                        });
                    }

                    setPlacemarker(initialValue);
                } else {
                    setNoPlacemarks("Меток нет");
                }
            });
    };

    return (
        <div className="App">
            {!passedAuthorization ? (
                <Auth setPassedAuthorization={setPassedAuthorization} />
            ) : (
                <div style={{ display: "flex" }}>
                    <div style={{ float: "left" }}>
                        <div style={{ marginBottom: 25 }}>
                            <h3>
                                Вы вошли, как - {localStorage.getItem("login")}
                            </h3>
                        </div>

                        <AddPlacemark
                            setNoPlacemarks={setNoPlacemarks}
                            setPlacemarker={setPlacemarker}
                            dataPlacemarks={dataPlacemarks}
                        />

                        <div style={{ marginBottom: 25 }}>
                            {noPlacemarks
                                ? noPlacemarks
                                : dataPlacemarks.map((item, index) => (
                                      <ListPlacemarks
                                          key={index}
                                          name={item.name}
                                          latitude={item.latitude}
                                          longitude={item.longitude}
                                          setNoPlacemarks={setNoPlacemarks}
                                          noPlacemarks={noPlacemarks}
                                          setHidePlacemarker={
                                              setHidePlacemarker
                                          }
                                          hidePlacemarker={hidePlacemarker}
                                          setNewCoordinates={setNewCoordinates}
                                      />
                                  ))}
                        </div>
                    </div>
                    <div style={{ float: "right" }}>
                        <YandexMap
                            dataPlacemarks={dataPlacemarks}
                            newCoordinates={newCoordinates}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
