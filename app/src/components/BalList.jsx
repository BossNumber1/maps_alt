import React from "react";
import axios from "axios";

function BalList({
    name,
    latitude,
    longitude,
    setNoTags,
    noTags,
    setHidePlm,
    hidePlm,
}) {
    const [show, setShow] = React.useState(false);
    const [nam, setNam] = React.useState(name || "");
    const [shir, setShir] = React.useState(latitude || "");
    const [dol, setDol] = React.useState(longitude || "");

    const upgrade = () => {
        axios
            .post("http://localhost:80/updateBaloon/", {
                id_user: localStorage.getItem("id_user"),
                name: nam,
                oldName: name,
                latitude: shir,
                longitude: dol,
            })
            .then(() => {
                setShow(false);
            });
    };

    const showForm = () => {
        setShow(true);
    };

    const delBal = () => {
        axios
            .post("http://localhost:80/deleteBaloon/", {
                id_user: localStorage.getItem("id_user"),
                name: name,
            })
            .then(() => {
                setHidePlm(true);
                setNoTags("Меток нет");
            });
    };

    const changeNHandler = (e) => {
        e.preventDefault();
        setNam(e.target.value);
    };

    const changeLatHandler = (e) => {
        e.preventDefault();
        setShir(e.target.value);
    };

    const changeLongHandler = (e) => {
        e.preventDefault();
        setDol(e.target.value);
    };

    return (
        <>
            {!hidePlm ? (
                <div style={{ marginBottom: 25 }}>
                    {!noTags && (
                        <>
                            <div style={{ display: "flex", marginBottom: 25 }}>
                                {!show ? (
                                    <>
                                        название {name}
                                        ширина {shir}
                                        долгота {dol}
                                        <form>
                                            <button
                                                onClick={showForm}
                                                style={{ marginLeft: 10 }}
                                            >
                                                Редактировать
                                            </button>
                                            <button
                                                onClick={delBal}
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
                                            value={nam}
                                            onChange={changeNHandler}
                                        />
                                        <input
                                            type="text"
                                            value={shir}
                                            onChange={changeLatHandler}
                                        />
                                        <input
                                            type="text"
                                            value={dol}
                                            onChange={changeLongHandler}
                                        />
                                        <button
                                            onClick={upgrade}
                                            style={{ marginLeft: 10 }}
                                        >
                                            Сохранить
                                        </button>
                                        <button
                                            onClick={delBal}
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

export default BalList;
