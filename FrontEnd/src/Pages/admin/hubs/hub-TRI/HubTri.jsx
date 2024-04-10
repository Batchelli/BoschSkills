import React from "react";
import styles from "./HubTri.module.css";

import CardsCad from "../../../../components/cards/cardsCad/CardsCad";
import NavBar from "../../../../components/navbar/Navbar";
import TriIcon from "../../../../components/assets/triIconW.svg";

const HubTri = () => {
	return (
		<div>
			<NavBar />
			<section className={styles.cards}>
				<CardsCad
					title="Criar Trilha"
					desc="Area destinada a criação de novas trilhas."
					icon={TriIcon}
					color="blue"
					path="skills/criartrilha"
				/>
				<CardsCad
					title="Adicionar a Trilha"
					desc="Area destinada a adição de usuários a trilha."
					icon={TriIcon}
					color="green"
					path="skills/adicionar"
				/>
				<CardsCad
					title="Trilhas"
					desc="Hub de trilhas criadas por você ou atrelada a você."
					icon={TriIcon}
					color="pink"
					path="skills/trilhasEx"
				/>
			</section>
		</div>
	);
};

export default HubTri;
