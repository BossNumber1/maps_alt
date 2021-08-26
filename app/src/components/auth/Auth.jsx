import React from "react";
import axios from "axios";

function Auth({ setGoodAuth }) {
    React.useEffect(() => {
        if (localStorage.getItem("login") && localStorage.getItem("id_user")) {
            setGoodAuth(true);
        }
    }, [setGoodAuth]);

    const submitHandler = (e) => {
        e.preventDefault();

        let login = document.getElementById("login").value;
        let password = document.getElementById("password").value;

        axios
            .post("http://localhost:80/getUserData/", {
                login: login,
            })
            .then((res) => {
                if (res.data === "out") {
                    axios
                        .post("http://localhost:80/auth/", {
                            login: login,
                            password: password,
                        })
                        .then((resus) => {
                            debugger;
                            if (resus.data === "true") {
                                debugger;
                                alert("Вы зареганы");

                                localStorage.setItem("login", login);
                                localStorage.setItem("password", password);

                                axios
                                    .post("http://localhost:80/getUserData/", {
                                        login: localStorage.getItem("login"),
                                    })
                                    .then((res) => {
                                        if (res.data !== "out") {
                                            let id_user = JSON.parse(
                                                res.data
                                            ).id;

                                            localStorage.setItem(
                                                "id_user",
                                                id_user
                                            );

                                            setGoodAuth(true);
                                        }
                                    });
                            }
                        });
                }
            });
    };

    return (
        <>
            <h1>Регистрация</h1>

            <form>
                <div>
                    <input type="text" id="login" placeholder="Логин" />
                </div>
                <div>
                    <input type="password" id="password" placeholder="Пароль" />
                </div>
                <p>
                    <input
                        type="submit"
                        value="Зарегаться"
                        onClick={submitHandler}
                    />
                </p>
            </form>
        </>
    );
}

export default Auth;
