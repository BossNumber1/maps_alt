import React from "react";
import axios from "axios";

function AddPlacemark({ setNoPlacemarks, setPlacemarker, dataPlacemarks }) {
    const createPlacemark = (e) => {
        e.preventDefault();

        let nameToAdd = document.getElementById("nameToAdd").value;
        let latitudeToAdd = document.getElementById("latitudeToAdd").value;
        let longitudeToAdd = document.getElementById("longitudeToAdd").value;

        // localStorage.setItem("nameToAdd", nameToAdd);

        let id_user = localStorage.getItem("id_user");

        axios
            .post("http://localhost:80/createPlacemark/", {
                id_user: id_user,
                name: nameToAdd,
                latitude: latitudeToAdd,
                longitude: longitudeToAdd,
            })
            .then(() => {
                setNoPlacemarks(false);

                document.getElementById("nameToAdd").value = "";
                document.getElementById("latitudeToAdd").value = "";
                document.getElementById("longitudeToAdd").value = "";

                const initialValue = [
                    {
                        name: nameToAdd,
                        latitude: latitudeToAdd,
                        longitude: longitudeToAdd,
                    },
                ];

                if (dataPlacemarks.length > 0) {
                    setPlacemarker([...dataPlacemarks, initialValue[0]]);
                } else {
                    setPlacemarker(initialValue);
                }
            });
    };

    return (
        <div style={{ marginBottom: 25 }}>
            <form>
                <input type="text" id="nameToAdd" placeholder="Название" />
                <input type="text" id="latitudeToAdd" placeholder="Ширина" />
                <input type="text" id="longitudeToAdd" placeholder="Долгота" />
                <button onClick={createPlacemark} style={{ marginLeft: 10 }}>
                    Добавить
                </button>
            </form>
        </div>
    );
}

export default AddPlacemark;
