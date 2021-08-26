import React from "react";
import axios from "axios";

function Adder({ setNoTags, setPlacemarker, placemarker }) {
    const createBal = (e) => {
        e.preventDefault();

        let nameAdder = document.getElementById("nameAdder").value;
        let latitudeAdder = document.getElementById("latitudeAdder").value;
        let longitudeAdder = document.getElementById("longitudeAdder").value;

        localStorage.setItem("nameAdder", nameAdder);

        let id_user = localStorage.getItem("id_user");
        debugger;
        axios
            .post("http://localhost:80/saveBaloon/", {
                id_user: id_user,
                name: nameAdder,
                latitude: latitudeAdder,
                longitude: longitudeAdder,
            })
            .then(() => {
                debugger;
                setNoTags(false);

                document.getElementById("nameAdder").value = "";
                document.getElementById("latitudeAdder").value = "";
                document.getElementById("longitudeAdder").value = "";

                const initialValue = [
                    {
                        name: nameAdder,
                        latitude: latitudeAdder,
                        longitude: longitudeAdder,
                    },
                ];

                debugger;

                if (placemarker.length > 0) {
                    setPlacemarker([...placemarker, initialValue[0]]);
                } else {
                    setPlacemarker(initialValue);
                }
            });

        debugger;
    };

    return (
        <div style={{ marginBottom: 25 }}>
            <form>
                <input type="text" id="nameAdder" placeholder="Имя" />
                <input type="text" id="latitudeAdder" placeholder="Ширина" />
                <input type="text" id="longitudeAdder" placeholder="Долгота" />
                <button onClick={createBal} style={{ marginLeft: 10 }}>
                    Добавить
                </button>
            </form>
        </div>
    );
}

export default Adder;
