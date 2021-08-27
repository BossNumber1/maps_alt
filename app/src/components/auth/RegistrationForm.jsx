import React from "react";
import axios from "axios";
import LoginForm from "./LoginForm";

function RegistrationForm({ setPassedAuthorization }) {
    const [showAuth, setShowAuth] = React.useState(false);

    React.useEffect(() => {
        if (localStorage.getItem("login") && localStorage.getItem("password")) {
            setPassedAuthorization(true);
        } else {
            if (localStorage.getItem("exited") === "true") {
                setShowAuth(true);
            }
        }
    }, [setPassedAuthorization]);

    const submitHandler = (e) => {
        e.preventDefault();

        let login = document.getElementById("login").value;
        let password = document.getElementById("password").value;

        axios
            .post("http://localhost:80/getUserData/", {
                login: login,
            })
            .then((resultat) => {
                if (resultat.data === "empty") {
                    axios
                        .post("http://localhost:80/auth/", {
                            login: login,
                            password: password,
                        })
                        .then((resultat) => {
                            if (resultat.data === "true") {
                                axios
                                    .post("http://localhost:80/getUserData/", {
                                        login: login,
                                    })
                                    .then((resultat) => {
                                        if (resultat.data !== "empty") {
                                            let id_user = JSON.parse(
                                                resultat.data
                                            ).id;

                                            localStorage.setItem(
                                                "id_user",
                                                id_user
                                            );

                                            setShowAuth(true);
                                        }
                                    });
                            }
                        });
                }
            });
    };

    return (
        <>
            {!showAuth ? (
                <>
                    <h1>Регистрация</h1>
                    <p>В данном приложении можно сохранять места на карте.</p>
                    <form>
                        <div>
                            <input type="text" id="login" placeholder="Логин" />
                        </div>
                        <div>
                            <input
                                type="password"
                                id="password"
                                placeholder="Пароль"
                            />
                        </div>
                        <p>
                            <input
                                type="submit"
                                value="Зарегистрироваться"
                                onClick={submitHandler}
                            />
                        </p>
                    </form>
                </>
            ) : (
                <LoginForm setPassedAuthorization={setPassedAuthorization} />
            )}
        </>
    );
}

export default RegistrationForm;
