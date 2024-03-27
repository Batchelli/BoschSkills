import React, { useState } from "react";
import styles from "./Card.module.css";
import ProgressBar from "../../progress/ProgressBar";
import { Link } from "react-router-dom";

const Card = ({url, nome, lider, time, cargHora}) => {
	const [progressoTrilha, setProgressoTrilha] = useState(0); 

	const atualizarProgresso = (novoProgresso) => {
		setProgressoTrilha(novoProgresso);
	};

	return (
		<Link to={url} className={styles.contTri}>
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
						<p>Clique para começar a trilha</p>
					</div>
					<div className={styles.contmib}>
						<div className={styles.mInfosB}>
							<p>Carga Horaria: {cargHora} horas</p>
							<p>Porcentagem: {progressoTrilha}%</p>
						</div>
						{/* <div className={styles.mInfosB}>
				<h1>CONCLUIDA</h1>
			  </div> */}
					</div>
					<div className={styles.progress}>
						<ProgressBar
							progress={progressoTrilha}
							atualizarProgresso={atualizarProgresso}
						/>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default Card;
