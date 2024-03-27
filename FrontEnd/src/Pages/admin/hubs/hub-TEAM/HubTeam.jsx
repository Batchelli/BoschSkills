import React from "react";
import styles from "./HubTeam.module.css";

import CardsCad from "../../../../components/cards/cardsCad/CardsCad";
import NavBar from "../../../../components/navbar/Navbar";
import TeamIcon from "../../../../components/assets/teamIconW.svg";


const HubTeam = () => {
  return (
    <div>
			<NavBar />
			<section className={styles.cards}>
				<CardsCad
					title="Criar Time"
					desc="Area destinada a criação de novos times."
					icon={TeamIcon}
					color="blue"
					path="criartime"
				/>
				<CardsCad
					title="Visualizar Times"
					desc="Area destinada visualização de times que foram criados por você."
					icon={TeamIcon}
					color="pink"
					path="teams"
				/>
			</section>
		</div>
  )
}

export default HubTeam