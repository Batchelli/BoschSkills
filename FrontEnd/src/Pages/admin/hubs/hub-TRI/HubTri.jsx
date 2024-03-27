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
					path="criartrilha"
				/>
				<CardsCad
					title="Trilhas Criadas"
					desc="Area destinada a visualização das trilhas que foram criadas por você."
					icon={TriIcon}
					color="green"
					path="trilhascriadas"
				/>
				<CardsCad
					title="Trilhas Atreladas"
					desc="Area destinada visualização de trilhas que foram atreladas a você."
					icon={TriIcon}
					color="pink"
					path="hubTrilhas"
				/>
			</section>
		</div>
	);
};

export default HubTri;
