import styles from "./Header.module.css";

const Header = ({ exit }) => {
    return (
        <header className={styles.header}>
            <div className="container">
                <div className={styles.header__inner}>
                    <h1 className={styles.header__title}>
                        Приложение для работы с Яндекс картами
                    </h1>
                    <div className={styles.nav}>
                        Вы вошли, как - {localStorage.getItem("login")}
                        <button onClick={exit} style={{ marginLeft: 15 }}>
                            Выйти
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
