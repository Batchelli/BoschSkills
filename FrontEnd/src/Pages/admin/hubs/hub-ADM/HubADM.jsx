import React from "react";
import styles from "./HubADM.module.css";
import Navbar from "../../../../components/navbar/Navbar";
import CardAdm from "../../../../components/cards/cardsAdm/CardAdm";

import CadImg from "../../../../components/assets/cadIcon.svg";
import CadImgW from "../../../../components/assets/cadIconW.svg";

import TeamImg from "../../../../components/assets/teamIcon.svg";
import TeamImgW from "../../../../components/assets/teamIconW.svg";

import TriImg from "../../../../components/assets/triIcon.svg";
import TriImgW from "../../../../components/assets/triIconW.svg";

const HubADM = () => {
	return (
		<div className={styles.cont}>
			<Navbar />
			<section className={styles.cards}>
				<CardAdm
					title="Cadastros"
					desc="Area de funcionalidade de cadastro de administradores, usuários e cadastro em massa de usuários."
					color="blue"
					icon={CadImg}
					iconH={CadImgW}
					link="/cadastros"
				/>
				<CardAdm
					title="Times"
					desc="Area de funcionalidade de cadastro de administradores, usuários e cadastro em massa de usuários."
					color="green"
					icon={TeamImg}
					iconH={TeamImgW}
					link="/team"
				/>
				<CardAdm
					title="Trilhas"
					desc="Area de funcionalidade de cadastro de administradores, usuários e cadastro em massa de usuários."
					color="pink"
					icon={TriImg}
					iconH={TriImgW}
					link="/trilhas"
				/>
			</section>
		</div>
	);
};

export default HubADM;
