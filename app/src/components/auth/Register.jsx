import axios from "axios";
import React from "react";
// import styles from "../Forms.module.css";

const Register = ({ setPassedAuthorization }) => {
    const hand = (e) => {
        e.preventDefault();

        let logi = document.getElementById("log").value;
        let pas = document.getElementById("pas").value;

        axios
            .post("http://localhost:80/getUserData/", {
                login: logi,
            })
            .then((res) => {
                if (res.data === "empty") {
                    alert("Неверные данные");
                }

                if (
                    JSON.parse(res.data).login === logi &&
                    JSON.parse(res.data).password === pas
                ) {
                    localStorage.setItem("login", logi);
                    localStorage.setItem("password", pas);
                    setPassedAuthorization(true);
                } else {
                    alert("Неверные данные");
                }
            });
    };

    return (
        <div>
            <form>
                <h1>Вход</h1>
                <input type="text" id="log" placeholder="Логин" />
                <input type="password" id="pas" placeholder="Пароль" />

                <div>
                    <button type="submit" onClick={hand}>
                        Войти
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Register;
