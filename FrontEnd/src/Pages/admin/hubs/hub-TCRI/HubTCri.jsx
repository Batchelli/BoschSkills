import React from "react";
import Navbar from "../../../../components/navbar/Navbar";
import styles from "./HubTCri.module.css";
import CardCTri from "../../../../components/cards/cardCTri/CardCTri";

const HubTCri = () => {
	return (
		<div className={styles.container}>
			<Navbar />
			<section className={styles.trilhas}>
				<CardCTri nome="Trilha UI/UX" lider="Vanessa" time="DS6" cargHora="50" />
				<CardCTri nome="Trilha UI/UX" lider="Vanessa" time="DS6" cargHora="50" />
				<CardCTri nome="Trilha UI/UX" lider="Vanessa" time="DS6" cargHora="50" />
				<CardCTri nome="Trilha UI/UX" lider="Vanessa" time="DS6" cargHora="50" />
				<CardCTri nome="Trilha UI/UX" lider="Vanessa" time="DS6" cargHora="50" />
				<CardCTri nome="Trilha UI/UX" lider="Vanessa" time="DS6" cargHora="50" />
				<CardCTri nome="Trilha UI/UX" lider="Vanessa" time="DS6" cargHora="50" />
				<CardCTri nome="Trilha UI/UX" lider="Vanessa" time="DS6" cargHora="50" />
				<CardCTri nome="Trilha UI/UX" lider="Vanessa" time="DS6" cargHora="50" />
			</section>
		</div>
	);
};

export default HubTCri;
