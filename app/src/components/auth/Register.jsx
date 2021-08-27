import axios from "axios";
import React from "react";
// import styles from "../Forms.module.css";

const Register = ({ setPassedAuthorization }) => {
    const authHandler = (e) => {
        e.preventDefault();

        let login = document.getElementById("loginForRegistration").value;
        let password = document.getElementById("passwordForRegistration").value;

        axios
            .post("http://localhost:80/getUserData/", {
                login: login,
            })
            .then((resultat) => {
                if (resultat.data === "empty") {
                    alert("Неверные данные");
                }

                if (
                    JSON.parse(resultat.data).login === login &&
                    JSON.parse(resultat.data).password === password
                ) {
                    localStorage.setItem("login", login);
                    localStorage.setItem("password", password);
                    setPassedAuthorization(true);
                    localStorage.removeItem("exited");
                } else {
                    alert("Неверные данные");
                }
            });
    };

    return (
        <div>
            <form>
                <h1>Вход</h1>
                <input
                    type="text"
                    id="loginForRegistration"
                    placeholder="Логин"
                />
                <input
                    type="password"
                    id="passwordForRegistration"
                    placeholder="Пароль"
                />
                <div>
                    <button type="submit" onClick={authHandler}>
                        Войти
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Register;
