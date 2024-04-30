import React from "react";
import styles from "./Dbt.module.css";
import { useNavigate } from "react-router-dom";

const Dbt = ({ title, desc, icon, color, descI, path, desc1, desc2, p1, p2, nbt1, nbt2 }) => {
    let cor;
    if (color === "blue") {
        cor = styles.blue;
    } else if (color === "green") {
        cor = styles.green;
    } else if (color === "pink") {
        cor = styles.pink;
    } else {
        cor = "";
    }

    const navigate = useNavigate();

    const l1 = () => {
        navigate(`/${p1}`)
    }

    const l2 = () => {
        navigate(`/${p2}`)
    }


    return (
        <div className={styles.card}>
            <div className={styles.cardImg}>
                <img src={icon} alt="Card Img" id={`${cor}`} />
            </div>
            <div className={styles.title}>
                <h1>{title}</h1>
            </div>
            <div className={styles.desc}>
                <p>{desc}</p>
                <p className={styles.warn}>{descI}</p>
            </div>
            <div className={styles.bts}>
                <button className={styles.bt} onClick={l1}>{nbt1}</button>
                <p>{desc1}</p>
                <button className={styles.bt} onClick={l2}>{nbt2}</button>
                <p>{desc2}</p>
            </div>
        </div>
    );
};

export default Dbt
