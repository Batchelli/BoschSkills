import React from "react";
import styles from "./HubCad.module.css"

import CardsCad from "../../../../components/cards/cardsCad/CardsCad";
import NavBar from "../../../../components/navbar/Navbar";

import CadImg from "../../../../components/assets/cadIconW.svg";

const HubCad = () => {
	return (
		<div>
			<NavBar />
			<section className={styles.cards}>
				<CardsCad
					title="Cadastro Admin"
					desc="Area destinada a cadastro de novos admins."
					descI=" APENAS SUPER ADMIN TEM PERMIÇÃO PARA CADASTRAR NOVOS ADMINS!"
					icon={CadImg}
          color="blue"
					path="cadastroadmin"
					/>
				<CardsCad
					title="Cadastro Usuário"
					desc="Area destinada a cadastro unico de novos usuários."
					icon={CadImg}
          color="green"
					path="cadastro"
				/>
				<CardsCad
					title="Cadastro em massa"
					desc="Area destinada a cadastro em massa de novos usuários."
					icon={CadImg}
          color="pink"
					path="cadastroemmassa"
				/>
			</section>
		</div>
	);
};

export default HubCad;
