import React from "react";
import styles from "./HubTri.module.css";

import CardsCad from "../../../../components/cards/cardsCad/CardsCad";
import NavBar from "../../../../components/navbar/Navbar";
import TriIcon from "../../../../components/assets/triIconW.svg";
import Dbt from "../../../../components/cards/cardsDbt/Dbt";

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
				<Dbt
					title="Adicionar a Trilha"
					desc="Area destinada a adição de usuários a trilha."
					icon={TriIcon}
					color="green"
					nbt1="Adicionar Time"
					desc1="Area destinada a adição de times as suas trilhas."
					p1="skills/adicionarTime"
					nbt2="Adicionar Usuário"
					desc2="Area destinada a adição de usuário as suas trilhas."
					p2="skills/hubTrilhas"
				/>

				<Dbt
					title="Trilhas"
					desc="Hub de trilhas criadas por você ou atrelada a você."
					icon={TriIcon}
					color="pink"
					nbt1="Trilhas Criadas"
					desc1="Hub de trilhas criadas por você."
					p1="skills/trilhascriadas"
					nbt2="Trilhas Atreladas"
					desc2="Hub de trilhas atreladas a você."
					p2="skills/hubTrilhas"
				/>

			</section>
		</div>
	);
};

export default HubTri;
