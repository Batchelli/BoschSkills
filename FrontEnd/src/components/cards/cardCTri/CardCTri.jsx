import React, { useState } from "react";
import styles from "./CardCTri.module.css";
import ProgressBar from "../../progress/ProgressBar";

const CardCTri = ({ nome, lider, time, cargHora }) => {
	const [progressoTrilha, setProgressoTrilha] = useState(0);

	const atualizarProgresso = (novoProgresso) => {
		setProgressoTrilha(novoProgresso);
	};

	return (
		<div className={styles.contTri}>
			<div className={styles.imgMask}>
				<img src="src\components\assets\figma.jpg" />
			</div>
			<div className={styles.details}>
				<div className={styles.front}>
					<div className={styles.infosF}>
						<h1>{nome}</h1>
						<p>Lider: {lider}</p>
						<p>Time: {time}</p>
					</div>
				</div>
				<div className={styles.back}>
					<div className={styles.infosB}>
						<h1>{nome}</h1>
					</div>
					<div className={styles.contmib}>
						<div className={styles.mInfosB}>
							<button>Visualizar</button>
						</div>
						<div className={styles.mInfosB}>
							<button>Editar</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CardCTri;
