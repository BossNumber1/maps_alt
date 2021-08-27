import axios from "axios";
import React from "react";
import styles from "../../styles/Forms.module.css";

const LoginForm = ({ setPassedAuthorization }) => {
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
                    localStorage.removeItem("exited");
                    setPassedAuthorization(true);
                } else {
                    alert("Неверные данные");
                }
            });
    };

    return (
        <div>
            <form className={styles.main_form}>
                <h1 className={styles.title}>Вход</h1>
                <input
                    type="text"
                    id="loginForRegistration"
                    placeholder="Логин"
                    className={styles.input}
                />
                <input
                    type="password"
                    id="passwordForRegistration"
                    placeholder="Пароль"
                    className={styles.input}
                />
                <div className={styles.btn_div}>
                    <button
                        type="submit"
                        onClick={authHandler}
                        className={styles.btn}
                    >
                        Войти
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
