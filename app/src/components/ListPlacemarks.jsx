import React from "react";
import axios from "axios";

function ListPlacemarks({
    name,
    latitude,
    longitude,
    setNoPlacemarks,
    noPlacemarks,
    setHidePlacemarker,
    hidePlacemarker,
    setNewCoordinates,
}) {
    const [edit, setEdit] = React.useState(false);
    const [namePlacemarkSpecific, setNamePlacemarkSpecific] = React.useState(
        name || ""
    );
    const [latitudePlacemarkSpecific, setLatitudePlacemarkSpecific] =
        React.useState(latitude || "");
    const [longitudePlacemarkSpecific, setLongitudePlacemarkSpecific] =
        React.useState(longitude || "");

    const updateBaloon = () => {
        axios
            .post("http://localhost:80/updateBaloon/", {
                id_user: localStorage.getItem("id_user"),
                name: namePlacemarkSpecific,
                oldName: name,
                latitude: latitudePlacemarkSpecific,
                longitude: longitudePlacemarkSpecific,
            })
            .then(() => {
                setEdit(false);
            });
    };

    const showEditForm = () => {
        setEdit(true);
    };

    const deleteBaloon = () => {
        axios
            .post("http://localhost:80/deleteBaloon/", {
                id_user: localStorage.getItem("id_user"),
                name: name,
            })
            .then(() => {
                setHidePlacemarker(true);
                setNoPlacemarks("Меток нет");
            });
    };

    const changeNHandler = (e) => {
        e.preventDefault();
        setNamePlacemarkSpecific(e.target.value);
    };

    const changeLatHandler = (e) => {
        e.preventDefault();
        setLatitudePlacemarkSpecific(e.target.value);
    };

    const changeLongHandler = (e) => {
        e.preventDefault();
        setLongitudePlacemarkSpecific(e.target.value);
    };

    return (
        <>
            {!hidePlacemarker ? (
                <div style={{ marginBottom: 25 }}>
                    {!noPlacemarks && (
                        <>
                            <div style={{ display: "flex", marginBottom: 25 }}>
                                {!edit ? (
                                    <>
                                        <div
                                            onClick={() =>
                                                setNewCoordinates([
                                                    latitudePlacemarkSpecific,
                                                    longitudePlacemarkSpecific,
                                                ])
                                            }
                                            className="placemark"
                                        >
                                            <div>
                                                <b>Название</b>: {name}
                                            </div>
                                            <div>
                                                <b>Ширина</b>:{" "}
                                                {latitudePlacemarkSpecific}
                                            </div>
                                            <div>
                                                <b>Долгота</b>:{" "}
                                                {longitudePlacemarkSpecific}
                                            </div>
                                        </div>
                                        <form>
                                            <button
                                                onClick={showEditForm}
                                                style={{ marginLeft: 10 }}
                                            >
                                                Редактировать
                                            </button>
                                            <button
                                                onClick={deleteBaloon}
                                                style={{ marginLeft: 10 }}
                                            >
                                                Удалить
                                            </button>
                                        </form>
                                    </>
                                ) : (
                                    <form>
                                        <input
                                            type="text"
                                            value={namePlacemarkSpecific}
                                            onChange={changeNHandler}
                                        />
                                        <input
                                            type="text"
                                            value={latitudePlacemarkSpecific}
                                            onChange={changeLatHandler}
                                        />
                                        <input
                                            type="text"
                                            value={longitudePlacemarkSpecific}
                                            onChange={changeLongHandler}
                                        />
                                        <button
                                            onClick={updateBaloon}
                                            style={{ marginLeft: 10 }}
                                        >
                                            Сохранить
                                        </button>
                                        <button
                                            onClick={deleteBaloon}
                                            style={{ marginLeft: 10 }}
                                        >
                                            Удалить
                                        </button>
                                    </form>
                                )}
                            </div>
                        </>
                    )}
                </div>
            ) : (
                "метка удалена"
            )}
        </>
    );
}

export default ListPlacemarks;
