import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";

import lSkills from "../assets/logoSkill-W.svg"

import { jwtDecode } from "jwt-decode";


const Navbar = () => {
	const [showAdm, setShowAdm] = useState(false)

	const color = localStorage.getItem('color');
	const token = localStorage.getItem('token');

	const decodedToken = jwtDecode(token);
	const isAdm = decodedToken.typeUser

	const setAdm = () => {
		if (isAdm == "SAdmin" || isAdm == "Admin") {
			setShowAdm(true)
		} else {
			setShowAdm(false)
		}
	}

	useEffect(() => {
		setAdm();
	}, [])


	return (
		<div className={styles.container} style={{ backgroundColor: color }}>
			<div className={styles.contFlex}>
				<Link to="/" className={styles.logo}>
					<img src={lSkills} alt="Logo" />
				</Link>
				<div className={styles.opsBody}>
					<div className={styles.ops}>
						{showAdm == true && (
							<div>
								<Link to="/skills/hubadmin" className={styles.link}><h1>Admin</h1></Link>
							</div>
						)}
						<Link to="/skills/hubTrilhas" className={styles.link}><h1>Suas Trilhas</h1></Link>
						<Link to="/skills/login" className={styles.link}><h1>Sair </h1></Link>
						<div className={styles.elipse}>
							<img src="" alt="" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
