import React from "react";
import styles from "./Navbar.module.css";
import { useNavigate, Link } from "react-router-dom";

import lSkills from "../assets/logoSkill-W.svg"


const Navbar = () => {
	const navigate = useNavigate();

	const Sair = () => {
		navigate("/skills/login");
	};

	const Hub = () => {
		navigate("/skills/hubTrilhas");
	};

	return (
		<div className={styles.container}>
			<div className={styles.contFlex}>
				<Link to="/" className={styles.logo}>
					<img src={lSkills} alt="Logo" />
				</Link>
				<div className={styles.contBt}>
					<div className={styles.bts}>
						<button className={styles.btTri} onClick={Hub}>
							<h1>Suas Trilhas</h1>
						</button>
						<button className={styles.btEx} onClick={Sair}>
							<h1>Sair </h1>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
