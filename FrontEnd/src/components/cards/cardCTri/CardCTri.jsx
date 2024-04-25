import React, { useState } from "react";
import styles from "./CardCTri.module.css";
import ProgressBar from "../../progress/ProgressBar";

const CardCTri = ({ nome, lider, time, cargHora, img }) => {
	const [progressoTrilha, setProgressoTrilha] = useState(0);

	const atualizarProgresso = (novoProgresso) => {
		setProgressoTrilha(novoProgresso);
	};

	const color = localStorage.getItem('color')

	return (
		<div className={styles.contTri} style={{ backgroundColor: color }}>
			<div className={styles.imgMask}>
				<img src={img} />
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
						<button className={styles.bt} style={{ color: color }}>Visualizar</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CardCTri;
