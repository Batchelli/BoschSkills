import React, { useEffect, useState } from "react";
import Navbar from "../../../components/navbar/Navbar";
import styles from "./Hub.module.css";
import Card from "../../../components/cards/cardTri/Card";
import axios from "axios";
import api from "../../../api";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";

const Hub = () => {
    const [trilhas, setTrilhas] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);

        const fetchData = async () => {
            try {
                const centralResponse = await axios.get(`${api}/central/centraEdv/${decodedToken.edv}`);
                const trailIds = centralResponse.data.map(centralData => centralData.trail_id);

                const trailsData = await Promise.all(trailIds.map(async (trailId) => {
                    const trailResponse = await axios.get(`${api}/trail/trails/${trailId}`);
                    return trailResponse.data[0];
                }));

                setTrilhas(trailsData);
            } catch (error) {
                console.error("Erro ao buscar trilhas:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className={styles.container}>
            <Navbar />
            <section className={styles.trilhas}>
                {trilhas.map((trilha, index) => (
                    <Card
                        key={index}
                        nome={trilha.nome}
                        lider={trilha.criador_trilha}
                        img={trilha.image_trail}
                        cargHora={trilha.carga_horaria}
                        url={`/skills/trilha/${trilha.id}`} // Ajuste o URL para incluir o ID da trilha
                    />
                ))}
            </section>
        </div>
    );
};

export default Hub;
