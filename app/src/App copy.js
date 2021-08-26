import React from "react";
import "./App.css";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import axios from "axios";

function App() {
    const [shir, setShir] = React.useState(false);
    const [dol, setDol] = React.useState(false);

    const [up, setUp] = React.useState(false);

    const coordinates = [
        [55.684758, 37.738521],
        [57.684758, 39.738522],
    ];

    React.useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setShir(position.coords.latitude);
            setDol(position.coords.longitude);
        });

        axios
            .post("http://localhost:80/getUserData/", {
                login: "loginchik444",
            })
            .then((res) => {
                if (res.data === "out") {
                    axios
                        .post("http://localhost:80/auth/", {
                            login: "loginchik444",
                            password: "123",
                        })
                        .then((resus) => {
                            if (resus.data === "Пользователь - в базе") {
                                alert("Вы зареганы"); // чел зареган
                            }
                        });
                } else {
                    let id_user = JSON.parse(res.data).id;

                    axios
                        .post("http://localhost:80/getBaloons/", {
                            id_user: id_user,
                        })
                        .then((resultat) => {
                            let name = JSON.parse(resultat.data)[0].name;

                            if (name === "first") {
                                axios
                                    .post("http://localhost:80/updateBaloon/", {
                                        id_user: id_user,
                                        name: "first",
                                        coordinats: JSON.stringify(coordinates),
                                    })
                                    .then((resus) => {
                                        alert(resus.data);
                                    });
                            } else {
                                axios
                                    .post("http://localhost:80/saveBaloon/", {
                                        id_user: id_user,
                                        name: "first",
                                        coordinats: JSON.stringify(coordinates),
                                    })
                                    .then((resus) => {
                                        alert(resus.data);
                                    });
                            }
                        });
                }
            });

        //  axios.post("http://localhost:80/addCoorBaloon/", {
        //      id_user:
        //      name: "first location",
        //      geometry1: [56.848217, 53.236675],
        //     //  });
        // });
    }, []);

    //const mapState = { center: [56.85, 53.2], zoom: 12 };
    // const placeMark = {
    //     geometry: [56.848217, 53.236675],
    //     properties: {
    //         hintContent: 'Это хинт',
    //         balloonContent: 'Это балун'
    //     },
    //     modules: {
    //         ['geoObject.addon.balloon', 'geoObject.addon.hint']
    //     }
    // }

 React.useEffect(() => {
     const upg = () => {
        setUp("true")

         axios
             .post("http://localhost:80/updateBaloon/", {
                 id_user: id_user,
                 name: "first",
                 coordinats: JSON.stringify(coordinates),
             })
             .then((resus) => {
                 alert(resus.data);
             });
     }
 }, [])

    return (
        <div className="App">
            привеееет
            <button onClick={() => setUp("true")}>Обновить</button>
            {shir ? (
                <YMaps>
                    <Map defaultState={{ center: [shir, dol], zoom: 9 }}>
                        {/* // <Placemark {...placeMark} /> */}
                        {/* <Placemark
                            geometry={[shir, dol]}
                            options={{
                                balloonContentLayout: "this.state.template",
                            }}
                        /> */}
                        <Placemark
                            modules={["geoObject.addon.balloon"]}
                            geometry={[shir, dol]}
                            properties={{
                                balloonContent: "Название локации из списка",
                            }}
                        />
                    </Map>
                </YMaps>
            ) : (
                "Loading..."
            )}
        </div>
    );
}

export default App;

//  <YMaps>
//                     // <Map defaultState={{ center: [shir, dol], zoom: 9 }}>

//                         // {coordinates.map((coordinate) => (
//                     //         // <Placemark key={0} geometry={coordinate} />
//                     //         <Placemark key={0} geometry={[shir, dol]} />
//                     //     ))}
//                     // </Map>
//                     <Map state={mapState}>
//                     // <Placemark {...placeMark} />

//                     <Placemark
//               geometry={[0, 0]}
//               options={{ balloonContentLayout: "this.state.template" }}
//             />
//                 </Map>
//                 </YMaps>
