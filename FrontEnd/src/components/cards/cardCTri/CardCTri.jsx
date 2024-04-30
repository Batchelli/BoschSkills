import React, { useState } from "react";
import styles from "./CardCTri.module.css";
import { useNavigate } from "react-router-dom";

const CardCTri = ({ nome, lider, img, url }) => {
    const [progressoTrilha, setProgressoTrilha] = useState(0);

    const color = localStorage.getItem('color')
    const navigate = useNavigate()

    const tri = () => {
        console.log("Botão de visualizar clicado!");
        console.log("Redirecionando para:", url);
        navigate(url);
    }

    return (
        <div className={styles.contTri} style={{ backgroundColor: color }}>
            <div className={styles.imgMask}>
                <img src={img} alt={nome} />
            </div>
            <div className={styles.details}>
                <div className={styles.front}>
                    <div className={styles.infosF}>
                        <h1>{nome}</h1>
                        <p>Lider: {lider}</p>
                    </div>
                </div>
                <div className={styles.back}>
                    <div className={styles.infosB}>
                        <h1>{nome}</h1>
                    </div>
                    <div className={styles.contmib}>
                        <button className={styles.bt} style={{ color: color }} onClick={tri}>Visualizar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardCTri;
