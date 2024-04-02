import React from "react";
import Navbar from "../../../../components/navbar/Navbar";
import styles from "./HubTeams.module.css";
import CardTeam from "../../../../components/cards/cardTeam/CardTeam";

const HubTeams = () => {
  return (
    <div className={styles.container}>
			<Navbar />
			<section className={styles.trilhas}>
				<CardTeam nome="Trilha UI/UX" lider="Vanessa"/>
				<CardTeam nome="Trilha UI/UX" lider="Vanessa"/>
				<CardTeam nome="Trilha UI/UX" lider="Vanessa"/>
				<CardTeam nome="Trilha UI/UX" lider="Vanessa"/>
				<CardTeam nome="Trilha UI/UX" lider="Vanessa"/>
				<CardTeam nome="Trilha UI/UX" lider="Vanessa"/>
				<CardTeam nome="Trilha UI/UX" lider="Vanessa"/>
				<CardTeam nome="Trilha UI/UX" lider="Vanessa"/>
				<CardTeam nome="Trilha UI/UX" lider="Vanessa"/>
			</section>
		</div>
  )
}

export default HubTeams


