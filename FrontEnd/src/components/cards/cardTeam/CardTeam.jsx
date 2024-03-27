import React from "react";
import styles from "./CardTeam.module.css";
import { Link } from "react-router-dom";

const CardTeam = ({ url, nome, lider }) => {
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
					</div>
				</div>
			</div>
		</Link>
	);
};

export default CardTeam;
