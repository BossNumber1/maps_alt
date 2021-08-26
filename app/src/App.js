import React from "react";
import "./App.css";
import Adder from "./components/Adder";
import Auth from "./components/auth/Auth";
import BalList from "./components/BalList";
import Mapper from "./components/Mapper";
import axios from "axios";

function App() {
    const [noTags, setNoTags] = React.useState(false);
    const [goodAuth, setGoodAuth] = React.useState(false);
    const [placemarker, setPlacemarker] = React.useState([]);
    const [hidePlm, setHidePlm] = React.useState(false);

    React.useEffect(() => {
        if (goodAuth) {
            getBal();
        }
    }, [goodAuth]);

    const getBal = () => {
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
                    setNoTags("Меток нет");
                }
            });
    };

    return (
        <div className="App">
            {!goodAuth ? (
                <Auth setGoodAuth={setGoodAuth} />
            ) : (
                <>
                    <div style={{ marginBottom: 25 }}>
                        <h3>Вы вошли, как - {localStorage.getItem("login")}</h3>
                    </div>

                    <Adder
                        setNoTags={setNoTags}
                        setPlacemarker={setPlacemarker}
                        placemarker={placemarker}
                    />

                    <div style={{ marginBottom: 25 }}>
                        {noTags
                            ? noTags
                            : placemarker.map((item, index) => (
                                  <BalList
                                      key={index}
                                      name={item.name}
                                      latitude={item.latitude}
                                      longitude={item.longitude}
                                      setNoTags={setNoTags}
                                      noTags={noTags}
                                      setHidePlm={setHidePlm}
                                      hidePlm={hidePlm}
                                  />
                              ))}
                    </div>

                    <Mapper placemarker={placemarker} />
                </>
            )}
        </div>
    );
}

export default App;
