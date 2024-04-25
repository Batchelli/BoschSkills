import Navbar from "../../../../components/navbar/Navbar";
import styles from "./HubTeams.module.css";
import CardTeam from "../../../../components/cards/cardTeam/CardTeam";
import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../../../../api";
import { jwtDecode } from "jwt-decode";

const HubTeams = () => {
	const [times, setTimes] = useState([]);

	const token = localStorage.getItem('token');
	const decodedToken = jwtDecode(token);

	const fetchTeams = async () => {
		try {
			const response = await axios.get(`${api}/turmas/cTeamByEDV/${decodedToken.edv}`);
			setTimes(response.data);
		} catch (error) {
			console.error("Erro ao buscar trilhas:", error);
		}
	};

	useEffect(() => {
		fetchTeams();
	}, []);

	return (
		<div className={styles.container}>
			<Navbar />
			<section className={styles.trilhas}>
				{times.map((team, index) => (
					<TeamCard key={index} team={team} />
				))}
			</section>
		</div>
	);
}

const TeamCard = ({ team }) => {
	const [lider, setLider] = useState('');

	useEffect(() => {
		const fetchLider = async () => {
			try {
				const response = await axios.get(`${api}/users/user/${team.lider}`);
				setLider(response.data.name);
			} catch (error) {
				console.error("Erro ao buscar informações do líder:", error);
			}
		};

		fetchLider();
	}, [team.lider]);

	return (
		<CardTeam
			nome={team.team_name}
			lider={lider}
			img={team.image_team}
		/>
	);
};

export default HubTeams;
