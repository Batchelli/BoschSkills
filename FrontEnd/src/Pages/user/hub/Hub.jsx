import React, { useEffect, useState } from "react";
import Navbar from "../../../components/navbar/Navbar";
import styles from "./Hub.module.css";
import Card from "../../../components/cards/cardTri/Card";
import axios from "axios";
import api from "../../../api";
import { jwtDecode } from "jwt-decode";



const Hub = () => {
	const [trilha, setTrilha] = useState([]);
	const [trilhas, setTrilhas] = useState([]);
    const [lider, setLider] = useState('');

    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);

	
    const fecthCentral = async () => {
        try {
            const response = await axios.get(`${api}/central/centraEdv/${decodedToken.edv}`);
            setTrilha(response.data);
            setTrilhas(response.data[0].trail_id);
			console.log(response.data[0].percentage)
        } catch (error) {
            console.error("Erro ao buscar trilhas:", error);
        }
    };

    const fetchTrail = async () => {
        try {
            const response = await axios.get(`${api}/trail/trails/${trilhas}`);
			console.log(response.data[0].nome)
			console.log(response.data[0].criador_trilha)
			console.log(response.data[0].carga_horaria)
			console.log(response.data[0].carga_horaria)
			
            setTrilha(response.data);
        } catch (error) {
            console.error("Erro ao buscar informações do usuário:", error);
        }
    };

    const fetchTeam = async () => {
        try {
            const response = await axios.get(`${api}/turmas/cTeamByID/${trilhas}`);
			console.log(response.data[0].nome)
			console.log(response.data[0].criador_trilha)
			console.log(response.data[0].carga_horaria)
			console.log(response.data[0].carga_horaria)
			
            setTrilha(response.data);
        } catch (error) {
            console.error("Erro ao buscar informações do usuário:", error);
        }
    };

    useEffect(() => {
        fecthCentral();
        fetchTrail();
    }, []);

    return (
        <div className={styles.container}>
            <Navbar />
            <section className={styles.trilhas}>
                {trilha.map((trilha, index) => (
                    <Card
                        key={index}
                        nome={trilha.nome}
                        lider={lider}
                        img={trilha.image_trail}
                    />
                ))}
            </section>
        </div>
    );
};

export default Hub;

//nome="Trilha UI/UX" lider="Vanessa" time="DS6" cargHora="50"