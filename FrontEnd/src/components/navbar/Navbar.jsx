import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import lSkills from "../assets/logoSkill-W.svg"
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import api from "../../api";
import User from "../assets/user.svg"

const Navbar = () => {
	const [showAdm, setShowAdm] = useState(false)
	const [imgUser, setImgUser] = useState(false)
	const navigate = useNavigate();

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

	const usesInfos = async () => {
		try {
			const response = await axios.get(`${api}/users/user/${decodedToken.edv}`)
			setImgUser(response.data.image_user)
		} catch {

		}
	}

	const userProfile = () => {
		navigate("/skills/userprofile")
	}

	useEffect(() => {
		setAdm();
		usesInfos();
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
							<button onClick={userProfile} style={{backgroundImage: User}}>
								
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
