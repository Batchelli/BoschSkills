import React from "react";
import styles from "./CardsCad.module.css";
import { useNavigate } from "react-router-dom";

const CardsCad = ({ title, desc, icon, color, descI, path}) => {
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

	const btCad = () => {
		navigate(`/${path}`)
	}


	return (
		<div className={styles.card}>
			<div className={styles.cardImg}>
				<img src={icon} alt="Card Img"  id={`${cor}`}/>
			</div>
			<div className={styles.title}>
				<h1>{title}</h1>
			</div>
			<div className={styles.desc}>
				<p>{desc}</p> 
				<p className={styles.warn}>{descI}</p> 
			</div>
      <div className={styles.bts}>
        <button className={styles.bt} onClick={btCad}>Entrar</button>
      </div>
		</div>
	);
};

export default CardsCad;
