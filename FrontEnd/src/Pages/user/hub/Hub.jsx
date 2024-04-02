import Navbar from "../../../components/navbar/Navbar";
import styles from "./Hub.module.css";
import Card from "../../../components/cards/cardTri/Card";
import React from 'react'

import { jwtDecode } from "jwt-decode";


const Hub = () => {
	return (
		<div className={styles.container}>
			<Navbar />
			<section className={styles.trilhas}>
				<Card url={"/skills/trilha"} nome="Trilha UI/UX" lider="Vanessa" time="DS6" cargHora="50" />
				<Card url={"/skills/criartrilha"} nome="Trilha UI/UX" lider="Vanessa" time="DS6" cargHora="50" />
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
			</section>
		</div>
	);
};

export default Hub;